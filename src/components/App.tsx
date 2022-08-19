import React, { CSSProperties } from "react"
import Loadable from "react-loadable"
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom"
import { Container } from "reactstrap"
import Footer from "./Footer"
import GameContainer from "./Game/GameContainer"
import Loading from "./Loading"
import MenuContainer from "./Menu/MenuContainer"

const styles: CSSProperties = {
    minWidth: "800px",
    padding: "0 0 100px",
    position: "relative",
}
const titleStyles: CSSProperties = {
    fontFamily: "Roboto, sans-serif",
    fontSize: "50px",
    textAlign: "center",
}

const GameContainerWrapper = () => <GameContainer index={useParams().index!} location={useLocation()} />

const AsyncGameContainer = Loadable({
    loader: () => Promise.resolve(GameContainerWrapper),
    loading: Loading,
})
const AsyncHowToPlay = Loadable({
    loader: () => import("./HowToPlay/HowToPlay"),
    loading: Loading,
})

const App = () => {
    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    return (
        <Container style={styles}>
            <div className="well">
                <div style={titleStyles}>Checkers</div>
                <Routes>
                    <Route path="menu" element={<MenuContainer location={""} />} />
                    <Route path="play/:index" element={<AsyncGameContainer />} />
                    <Route path="howtoplay" element={<AsyncHowToPlay goBack={goBack} />} />
                    <Route path="*" element={<Navigate to="/menu" replace={true} />} />
                </Routes>
            </div>
            <Footer />
        </Container>
    )
}
export default App
