export type Position = [number, number]
export type NodeName = Position[]

export interface IDirections {
    1: IMoveVector[]
    2: IMoveVector[]
    [key: number]: IMoveVector[]
}

export interface IGameInfo {
    board: number[][] | null
    created: Date
    last: Date
    isNewGame: boolean
    p1: IPlayerInfo
    p2: IPlayerInfo
    turn: number
    index: number
}

export interface IMoveVector {
    readonly x: -1 | 1
    readonly y: -1 | 1
}

export interface IPlayerInfo {
    name: string
    score: number
    is_ai: boolean
}
