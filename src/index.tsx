import React from 'react';
import ReactDOM from 'react-dom';
import Web3Provider from 'web3-react'
import App from 'components/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react'
import RootStore from './stores/Root'
import InjectedConnector from 'connectors/InjectedConnector'
import NetworkOnlyConnector from 'connectors/NetworkOnlyConnector'

const Network = new NetworkOnlyConnector({ providerURL: process.env.REACT_APP_NETWORK_URL || '' })
const Injected = new InjectedConnector({ supportedNetworks: [Number(process.env.REACT_APP_NETWORK_ID || '1')] })
const connectors = { Injected, Network }

const Root = (
    <Provider root={RootStore}>
        <Web3Provider connectors={connectors} libraryName="web3.js">
            <App />
        </Web3Provider>
    </Provider>
)

ReactDOM.render(Root, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
