import React, { useEffect } from 'react'
import { useWeb3Context } from 'web3-react'
import { observer, inject, PropTypes } from "mobx-react"


// This component must be a child of <App> to have access to the appropriate context
const Web3Manager = inject('root')(observer((props) => {
    const context = useWeb3Context()
    // const { providerStore } = root

    useEffect(() => {
        context.setFirstValidConnector(['MetaMask', 'Infura'])
    }, [])

    if (!context.active && !context.error) {
        // loading
        console.log('loading')
        // Return Loading Thing
        return <React.Fragment><p>{context.account}</p>{props.children}</React.Fragment>
    } else if (context.error) {
        //error
        console.log('error')
        // Return Error Thing
        return <React.Fragment><p>{context.error}</p>{props.children}</React.Fragment>
    } else {
        // success
        console.log('success')
        console.log('context', context)
        // Return Window OR wrong network
        return <React.Fragment><p>{context.account}</p>{props.children}</React.Fragment>
    }
}))

export default Web3Manager