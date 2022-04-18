import React, { CSSProperties } from "react"

const styles: CSSProperties = {
    bottom: 0,
    height: "100px",
    left: 0,
    position: "absolute",
    width: "100%",
}
const Footer = () => (
    <footer style={styles}>
        <hr />
        <h4 className="small text-center">Created by Nathaniel Sigafoos</h4>
        <p className="small text-center">
            View source on <a href="https://github.com/nablsi14/react-checkers">GitHub</a>
        </p>
    </footer>
)

export default Footer
