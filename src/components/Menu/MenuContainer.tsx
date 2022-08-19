import Lockr from "lockr"
import QueryString from "query-string"
import React, { Component } from "react"
import { IGameInfo } from "../../sharedTypes"
import Menu from "./Menu"

// declare const localStorageSupport: boolean;
// declare var gameToLoad: boolean | null;

interface IMenuContainerProps {
    location?: any
}

interface IMenuContainerState {
    saved: IGameInfo[]
    showAlert: boolean
    showModal: boolean
}

export default class MenuContainer extends Component<IMenuContainerProps, IMenuContainerState> {
    constructor(props: IMenuContainerProps) {
        super(props)
        this.state = {
            saved: [],
            showAlert: false,
            showModal: false,
        }
        this.closeModal = this.closeModal.bind(this)
        this.deleteGame = this.deleteGame.bind(this)
        this.dismissAlert = this.dismissAlert.bind(this)
        this.openModal = this.openModal.bind(this)
    }
    public componentDidMount(): void {
        const queries = QueryString.parse(this.props.location.search)
        if (queries.newGame) {
            this.setState({ showModal: true })
        }
        if (typeof Storage === "undefined") {
            // tslint:disable-next-line:no-console
            console.warn("This browser does not support localstroage. You will be unable to save games.")
            this.setState({ showAlert: true })
        }
        // gameToLoad = null;
        this.setState({
            saved: Lockr.get("saved_games") || [],
        })
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
            />
        )
    }
}
