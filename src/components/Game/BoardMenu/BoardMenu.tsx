import React, { Component } from "react"
import * as FontAwesome from "react-icons/fa"
import { Link } from "react-router-dom"
import { Button, Tooltip } from "reactstrap"

import "./BoardMenu.css"

interface IBoardMenuProps {
    onMakeMoveClick: () => void
    saved: boolean
}

interface IBoardMenuState {
    showTooltip: boolean
}

export default class BoardMenu extends Component<IBoardMenuProps, IBoardMenuState> {
    constructor(props: IBoardMenuProps) {
        super(props)
        this.state = {
            showTooltip: false,
        }
        this.toogleTooltip = this.toogleTooltip.bind(this)
    }

    public render() {
        const savedColor = this.props.saved ? "green" : "red"
        return (
            <div id="boardMenu">
                <Link to="/howtoplay" className="boardMenuLink">
                    <Button color="info" className="float-left boardMenuBtn">
                        How to Play
                    </Button>
                </Link>
                <FontAwesome.FaSave
                    className="float-right"
                    id="gameIsSavedIcon"
                    style={{ color: savedColor }}
                />
                <Tooltip target="gameIsSavedIcon" toggle={this.toogleTooltip} isOpen={this.state.showTooltip}>
                    {this.props.saved && "Game Saved"}
                    {!this.props.saved && "Game NOT Saved"}
                </Tooltip>
                <Button
                    color="success"
                    className="float-right boardMenuBtn"
                    onClick={this.props.onMakeMoveClick}
                >
                    Make move
                </Button>
                <Link to="/menu" className="boardMenuLink">
                    <Button color="danger" className="float-right boardMenuBtn">
                        Quit Game
                    </Button>
                </Link>
            </div>
        )
    }
    private toogleTooltip(): void {
        this.setState({ showTooltip: !this.state.showTooltip })
    }
}
