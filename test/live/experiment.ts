import { config } from "dotenv"
import Long from "long"
import { CheckersStargateClient } from "../../src/checkers_stargateclient"

config()

async function runAll() {
    const client: CheckersStargateClient = await CheckersStargateClient.connect(process.env.RPC_URL)
    const checkers = client.checkersQueryClient!.checkers

    // Initial NextGame
    const nextGame0 = await checkers.getNextGame()
    console.log("NextGame:", nextGame0, ", idValue:", nextGame0.idValue.toString(10))

    // All Games
    const allGames0 = await checkers.getAllStoredGames(
        Uint8Array.of(),
        Long.fromInt(0),
        Long.fromInt(0),
        true,
    )
    console.log("All games", allGames0, ", total: ", allGames0.pagination!.total.toString(10))

    // Non-existent game
    try {
        await checkers.getStoredGame("1024")
    } catch (error1024) {
        console.log(error1024)
    }
}

runAll()
