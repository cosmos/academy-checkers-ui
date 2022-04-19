import Long from "long"
import { CheckersSigningStargateClient } from "../../checkers_signingstargateclient"
import { CheckersStargateClient } from "../../checkers_stargateclient"
import { IGameInfo } from "../../sharedTypes"
import { StoredGame } from "../generated/checkers/stored_game"
import { storedToGameInfo } from "./board"
import { getCreatedGameId } from "./events"

declare module "../../checkers_stargateclient" {
    interface CheckersStargateClient {
        getGuiGames(): Promise<IGameInfo[]>
        getGuiGame(index: string): Promise<IGameInfo | undefined>
    }
}

declare module "../../checkers_signingstargateclient" {
    interface CheckersSigningStargateClient {
        createGuiGame(creator: string, black: string, red: string): Promise<string>
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

CheckersSigningStargateClient.prototype.createGuiGame = async function (
    creator: string,
    black: string,
    red: string,
): Promise<string> {
    return getCreatedGameId(await this.createGame(creator, black, red, "stake", Long.ZERO, "auto"), 0)
}

export {}
