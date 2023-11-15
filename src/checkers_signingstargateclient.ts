import { GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing"
import {
    defaultRegistryTypes,
    DeliverTxResponse,
    QueryClient,
    SigningStargateClient,
    SigningStargateClientOptions,
    StdFee,
} from "@cosmjs/stargate"
import { Tendermint34Client } from "@cosmjs/tendermint-rpc"
import Long from "long"
import { CheckersExtension, setupCheckersExtension } from "./modules/checkers/queries"
import {
    checkersTypes,
    MsgCreateGameEncodeObject,
    MsgPlayMoveEncodeObject,
    typeUrlMsgCreateGame,
    typeUrlMsgPlayMove,
} from "./types/checkers/messages"
import { Pos } from "./types/checkers/player"

export const checkersDefaultRegistryTypes: ReadonlyArray<[string, GeneratedType]> = [
    ...defaultRegistryTypes,
    ...checkersTypes,
]

function createDefaultRegistry(): Registry {
    return new Registry(checkersDefaultRegistryTypes)
}

export class CheckersSigningStargateClient extends SigningStargateClient {
    public readonly checkersQueryClient: CheckersExtension | undefined

    public static async connectWithSigner(
        endpoint: string,
        signer: OfflineSigner,
        options: SigningStargateClientOptions = {},
    ): Promise<CheckersSigningStargateClient> {
        const tmClient = await Tendermint34Client.connect(endpoint)
        return new CheckersSigningStargateClient(tmClient, signer, {
            registry: createDefaultRegistry(),
            ...options,
        })
    }

    protected constructor(
        tmClient: Tendermint34Client | undefined,
        signer: OfflineSigner,
        options: SigningStargateClientOptions,
    ) {
        super(tmClient, signer, options)
        if (tmClient) {
            this.checkersQueryClient = QueryClient.withExtensions(tmClient, setupCheckersExtension)
        }
    }

    public async createGame(
        creator: string,
        black: string,
        red: string,
        denom: string,
        wager: Long,
        fee: StdFee | "auto" | number,
        memo = "",
    ): Promise<DeliverTxResponse> {
        const createMsg: MsgCreateGameEncodeObject = {
            typeUrl: typeUrlMsgCreateGame,
            value: {
                black: black,
                red: red,
                creator: creator,
                denom: denom,
                wager: wager,
            },
        }
        return this.signAndBroadcast(creator, [createMsg], fee, memo)
    }

    public async playMove(
        creator: string,
        gameIndex: string,
        from: Pos,
        to: Pos,
        fee: StdFee | "auto" | number,
        memo = "",
    ): Promise<DeliverTxResponse> {
        const playMoveMsg: MsgPlayMoveEncodeObject = {
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
        return this.signAndBroadcast(creator, [playMoveMsg], fee, memo)
    }
}
