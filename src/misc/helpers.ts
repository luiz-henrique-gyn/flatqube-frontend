import { Address, hasEverscaleProvider, Permissions } from 'everscale-inpage-provider'

import { useRpc } from '@/hooks/useRpc'
import { useStaticRpc } from '@/hooks/useStaticRpc'
import { Dex } from '@/misc/dex'
import { debug, sliceAddress } from '@/utils'


const rpc = useRpc()
const staticRpc = useStaticRpc()


export async function connectToWallet(): Promise<Permissions['accountInteraction'] | undefined> {
    const hasProvider = await hasEverscaleProvider()

    if (hasProvider) {
        await rpc.ensureInitialized()
        return (await rpc.requestPermissions({
            permissions: ['basic', 'accountInteraction'],
        })).accountInteraction
    }
    return undefined
}

export async function checkPair(leftRoot: string, rightRoot: string): Promise<Address | undefined> {
    const pairAddress = await Dex.pairAddress(new Address(leftRoot), new Address(rightRoot))
    const pairState = await staticRpc.getFullContractState({
        address: pairAddress,
    })

    if (!pairState.state?.isDeployed) {
        if (process.env.NODE_ENV === 'development') {
            debug(
                `%cRPC%c [Check Pair]: %c${sliceAddress(pairAddress?.toString())}%c is%c not deployed`,
                'font-weight: bold; background: #4a5772; color: #fff; border-radius: 2px; padding: 3px 6.5px',
                'color: #c5e4f3',
                'color: #bae701',
                'color: #c5e4f3',
                'color: #defefe',
            )
        }

        return undefined
    }

    if (!await Dex.pairIsActive(pairAddress)) {
        return undefined
    }

    if (process.env.NODE_ENV === 'development') {
        debug(
            `%cRPC%c [Check Pair]: Found one -> %c${sliceAddress(pairAddress?.toString())}`,
            'font-weight: bold; background: #4a5772; color: #fff; border-radius: 2px; padding: 3px 6.5px',
            'color: #c5e4f3',
            'color: #bae701',
        )
    }

    return pairAddress
}

export async function getDexAccount(wallet: string): Promise<string | undefined> {
    const address = await Dex.accountAddress(new Address(wallet))

    if (!address) {
        return undefined
    }

    const { state } = await staticRpc.getFullContractState({ address })

    if (!state?.isDeployed) {
        return undefined
    }

    try {
        await Dex.accountVersion(address)
        return address.toString()
    }
    catch (e) {
        return undefined
    }
}

export function isAddressValid(value?: string, allowMasterChain: boolean = false): boolean {
    if (value === undefined) {
        return false
    }

    if (allowMasterChain) {
        return /^(?:0|-1)[:][0-9a-fA-F]{64}$/.test(value)
    }
    return /^[0][:][0-9a-fA-F]{64}$/.test(value)
}
