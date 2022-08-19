import Lockr from "lockr"
import QueryString from "query-string"
import React, { Component } from "react"
import {} from "../../types/checkers/extensions-gui"
import { CheckersStargateClient } from "src/checkers_stargateclient"
import { IGameInfo } from "../../sharedTypes"
import Menu from "./Menu"

// declare const localStorageSupport: boolean;
// declare var gameToLoad: boolean | null;

interface IMenuContainerProps {
    location?: any
    rpcUrl: string
}

interface IMenuContainerState {
    saved: IGameInfo[]
    showAlert: boolean
    showModal: boolean
    client: CheckersStargateClient | undefined
}

export default class MenuContainer extends Component<IMenuContainerProps, IMenuContainerState> {
    constructor(props: IMenuContainerProps) {
        super(props)
        this.state = {
            saved: [],
            showAlert: false,
            showModal: false,
            client: undefined,
        }
        this.closeModal = this.closeModal.bind(this)
        this.deleteGame = this.deleteGame.bind(this)
        this.dismissAlert = this.dismissAlert.bind(this)
        this.openModal = this.openModal.bind(this)
    }
    public async componentDidMount(): Promise<void> {
        const queries = QueryString.parse(this.props.location.search)
        if (queries.newGame) {
            this.setState({ showModal: true })
        }
        this.setState({
            saved: await (await this.getStargateClient()).getGuiGames(),
        })
    }
    protected async getStargateClient(): Promise<CheckersStargateClient> {
        const client: CheckersStargateClient =
            this.state.client ?? (await CheckersStargateClient.connect(this.props.rpcUrl))
        if (!this.state.client) this.setState({ client: client })
        return client
    }
    /**
     * dismissAlert
     */
    public dismissAlert(): void {
        this.setState({ showAlert: false })
    }
    public deleteGame(index: number): void {
        const { saved } = this.state
        saved.splice(index, 1)
        Lockr.set("saved_games", saved)
        this.setState({ saved })
    }
    public openModal(): void {
        this.setState({ showModal: true })
    }
    public closeModal(): void {
        this.setState({ showModal: false })
    }

    public render(): JSX.Element {
        return (
            <Menu
                closeModal={this.closeModal}
                deleteGame={this.deleteGame}
                dismissAlert={this.dismissAlert}
                games={this.state.saved}
                modalIsShown={this.state.showModal}
                openModal={this.openModal}
                showAlert={this.state.showAlert}
                rpcUrl={this.props.rpcUrl}
            />
        )
    }
}
