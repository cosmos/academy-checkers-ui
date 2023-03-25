declare global {
    namespace NodeJS {
        interface ProcessEnv {
            RPC_URL: string
        }
    }
}

export {}
