import http, { IncomingMessage, RequestOptions } from "http"
import _ from "../../environment"

export const httpRequest = async (
    url: string | URL,
    options: RequestOptions,
    postData: string,
): Promise<string> =>
    new Promise((resolve, reject) => {
        let all = ""
        const req = http.request(url, options, (response: IncomingMessage) => {
            response.setEncoding("utf8")
            response.on("error", reject)
            response.on("end", () => {
                if (400 <= response.statusCode!) reject(all)
                else resolve(all)
            })
            response.on("data", (chunk) => (all = all + chunk))
        })
        req.write(postData)
        req.end()
    })

export const askFaucet = async (
    address: string,
    tokens: { [denom: string]: number },
): Promise<string | string[]> =>
    askFaucetComsJs(address, tokens).catch(() => askFaucetIgniteCli(address, tokens))

export const askFaucetComsJs = async (
    address: string,
    tokens: { [denom: string]: number },
): Promise<string[]> =>
    Promise.all(
        Object.keys(tokens).map((denom) =>
            httpRequest(
                `${process.env.FAUCET_URL}/credit`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                },
                JSON.stringify({ address, denom }),
            ),
        ),
    )

export const askFaucetIgniteCli = async (
    address: string,
    tokens: { [denom: string]: number },
): Promise<string> =>
    httpRequest(
        process.env.FAUCET_URL,
        { method: "POST" },
        JSON.stringify({
            address: address,
            coins: Object.entries(tokens).map(([denom, value]) => value + denom),
        }),
    )
