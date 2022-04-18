import React, { CSSProperties } from "react"
import Square from "./Square"

import "./Board.css"

interface IBoardProps {
    turn: number
    selected: { [key: string]: boolean }
    squares: number[][]
    onSquareClick: ([row, col]: [number, number]) => void
    onKeyPress: () => void
}

const Board = (props: IBoardProps) => {
    const style: CSSProperties = {
        borderColor: props.turn === 1 ? "#444" : "red",
    }
    const squares: JSX.Element[] = []
    props.squares.forEach((arr, row) => {
        arr.forEach((square, col) => {
            const isSelected = props.selected[`${row},${col}`] === true
            squares.push(
                <Square
                    key={`${row}-${col}`}
                    onClick={props.onSquareClick}
                    selected={isSelected}
                    player={square}
                    position={[row, col]}
                />,
            )
        })
        squares.push(<div className="hidden" key={`hidden${row}`} />)
    })

    return (
        <div id="board" style={style} tabIndex={0} onKeyPress={props.onKeyPress}>
            {squares}
        </div>
    )
}
export default Board
