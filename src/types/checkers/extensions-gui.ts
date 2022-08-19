import { DeliverTxResponse } from "@cosmjs/stargate"
import { Log } from "@cosmjs/stargate/build/logs"
import Long from "long"
import { CheckersSigningStargateClient } from "src/checkers_signingstargateclient"
import { CheckersStargateClient } from "src/checkers_stargateclient"
import { IGameInfo } from "src/sharedTypes"
import { QueryCanPlayMoveResponse } from "../generated/checkers/query"
import { StoredGame } from "../generated/checkers/stored_game"
import { guiPositionToPos, storedToGameInfo } from "./board"
import { getCapturedPos, getCreatedGameId, getCreateGameEvent, getMovePlayedEvent } from "./events"
import { MsgPlayMoveEncodeObject, typeUrlMsgPlayMove } from "./messages"
import { Pos } from "./player"

declare module "../../checkers_stargateclient" {
    interface CheckersStargateClient {
        getGuiGames(): Promise<IGameInfo[]>
        getGuiGame(index: string): Promise<IGameInfo | undefined>
        canPlayGuiMove(
            gameIndex: string,
            playerId: number,
            positions: number[][],
        ): Promise<QueryCanPlayMoveResponse>
    }
}

declare module "../../checkers_signingstargateclient" {
    interface CheckersSigningStargateClient {
        createGuiGame(creator: string, black: string, red: string): Promise<string>
        playGuiMoves(creator: string, gameIndex: string, positions: number[][]): Promise<(Pos | undefined)[]>
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
    positions: number[][],
): Promise<QueryCanPlayMoveResponse> {
    if (playerId < 1 || 2 < playerId) throw new Error(`Wrong playerId: ${playerId}`)
    return await this.checkersQueryClient!.checkers.canPlayMove(
        gameIndex,
        playerId === 1 ? "b" : "r",
        guiPositionToPos(positions[0]),
        guiPositionToPos(positions[1]),
    )
}

CheckersSigningStargateClient.prototype.createGuiGame = async function (
    creator: string,
    black: string,
    red: string,
): Promise<string> {
    const result: DeliverTxResponse = await this.createGame(creator, black, red, "stake", Long.ZERO, "auto")
    const logs: Log[] = JSON.parse(result.rawLog!)
    return getCreatedGameId(getCreateGameEvent(logs[0])!)
}

CheckersSigningStargateClient.prototype.playGuiMoves = async function (
    creator: string,
    gameIndex: string,
    positions: number[][],
): Promise<(Pos | undefined)[]> {
    const playMoveMsgList: MsgPlayMoveEncodeObject[] = positions
        .slice(0, positions.length - 1)
        .map((position: number[], index: number) => {
            const from: Pos = guiPositionToPos(position)
            const to: Pos = guiPositionToPos(positions[index + 1])
            return {
                typeUrl: typeUrlMsgPlayMove,
                value: {
                    creator: creator,
                    gameIndex: gameIndex,
                    fromX: Long.fromNumber(from.x),
                    fromY: Long.fromNumber(from.y),
                    toX: Long.fromNumber(to.x),
                    toY: Long.fromNumber(to.y),
                },
            }
        })
    const result: DeliverTxResponse = await this.signAndBroadcast(creator, playMoveMsgList, "auto")
    const logs: Log[] = JSON.parse(result.rawLog!)
    return logs.map((log: Log) => getCapturedPos(getMovePlayedEvent(log)!))
}
