import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate"
import { assert } from "@cosmjs/utils"
import Long from "long"
import { Player, Pos } from "../../types/checkers/player"
import {
    QueryAllStoredGameResponse,
    QueryCanPlayMoveResponse,
    QueryClientImpl,
    QueryGetStoredGameResponse,
} from "../../types/generated/checkers/query"
import { StoredGame } from "../../types/generated/checkers/stored_game"
import { SystemInfo } from "../../types/generated/checkers/system_info"
import { PageResponse } from "../../types/generated/cosmos/base/query/v1beta1/pagination"

export interface AllStoredGameResponse {
    storedGames: StoredGame[]
    pagination?: PageResponse
}

export interface CheckersExtension {
    readonly checkers: {
        readonly getSystemInfo: () => Promise<SystemInfo>
        readonly getStoredGame: (index: string) => Promise<StoredGame | undefined>
        readonly getAllStoredGames: (
            key: Uint8Array,
            offset: Long,
            limit: Long,
            countTotal: boolean,
        ) => Promise<AllStoredGameResponse>
        readonly canPlayMove: (
            index: string,
            player: Player,
            from: Pos,
            to: Pos,
        ) => Promise<QueryCanPlayMoveResponse>
    }
}

export function setupCheckersExtension(base: QueryClient): CheckersExtension {
    const rpc = createProtobufRpcClient(base)
    // Use this service to get easy typed access to query methods
    // This cannot be used for proof verification
    const queryService = new QueryClientImpl(rpc)

    return {
        checkers: {
            getSystemInfo: async (): Promise<SystemInfo> => {
                const { SystemInfo } = await queryService.SystemInfo({})
                assert(SystemInfo)
                return SystemInfo
            },
            getStoredGame: async (index: string): Promise<StoredGame | undefined> => {
                const response: QueryGetStoredGameResponse = await queryService.StoredGame({
                    index: index,
                })
                return response.storedGame
            },
            getAllStoredGames: async (
                key: Uint8Array,
                offset: Long,
                limit: Long,
                countTotal: boolean,
            ): Promise<AllStoredGameResponse> => {
                const response: QueryAllStoredGameResponse = await queryService.StoredGameAll({
                    pagination: {
                        key: key,
                        offset: offset,
                        limit: limit,
                        countTotal: countTotal,
                        reverse: false,
                    },
                })
                return {
                    storedGames: response.storedGame,
                    pagination: response.pagination,
                }
            },
            canPlayMove: async (
                index: string,
                player: Player,
                from: Pos,
                to: Pos,
            ): Promise<QueryCanPlayMoveResponse> => {
                return queryService.CanPlayMove({
                    gameIndex: index,
                    player: player,
                    fromX: Long.fromNumber(from.x),
                    fromY: Long.fromNumber(from.y),
                    toX: Long.fromNumber(to.x),
                    toY: Long.fromNumber(to.y),
                })
            },
        },
    }
}
