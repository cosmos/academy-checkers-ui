import React from "react"
import { IPlayerInfo } from "../../../sharedTypes"
import { Player } from "../../../util/MoveTree"
import NameInput from "./NameInput"
import "./ScoreBar.css"

interface IScoreBarProps {
    updateName: (player: "p1" | "p2", newName: string) => void
    turn: Player
    p1: IPlayerInfo
    p2: IPlayerInfo
}

const ScoreBar = (props: IScoreBarProps) => {
    const p1OnChange = (name: string) => props.updateName("p1", name)
    const p2OnChange = (name: string) => props.updateName("p2", name)
    return (
        <div id="score">
            <div>
                <NameInput
                    color="black"
                    className="scoreNameInput"
                    defaultValue={props.p1.name}
                    turn={props.turn === 1}
                    onChange={p1OnChange}
                    style={{ marginLeft: "20px" }}
                />
                : <span className="score">{props.p1.score}</span>
            </div>
            <div className="float-right">
                <NameInput
                    color="red"
                    className="scoreNameInput"
                    defaultValue={props.p2.name}
                    turn={props.turn === 2}
                    onChange={p2OnChange}
                />
                : <span className="score">{props.p2.score}</span>
            </div>
        </div>
    )
}

export default ScoreBar
