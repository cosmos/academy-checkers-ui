import Long from "long"
import { CheckersStargateClient } from "../../checkers_stargateclient"
import { IGameInfo } from "../../sharedTypes"
import { storedToGameInfo } from "./board"

declare module "../../checkers_stargateclient" {
    interface CheckersStargateClient {
        getGuiGames(): Promise<IGameInfo[]>
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

export {}
