import { OfflineSigner } from "@cosmjs/proto-signing"
import { GasPrice } from "@cosmjs/stargate"
import Lockr from "lockr"
import React, { Component } from "react"
import { CheckersSigningStargateClient } from "src/checkers_signingstargateclient"
import { CheckersStargateClient } from "src/checkers_stargateclient"
import { checkersChainId, getCheckersChainInfo } from "src/types/checkers/chain"
import { IGameInfo, IPlayerInfo, Position } from "../../sharedTypes"
import {} from "../../types/checkers/extensions-gui"
import MoveTree, { Player } from "../../util/MoveTree"
import Board from "./Board/Board"
import BoardMenu from "./BoardMenu/BoardMenu"
import ScoreBar from "./BoardMenu/ScoreBar"
import GameOverModal from "./GameOverModal"

interface IGameContainerProps {
    location: any
    index: string
    rpcUrl: string
}

interface CreatorInfo {
    creator: string
    signingClient: CheckersSigningStargateClient
}

interface IGameContainerState {
    board: MoveTree
    created: Date
    gameOver: boolean
    isSaved: boolean
    last: Date
    p2: IPlayerInfo
    p1: IPlayerInfo
    selected: {
        [key: string]: boolean
    }
    [key: string]: any
    client: CheckersStargateClient | undefined
    creator: string
    signingClient: CheckersSigningStargateClient | undefined
}

export default class GameContainer extends Component<IGameContainerProps, IGameContainerState> {
    public readonly state: IGameContainerState = {
        board: new MoveTree(null),
        created: new Date(),
        gameOver: false,
        isSaved: false,
        last: new Date(),
        p1: {
            is_ai: false,
            name: "Player 1",
            score: 0,
        },
        p2: {
            is_ai: false,
            name: "Player 2",
            score: 0,
        },
        selected: {},
        client: undefined,
        creator: "",
        signingClient: undefined,
    }
    constructor(props: IGameContainerProps) {
        super(props)
        this.handleSquareClick = this.handleSquareClick.bind(this)
        this.makeMove = this.makeMove.bind(this)
        this.updateName = this.updateName.bind(this)
    }

