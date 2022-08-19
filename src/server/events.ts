import { fromUtf8 } from "@cosmjs/encoding"
import { Attribute as TendermintAttribute, Event } from "@cosmjs/tendermint-rpc"
import { Attribute, StringEvent } from "cosmjs-types/cosmos/base/abci/v1beta1/abci"

export const convertTendermintEvents = (events: readonly Event[]): StringEvent[] => {
    return events.map(
        (event: Event): StringEvent => ({
            type: event.type,
            attributes: event.attributes.map(
                (attribute: TendermintAttribute): Attribute => ({
                    key: fromUtf8(attribute.key),
                    value: fromUtf8(attribute.value),
                }),
            ),
        }),
    )
}
