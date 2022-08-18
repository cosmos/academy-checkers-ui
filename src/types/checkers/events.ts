import { Attribute, Event, Log } from "@cosmjs/stargate/build/logs"
import { GamePiece, Pos } from "./player"

export type GameCreatedEvent = Event

export const getCreateGameEvent = (log: Log): GameCreatedEvent | undefined =>
    log.events?.find((event: Event) => event.type === "new-game-created")

export const getCreatedGameId = (createdGameEvent: GameCreatedEvent): string =>
    createdGameEvent.attributes.find((attribute: Attribute) => attribute.key == "game-index")!.value

export type MovePlayedEvent = Event

export const getMovePlayedEvent = (log: Log): MovePlayedEvent | undefined =>
    log.events?.find((event: Event) => event.type === "move-played")

export const getCapturedPos = (movePlayedEvent: MovePlayedEvent): Pos | undefined => {
    const x: number = parseInt(
        movePlayedEvent.attributes.find((attribute: Attribute) => attribute.key == "captured-x")!.value,
        10,
    )
    const y = parseInt(
        movePlayedEvent.attributes.find((attribute: Attribute) => attribute.key == "captured-y")!.value,
        10,
    )
    if (isNaN(x) || isNaN(y)) return undefined
    return { x, y }
}

export const getWinner = (movePlayedEvent: MovePlayedEvent): GamePiece | undefined =>
    movePlayedEvent.attributes.find((attribute: Attribute) => attribute.key == "winner")!.value as
        | GamePiece
        | undefined
