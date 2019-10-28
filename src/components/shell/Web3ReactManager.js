import React, { useState, useEffect } from 'react'
import { useWeb3Context, Connectors } from 'web3-react'
import styled from 'styled-components'
import { ethers } from 'ethers'
import { isMobile } from 'react-device-detect'
import LoadingCircle from 'components/common/LoadingCircle'
import Web3 from 'web3'
const { Connector } = Connectors

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20rem;
`

const Message = styled.h2``

function tryToSetConnector(setConnector, setError) {
    setConnector('Injected', { suppressAndThrowErrors: true }).catch(() => {
        setConnector('Network', { suppressAndThrowErrors: true }).catch(error => {
            setError(error)
        })
    })
}

export default function Web3ReactManager({ children }) {
    const { active, error, setConnector, setError } = useWeb3Context()
    console.log(useWeb3Context())
    // control whether or not we render the error, after parsing
    const blockRender = error && error.code && error.code === Connector.errorCodes.UNSUPPORTED_NETWORK

    useEffect(() => {
        if (!active && !error) {
            if (window.ethereum || window.web3) {
                if (isMobile) {
                    tryToSetConnector(setConnector, setError)
                } else {
                    const library = new Web3(window.ethereum || window.web3)
                    library.eth.getAccounts().then(accounts => {
                        if (accounts.length >= 1) {
                            tryToSetConnector(setConnector, setError)
                        } else {
                            setConnector('Network', { suppressAndThrowErrors: true }).catch(error => {
                                setError(error)
                            })
                        }
                    })
                }
            } else {
                setConnector('Network', { suppressAndThrowErrors: true }).catch(error => {
                    setError(error)
                })
            }
        }
    })

    // parse the error
    useEffect(() => {
        if (error) {
            // if the user changes to the wrong network, unset the connector
            if (error.code === Connector.errorCodes.UNSUPPORTED_NETWORK) {
                setConnector('Network', { suppressAndThrowErrors: true }).catch(error => {
                    setError(error)
                })
            }
        }
    })

    const [showLoader, setShowLoader] = useState(false)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowLoader(true)
        }, 600)
        return () => {
            clearTimeout(timeout)
        }
    }, [])

    if (blockRender) {
        return null
    } else if (error) {
        return (
            <MessageWrapper>
                <Message>{'Unknown Error'} </Message>
            </MessageWrapper>
        )
    } else if (!active) {
        return showLoader ? (
            <MessageWrapper>
                <LoadingCircle />
            </MessageWrapper>
        ) : null
    } else {
        return children
    }
}