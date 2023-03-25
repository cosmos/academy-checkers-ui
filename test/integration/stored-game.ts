import { expect } from "chai"
import { config } from "dotenv"
import Long from "long"
import _ from "../../environment"
import { CheckersStargateClient } from "../../src/checkers_stargateclient"
import { CheckersExtension } from "../../src/modules/checkers/queries"

config()

describe("StoredGame", function () {
    let client: CheckersStargateClient, checkers: CheckersExtension["checkers"]

    before("create client", async function () {
        client = await CheckersStargateClient.connect(process.env.RPC_URL)
        checkers = client.checkersQueryClient!.checkers
    })

    it("can get game list", async function () {
        const allGames = await checkers.getAllStoredGames(
            Uint8Array.of(),
            Long.fromInt(0),
            Long.fromInt(0),
            true,
        )
        expect(allGames.storedGames).to.be.length.greaterThanOrEqual(0)
    })

    it("cannot get non-existent game", async function () {
        try {
            await checkers.getStoredGame("no-id")
            expect.fail("It should have failed")
        } catch (error) {
            expect(error.toString()).to.equal(
                "Error: Query failed with (22): rpc error: code = NotFound desc = not found: key not found",
            )
        }
    })
})
