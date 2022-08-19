import Lockr from "lockr"
import React, { Component, CSSProperties } from "react"
import { Link } from "react-router-dom"
import { Alert, Button, Col, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap"

import { IGameInfo } from "../../../sharedTypes"
import "./NewGame.css"
import PlayerAiCheckbox from "./PlayerAiCheckbox"
import PlayerNameInput from "./PlayerNameInput"

interface INewGameModalProps {
    close: () => void
    shown: boolean
}

interface INewGameModalState {
    showAlert: boolean
}

export default class NewGameModal extends Component<INewGameModalProps, INewGameModalState> {
    private readonly linkStyles: CSSProperties = {
        color: "white",
        display: "block",
        height: "100%",
        textDecoration: "none",
    }
    private readonly p1NameRef: React.RefObject<PlayerNameInput>
    private readonly p2NameRef: React.RefObject<PlayerNameInput>
    private readonly p1AIRef: React.RefObject<PlayerAiCheckbox>
    private readonly p2AIRef: React.RefObject<PlayerAiCheckbox>

    public constructor(props: INewGameModalProps) {
        super(props)
        this.state = {
            showAlert: false,
        }
        this.p1NameRef = React.createRef()
        this.p2NameRef = React.createRef()
        this.p1AIRef = React.createRef()
        this.p2AIRef = React.createRef()

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    public render() {
        return (
            <Modal isOpen={this.props.shown} onExit={this.props.close} size="lg" tabIndex={-1}>
                <ModalHeader toggle={this.props.close}>Create A New Game</ModalHeader>
                <ModalBody>
                    <p>Set the names of the players</p>
                    <Form>
                        <Row>
                            <Col xs={6}>
                                <PlayerNameInput playerNumber={1} ref={this.p1NameRef} />
                            </Col>
                            <Col xs={6}>
                                <PlayerNameInput playerNumber={2} ref={this.p2NameRef} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <PlayerAiCheckbox playerNumber={1} ref={this.p1AIRef} />
                            </Col>
                            <Col xs={6}>
                                <PlayerAiCheckbox playerNumber={2} ref={this.p2AIRef} />
                            </Col>
                        </Row>
                    </Form>
                    <Alert color="danger" isOpen={this.state.showAlert}>
                        Both Players Cannot be AI controlled
                    </Alert>
                </ModalBody>
                <ModalFooter>
                    <Link
                        to={{
                            pathname: "/play/0",
                            search: "?newGame=true",
                        }}
                        style={this.linkStyles}
                        onClick={this.handleSubmit}
                    >
                        <Button color="success" size="lg">
                            Play Game!
                        </Button>
                    </Link>
                    <Button color="danger" size="lg" onClick={this.props.close}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

    private handleSubmit(event: any): void {
        if (
            this.p1NameRef.current &&
            this.p2NameRef.current &&
            this.p1AIRef.current &&
            this.p2AIRef.current
        ) {
            const { name: p1Name, isValid: p1Valid } = this.p1NameRef.current.state
            const { name: p2Name, isValid: p2Valid } = this.p2NameRef.current.state

            if (
                this.p1AIRef.current.state.checked &&
                this.p2AIRef.current.state.checked &&
                /* this is a little hack to allow both players
                    to be controlled by the "AI"
                    run in console window.allowBothAI = true
                */
                // @ts-ignore
                !window.allowBothAI
            ) {
                event.preventDefault()
                this.setState({ showAlert: true })
                return
            } else {
                this.setState({ showAlert: false })
            }

            if (p1Valid && p2Valid) {
                const info: IGameInfo = {
                    board: null,
                    created: new Date(),
                    isNewGame: true,
                    last: new Date(),
                    p1: {
                        is_ai: this.p1AIRef.current.state.checked,
                        name: p1Name,
                        score: 0,
                    },
                    p2: {
                        is_ai: this.p2AIRef.current.state.checked,
                        name: p2Name,
                        score: 0,
                    },
                    turn: 1,
                }
                const saved: IGameInfo[] = Lockr.get("saved_games") || []
                Lockr.set("saved_games", [info, ...saved])
                this.props.close()
            } else {
                event.preventDefault()
            }
        } else {
            event.preventDefault()
        }
    }
}