    public async componentDidMount(): Promise<void> {
        // Allow a player to make a move by double-clicking the screen.
        // This is mainly for touchscreen users.
        window.addEventListener("dblclick", this.makeMove)
        await this.loadGame()
    }
    public async loadGame(): Promise<void> {
        const game: IGameInfo | undefined = await (
            await this.getStargateClient()
        ).getGuiGame(this.props.index)
        if (!game) {
            alert("Game does not exist")
            return
        }

        this.setState({
            board: new MoveTree(game.board, game.turn, 5),
            created: game.created,
            isSaved: true,
            last: game.last,
            p1: {
                is_ai: game.p1.is_ai,
                name: game.p1.name,
                score: game.p1.score,
            },
            p2: {
                is_ai: game.p2.is_ai,
                name: game.p2.name,
                score: game.p2.score,
            },
        })

        if (this.currentPlayerIsAI()) {
            const selected = Object.create(null)
            this.state.board.getBestMove().forEach(([row, col]) => (selected[`${row},${col}`] = true))
            this.setState({ selected }, () => {
                window.setTimeout(this.makeMove, 750)
            })
        }
    }
    public componentWillUnmount() {
        window.removeEventListener("dblclick", this.makeMove)
    }
    protected async getStargateClient(): Promise<CheckersStargateClient> {
        const client: CheckersStargateClient =
            this.state.client ?? (await CheckersStargateClient.connect(this.props.rpcUrl))
        if (!this.state.client) this.setState({ client: client })
        return client
    }
    protected async getSigningStargateClient(): Promise<CreatorInfo> {
        if (this.state.creator && this.state.signingClient)
            return {
                creator: this.state.creator,
                signingClient: this.state.signingClient,
            }
        const { keplr } = window
        if (!keplr) {
            alert("You need to install Keplr")
            throw new Error("You need to install Keplr")
        }
        await keplr.experimentalSuggestChain(getCheckersChainInfo())
        await keplr.enable(checkersChainId)
        const offlineSigner: OfflineSigner = keplr.getOfflineSigner!(checkersChainId)
        const creator = (await offlineSigner.getAccounts())[0].address
        const client: CheckersSigningStargateClient = await CheckersSigningStargateClient.connectWithSigner(
            this.props.rpcUrl,
            offlineSigner,
            {
                gasPrice: GasPrice.fromString("1stake"),
            },
        )
        this.setState({ creator: creator, signingClient: client })
        return { creator: creator, signingClient: client }
    }
    public currentPlayerIsAI(): boolean {
        const player: Player = this.state.board.current_player
        return this.state["p" + player].is_ai
    }
    public getScore(player: Player): number {
        let score = 12
        const otherPlayer = MoveTree.otherPlayer(player)
        for (const row of this.state.board.current_board) {
            for (const piece of row) {
                if (Math.trunc(piece) === otherPlayer) {
                    score--
                }
            }
        }
        return score
    }
    public updateName(player: "p1" | "p2", newName: string): void {
        const p = this.state[player]
        p.name = newName
        this.setState({ [player]: p }, this.saveGame)
    }
    public handleBoardKeyPress(event: React.KeyboardEvent<GameContainer>): void {
        if (this.state.locked) {
            return
        }

        if (event.key === "Enter") {
            this.makeMove()
        }
    }
    public handleSquareClick([row, col]: Position): void {
        if (this.state.locked) {
            return
        }

        const piece = Math.trunc(this.state.board.current_board[row][col])
        let selected = this.state.selected
        // if the square clicked hold a piece of the current player
        const current_player = this.state.board.current_player
        if (piece === current_player) {
            selected = Object.create(null)
        }
        // check if the square has already be clicked
        // or if it is a piece of the player whose turn it is not
        if (selected[`${row},${col}`] === true || MoveTree.otherPlayer(current_player) === piece) {
            return
        }

        // if the square clicked is empty AND a piece has valid piece had already be selected
        if (piece === 0 && Object.keys(selected).length > 0 && selected.constructor === Object) {
            return
        }

        selected[`${row},${col}`] = true
        this.setState({ selected })
    }
    public async makeMove(): Promise<void> {
        if (this.state.locked && !this.currentPlayerIsAI()) {
            return
        }
        const keys: string[] = Object.keys(this.state.selected)
        if (keys.length === 0) {
            return
        }

        const positions: Position[] = keys.map((k: string): Position => k.split(",").map(Number) as Position)

        const client = await this.getStargateClient()
        const canPlayOrNot = await client.canPlayGuiMove(
            this.props.index,
            this.state.board.current_player,
            positions,
        )
        if (!canPlayOrNot.possible) {
            const error = `Cannot make this move ${canPlayOrNot.reason}`
            alert(error)
            throw new Error(error)
        }

        const { creator, signingClient } = await this.getSigningStargateClient()
        await signingClient.playGuiMoves(creator, this.props.index, positions).catch((e) => {
            console.error(e)
            alert("Failed to play: " + e)
        })

        const selected = Object.create(null)
        this.setState({ selected })
        return this.loadGame()
    }
    public render() {
        let winner: string = ""
        if (this.state.gameOver) {
            const pNum = MoveTree.otherPlayer(this.state.board.current_player)
            winner = this.state["p" + pNum].name
        }
        return (
            <div>
                <BoardMenu saved={this.state.isSaved} onMakeMoveClick={this.makeMove} />
                <ScoreBar
                    updateName={this.updateName}
                    turn={this.state.board.current_player}
                    p1={this.state.p1}
                    p2={this.state.p2}
                />
                <Board
                    onSquareClick={this.handleSquareClick}
                    onKeyPress={this.makeMove}
                    selected={this.state.selected}
                    squares={this.state.board.current_board}
                    turn={this.state.board.current_player}
                />
                <GameOverModal shown={this.state.gameOver} winner={winner} />
            </div>
        )
    }
    public saveGame() {
        if (typeof Storage === "undefined") {
            // console.warn('This browser does not support localstroage. Unable to save games.');
            this.setState({ isSaved: false })
        } else if (this.state.gameOver) {
            const saved: IGameInfo[] = Lockr.get("saved_games")
            saved.shift()
            Lockr.set("saved_games", saved)
        } else {
            const { board, created, p1, p2 } = this.state
            const gameInfo: IGameInfo = {
                board: board.current_board,
                created: created as Date,
                isNewGame: false,
                last: new Date(), // .toDateString(),
                p1: p1 as IPlayerInfo,
                p2: p2 as IPlayerInfo,
                turn: board.current_player,
                index: -1,
            }

            const savedGames: IGameInfo[] = Lockr.get("saved_games") || []
            if (!this.state.isSaved) {
                Lockr.set("saved_games", [gameInfo, ...savedGames])
            } else {
                savedGames[0] = gameInfo
                Lockr.set("saved_games", savedGames)
            }

            this.setState({ isSaved: true })
            // console.log("game saved");
        }
    }
}
