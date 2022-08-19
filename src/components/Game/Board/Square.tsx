import React from "react"
import Piece from "./Piece"

import "./Board.css"

interface ISquareProps {
    player: number
    selected: boolean
    position: [number, number]
    onClick: ([row, col]: [number, number]) => void
}

const Square = (props: ISquareProps) => {
    const player = props.player
    const isSelected = props.player === 0 && props.selected
    const click = () => props.onClick(props.position)
    return (
        <div className={"square " + (isSelected ? "selected" : "")} onClick={click}>
            {player !== 0 && <Piece player={player} selected={props.selected && player !== 0} />}
        </div>
    )
}
export default Square
