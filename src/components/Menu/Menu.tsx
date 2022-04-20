import React from "react"
import * as FontAwesome from "react-icons/fa"
import { Link } from "react-router-dom"
import { Alert, Button, ListGroup, ListGroupItem } from "reactstrap"
import { IGameInfo } from "../../sharedTypes"
import MenuItem from "./MenuItem"
import NewGameModal from "./NewGameModal/NewGameModal"

interface IMenuProps {
    closeModal: () => void
    deleteGame: (index: number) => void
    dismissAlert: () => void
    games: IGameInfo[]
    modalIsShown: boolean
    openModal: () => void
    showAlert: boolean
    rpcUrl: string
}

const Menu = (props: IMenuProps) => {
    const menuItems = props.games.map((game, index) => (
        <MenuItem deleteGame={props.deleteGame} info={game} index={game.index} key={"game" + game.index} />
    ))
    return (
        <div style={{ minHeight: "150px", padding: "10px" }} id="savedGames">
            <div style={{ height: "50px", marginBottom: "5px" }}>
                <Link to="/howtoplay" style={{ color: "white", textDecoration: "none" }}>
                    <Button color="info" size="lg" style={{ margin: "2px" }}>
                        How to Play
                    </Button>
                </Link>
                <Button color="success" size="lg" onClick={props.openModal} style={{ margin: "2px" }}>
                    New Game <FontAwesome.FaPlus />
                </Button>
            </div>
            <ListGroup style={{ clear: "left", display: "block", height: "100%" }}>
                {props.games.length === 0 && (
                    <ListGroupItem>
                        <h2 className="text-center">You have no saved games</h2>
                    </ListGroupItem>
                )}
                {menuItems}
            </ListGroup>
            <Alert color="warning" isOpen={props.showAlert} toggle={props.dismissAlert}>
                Sorry, this browser does not support local storage. Please try using a different browser.
            </Alert>
            <NewGameModal shown={props.modalIsShown} close={props.closeModal} rpcUrl={props.rpcUrl} />
        </div>
    )
}
export default Menu
