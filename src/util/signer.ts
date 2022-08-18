import { DirectSecp256k1HdWallet, DirectSecp256k1Wallet, OfflineDirectSigner } from "@cosmjs/proto-signing"
import { fromHex } from "@cosmjs/encoding"

export const getSignerFromMnemonic = async (mnemonic: string): Promise<OfflineDirectSigner> => {
    return DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
        prefix: "cosmos",
    })
}

export const getSignerFromPriKey = async (priKey: string): Promise<OfflineDirectSigner> => {
    return DirectSecp256k1Wallet.fromKey(fromHex(priKey), "cosmos")
}
