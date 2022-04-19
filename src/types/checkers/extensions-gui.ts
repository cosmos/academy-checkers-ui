import Long from "long"
import { CheckersSigningStargateClient } from "../../checkers_signingstargateclient"
import { CheckersStargateClient } from "../../checkers_stargateclient"
import { IGameInfo } from "../../sharedTypes"
import { QueryCanPlayMoveResponse } from "../generated/checkers/query"
import { StoredGame } from "../generated/checkers/stored_game"
import { guiMoveToPos, storedToGameInfo } from "./board"
import { getCreatedGameId } from "./events"

declare module "../../checkers_stargateclient" {
    interface CheckersStargateClient {
        getGuiGames(): Promise<IGameInfo[]>
        getGuiGame(index: string): Promise<IGameInfo | undefined>
        canPlayGuiMove(
            gameIndex: string,
            playerId: number,
            move: number[][],
        ): Promise<QueryCanPlayMoveResponse>
    }
}

declare module "../../checkers_signingstargateclient" {
    interface CheckersSigningStargateClient {
        createGuiGame(creator: string, black: string, red: string): Promise<string>
        playGuiMove(creator: string, gameIndex: string, move: number[][]): Promise<void>
    }
}

CheckersStargateClient.prototype.getGuiGames = async function (): Promise<IGameInfo[]> {
    return (
        await this.checkersQueryClient!.checkers.getAllStoredGames(
            Uint8Array.from([]),
            Long.ZERO,
            Long.fromNumber(20),
            true,
        )
    ).storedGames.map(storedToGameInfo)
}

CheckersStargateClient.prototype.getGuiGame = async function (index: string): Promise<IGameInfo | undefined> {
    const storedGame: StoredGame | undefined = await this.checkersQueryClient!.checkers.getStoredGame(index)
    if (!storedGame) return undefined
    return storedToGameInfo(storedGame)
}

CheckersStargateClient.prototype.canPlayGuiMove = async function (
    gameIndex: string,
    playerId: number,
    move: number[][],
): Promise<QueryCanPlayMoveResponse> {
    if (playerId < 1 || 2 < playerId) throw new Error(`Wrong playerId: ${playerId}`)
    return await this.checkersQueryClient!.checkers.canPlayMove(
        gameIndex,
        playerId === 1 ? "b" : "r",
        guiMoveToPos(move[0]),
        guiMoveToPos(move[1]),
    )
}

CheckersSigningStargateClient.prototype.createGuiGame = async function (
    creator: string,
    black: string,
    red: string,
): Promise<string> {
    return getCreatedGameId(await this.createGame(creator, black, red, "stake", Long.ZERO, "auto"), 0)
}

CheckersSigningStargateClient.prototype.playGuiMove = async function (
    creator: string,
    gameIndex: string,
    move: number[][],
): Promise<void> {
    await this.playMove(creator, gameIndex, guiMoveToPos(move[0]), guiMoveToPos(move[1]), "auto")
}

export {}
