import React from "react"
import { IGameInfo } from "../../sharedTypes"
import formatDate from "../../util/formatDate"
// import MenuContext from "./MenuContext";

interface ISavedGameInfoProps {
    info: IGameInfo
}

const SavedGameInfo = (props: ISavedGameInfoProps) => (
    // <MenuContext.Consumer>
    //     { (props) => (
    <div>
        <h3>
            <span
                style={{
                    color: "black",
                    fontStyle: props.info.turn === 1 ? "italic" : "normal",
                }}
            >
                {props.info.p1.name}
            </span>
            <span className="small"> vs </span>
            <span
                style={{
                    color: "red",
                    fontStyle: props.info.turn === 2 ? "italic" : "normal",
                }}
            >
                {props.info.p2.name}
            </span>
        </h3>
        <h4>
            Score: <span style={{ color: "black" }}>{props.info.p1.score}</span>:
            <span style={{ color: "red" }}>{props.info.p2.score}</span>
        </h4>
        <p>
            Created: {formatDate(new Date(props.info.created))} Last played:{" "}
            {formatDate(new Date(props.info.last))}
        </p>
    </div>
    //     )}
    // </MenuContext.Consumer>
)
export default SavedGameInfo
