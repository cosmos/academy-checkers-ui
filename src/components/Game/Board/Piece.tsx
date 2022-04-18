import React from "react"

import crown from "../../../images/crown.png"

import "./Board.css"
interface IPieceProps {
    player: number
    selected: boolean
}

const Piece = (props: IPieceProps) => {
    const player = props.player
    const isKing = player !== Math.trunc(player)
    const selected = props.selected
    return (
        <div
            className={
                "piece " + `p${Math.trunc(player)} ${isKing ? "king" : ""} ${selected ? "selected" : ""}`
            }
        >
            <img src={crown} alt="king" width="60px" />
        </div>
    )
}
export default Piece
