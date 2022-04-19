import React, { Component, CSSProperties } from "react"
import { Alert, Button, Col, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap"
import { OfflineSigner } from "@cosmjs/proto-signing"
import { GasPrice } from "@cosmjs/stargate"
import { Window as KeplrWindow } from "@keplr-wallet/types"
import {} from "../../../types/checkers/extensions-gui"
import { checkersChainId, getCheckersChainInfo } from "../../../types/checkers/chain"
import { CheckersSigningStargateClient } from "../../../checkers_signingstargateclient"
import "./NewGame.css"
import PlayerAiCheckbox from "./PlayerAiCheckbox"
import PlayerNameInput from "./PlayerNameInput"

declare global {
    interface Window extends KeplrWindow {}
}

interface CreatorInfo {
    creator: string
    signingClient: CheckersSigningStargateClient
}

interface INewGameModalProps {
    close: () => void
    shown: boolean
    rpcUrl: string
}
interface INewGameModalState {
    showAlert: boolean
    creator: string
    signingClient: CheckersSigningStargateClient | undefined
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
            creator: "",
            signingClient: undefined,
        }
        this.p1NameRef = React.createRef()
        this.p2NameRef = React.createRef()
        this.p1AIRef = React.createRef()
        this.p2AIRef = React.createRef()

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    protected async getSigningStargateClient(): Promise<CreatorInfo> {
        if (this.state.creator && this.state.signingClient)
            return {
                creator: this.state.creator,
                signingClient: this.state.signingClient,
            }
        const { keplr } = window
        if (!keplr) {
            alert("You need to install Keplr")
            throw new Error("You need to install Keplr")
        }
        await keplr.experimentalSuggestChain(getCheckersChainInfo())
        const offlineSigner: OfflineSigner = keplr.getOfflineSigner!(checkersChainId)
        const creator = (await offlineSigner.getAccounts())[0].address
        const client: CheckersSigningStargateClient = await CheckersSigningStargateClient.connectWithSigner(
            this.props.rpcUrl,
            offlineSigner,
            {
                gasPrice: GasPrice.fromString("1stake"),
            },
        )
        this.setState({ creator: creator, signingClient: client })
        return { creator: creator, signingClient: client }
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
                    <div style={this.linkStyles} onClick={this.handleSubmit}>
                        <Button color="success" size="lg">
                            Play Game!
                        </Button>
                    </div>
                    <Button color="danger" size="lg" onClick={this.props.close}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

    private async handleSubmit(event: any): Promise<void> {
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
                const { creator, signingClient } = await this.getSigningStargateClient()
                const index: string = await signingClient.createGuiGame(creator, p1Name, p2Name)
                this.props.close()
                window.location.replace(`/play/${index}`)
            } else {
                event.preventDefault()
            }
        } else {
            event.preventDefault()
        }
    }
}
