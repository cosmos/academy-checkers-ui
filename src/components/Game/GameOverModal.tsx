import React from "react"
import { Link } from "react-router-dom"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"

interface IGameOverModalProps {
    shown: boolean
    winner: string
}

const GameOverModal = (props: IGameOverModalProps) => (
    <Modal isOpen={props.shown} centered={true} contentClassName="text-center">
        <ModalHeader>Game Over!</ModalHeader>
        <ModalBody>
            <h2>{props.winner} Wins!</h2>
            <h5>Thanks for playing!</h5>
        </ModalBody>
        <ModalFooter>
            <Link to={{ pathname: "/menu", search: "?newGame=true" }}>
                <Button color="success" size="lg">
                    New Game
                </Button>
            </Link>
            <Link to="/menu">
                <Button color="primary" size="lg">
                    Back to Menu
                </Button>
            </Link>
        </ModalFooter>
    </Modal>
)
export default GameOverModal
