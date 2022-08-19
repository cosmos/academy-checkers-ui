import React, { CSSProperties } from "react"
import * as FontAwesome from "react-icons/fa"
import { Link } from "react-router-dom"
import { Button } from "reactstrap"

interface IMenuItemsButtonsProps {
    deleteGame: () => void
    showButtons: boolean
    index: number
}

const MenuItemButtons = (props: IMenuItemsButtonsProps) => {
    const linkStyles: CSSProperties = {
        color: "white",
        display: "block",
        height: "100%",
        margin: "4px 0px",
        textDecoration: "none",
    }
    return (
        <div>
            {props.showButtons && (
                <div>
                    <Link to={{ pathname: `/play/${props.index}` }} style={linkStyles}>
                        <Button block={true} color="success">
                            Resume Game <FontAwesome.FaShareSquare />
                        </Button>
                    </Link>
                    <Button block={true} color="danger" className="delete" onClick={props.deleteGame}>
                        Delete Game <FontAwesome.FaTrash />
                    </Button>
                </div>
            )}
        </div>
    )
}
export default MenuItemButtons
