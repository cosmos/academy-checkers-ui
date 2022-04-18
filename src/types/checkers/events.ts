import { DeliverTxResponse } from "@cosmjs/stargate"

export const getCreatedGameId = (createResponse: DeliverTxResponse, msgIndex: number): string => {
    return JSON.parse(createResponse.rawLog!)[0].events[msgIndex].attributes.find(
        (eventInfo: { key: string }) => eventInfo.key == "Index",
    ).value
}
