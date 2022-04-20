import { config } from "dotenv"
import { writeFile } from "fs/promises"
import { Server } from "http"
import express, { Express, Request, Response } from "express"
import { CheckersStargateClient } from "../checkers_stargateclient"
import { DbType } from "./types"

config()

export const createIndexer = async () => {
    const port = "3001"
    const dbFile = `${__dirname}/db.json`
    const db: DbType = require(dbFile)
    const pollIntervalMs = 5_000 // 5 seconds
    let timer: NodeJS.Timer | undefined
    let client: CheckersStargateClient

    const app: Express = express()
    app.get("/", (req: Request, res: Response) => {
        res.send({
            error: "Not implemented",
        })
    })

    app.get("/status", (req: Request, res: Response) => {
        res.json({
            block: {
                height: db.status.block.height,
            },
        })
    })

    app.get("/players/:playerAddress", (req: Request, res: Response) => {
        res.json({
            gameCount: db.players[req.params.playerAddress]?.gameIds?.length ?? 0,
            gameIds: db.players[req.params.playerAddress]?.gameIds ?? [],
        })
    })

    app.get("/players/:playerAddress/gameIds", (req: Request, res: Response) => {
        res.json(db.players[req.params.playerAddress]?.gameIds ?? [])
    })

    app.patch("/games/:gameId", (req: Request, res: Response) => {
        res.json({
            result: "Not implemented",
        })
    })

    const saveDb = async () => {
        await writeFile(dbFile, JSON.stringify(db, null, 4))
    }

    const init = async () => {
        client = await CheckersStargateClient.connect(process.env.RPC_URL!)
        console.log("Connected to chain-id:", await client.getChainId())
        setTimeout(poll, 1)
    }

    const poll = async () => {
        const currentHeight = await client.getHeight()
        console.log(
            new Date(Date.now()).toISOString(),
            "Current heights:",
            db.status.block.height,
            "<=",
            currentHeight,
        )
        timer = setTimeout(poll, pollIntervalMs)
    }

    process.on("SIGINT", () => {
        if (timer) clearTimeout(timer)
        saveDb()
            .then(() => {
                console.log(`${dbFile} saved`)
            })
            .catch(console.error)
            .finally(() => {
                server.close(() => {
                    console.log("server closed")
                    process.exit(0)
                })
            })
    })

    const server: Server = app.listen(port, () => {
        init()
            .catch(console.error)
            .then(() => {
                console.log(`\nserver started at http://localhost:${port}`)
            })
    })
}
