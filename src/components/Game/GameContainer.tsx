import Lockr from "lockr"
import QueryString from "query-string"
import React, { Component } from "react"
import { IGameInfo, IPlayerInfo, Position } from "../../sharedTypes"
import MoveTree, { Player } from "../../util/MoveTree"
import Board from "./Board/Board"
import BoardMenu from "./BoardMenu/BoardMenu"
import ScoreBar from "./BoardMenu/ScoreBar"
import GameOverModal from "./GameOverModal"

interface IGameContainerProps {
    location: any
    index: string
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
    }
    constructor(props: IGameContainerProps) {
        super(props)
        this.handleSquareClick = this.handleSquareClick.bind(this)
        this.makeMove = this.makeMove.bind(this)
        this.updateName = this.updateName.bind(this)
    }

    public componentDidMount(): void {
        // Allow a player to make a move by double-clicking the screen.
        // This is mainly for touchscreen users.
        window.addEventListener("dblclick", this.makeMove)

        const savedGames: IGameInfo[] = Lockr.get("saved_games") || []
        const querys: any = QueryString.parse(this.props.location.search)

        if (querys.newGame === "true") {
            Lockr.set("saved_games", savedGames.slice(1))
        }

        let index: number = parseInt(this.props.index, 10)

        if (isNaN(index) || index < 0 || index >= savedGames.length) {
            index = 0
        }

        if (index === 0 && savedGames.length === 0) {
            return
        }
        const game: IGameInfo = savedGames[index]

        this.setState({
            board: new MoveTree(game.board, game.turn, 5),
            created: game.created,
            isSaved: !querys.newGame,
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
    public makeMove(): void {
        if (this.state.locked && !this.currentPlayerIsAI()) {
            return
        }
        const keys: string[] = Object.keys(this.state.selected)
        if (keys.length === 0) {
            return
        }

        const move: Position[] = keys.map((k: string): Position => k.split(",").map(Number) as Position)
        const board: MoveTree = this.state.board.getResultingTree(move) as MoveTree
        const player: Player = this.state.board.current_player
        const selected = Object.create(null)

        if (board !== null) {
            this.setState({ board, locked: false }, () => {
                // check for a change in a player's score
                // and save the game
                if (player === 1) {
                    const p1: IPlayerInfo = this.state.p1 as IPlayerInfo
                    p1.score = this.getScore(player)
                    this.setState({ p1 }, this.saveGame)
                } else if (player === 2) {
                    const p2: IPlayerInfo = this.state.p2 as IPlayerInfo
                    p2.score = this.getScore(player)
                    this.setState({ p2 }, this.saveGame)
                } else {
                    this.saveGame()
                }
                if (board.game_over) {
                    this.setState({ gameOver: true })
                } else {
                    // check if the AI needs to make a move
                    if (this.currentPlayerIsAI()) {
                        this.state.board
                            .getBestMove()
                            .forEach(([row, col]) => (selected[`${row},${col}`] = true))
                        this.setState({ selected, locked: true }, () => {
                            window.setTimeout(this.makeMove.bind(this), 750)
                        })
                    }
                }
            })
        }
        // console.log(JSON.stringify(selected));
        this.setState({ selected })
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
