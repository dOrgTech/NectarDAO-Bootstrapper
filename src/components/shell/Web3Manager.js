import React, { useEffect } from 'react'
import { useWeb3Context } from 'web3-react'
import { observer, inject } from "mobx-react"


// This component must be a child of <App> to have access to the appropriate context
const Web3Manager = inject('root')(observer(() => {
    const context = useWeb3Context()
    // const { providerStore } = root

    useEffect(() => {
        context.setFirstValidConnector(['MetaMask', 'Infura'])
    }, [])

    if (!context.active && !context.error) {
        // loading
        console.log('loading')
        return <p>{context.account}</p>
    } else if (context.error) {
        //error
        console.log('error')
        return <p>{context.error}</p>
    } else {
        // success
        console.log('success')
        return <p>{context.account}</p>
    }
}))

export default Web3Manager