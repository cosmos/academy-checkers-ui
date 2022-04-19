import "bootstrap/dist/css/bootstrap.min.css"
import Lockr from "lockr"
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./components/App"
import reportWebVitals from "./reportWebVitals"
import registerServiceWorker from "./registerServiceWorker"

Lockr.prefix = "react_checkers"
// make sure the browser supports local storage
// @ts-ignore
declare let localStorageSupport: boolean

// window.localStorageSupport = typeof(Storage) !== "undefined";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App rpcUrl={process.env.RPC_URL!} />
        </BrowserRouter>
    </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
registerServiceWorker()
reportWebVitals()
