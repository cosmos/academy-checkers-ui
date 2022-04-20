import { StargateClientOptions } from "@cosmjs/stargate"
import { BlockResultsResponse, Tendermint34Client } from "@cosmjs/tendermint-rpc"
import { StringEvent } from "cosmjs-types/cosmos/base/abci/v1beta1/abci"
import { convertTendermintEvents } from "../types/checkers/events"
import { CheckersStargateClient } from "../checkers_stargateclient"

export class IndexerStargateClient extends CheckersStargateClient {
    private readonly myTmClient: Tendermint34Client

    public static async connect(
        endpoint: string,
        options: StargateClientOptions = {},
    ): Promise<IndexerStargateClient> {
        const tmClient = await Tendermint34Client.connect(endpoint)
        return new IndexerStargateClient(tmClient, options)
    }

    protected constructor(tmClient: Tendermint34Client, options: StargateClientOptions) {
        super(tmClient, options)
        this.myTmClient = tmClient
    }

    public async getEndBlockEvents(height: number): Promise<StringEvent[]> {
        const results: BlockResultsResponse = await this.myTmClient.blockResults(height)
        return convertTendermintEvents(results.endBlockEvents)
    }
}
