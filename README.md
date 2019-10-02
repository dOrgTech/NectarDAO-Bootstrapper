# nectardao-demo-dapp
MVP dApp to demonstrate NectarDAO bootstrap interface

## Instructions

### Installation
- Install dependencies
    ```
    yarn
    ```
    
### Setup Environment
- You'll need a local ganache instance running and a metamask-enabled browser. The deploy script is configured to connect to the default Ganache host (localhost:8545). This ganache instance should have a gas limit of 4294967295.

- Ganache-cli parameters
  ```
  ganache-cli --deterministic -l 4294967295
  ```

### Start App
- The app will live at localhost:3000, unless that port is taken in which case it will ask to use another port.
    ```
    yarn start
    ```

### Test
- No front-end tests at the moment. (Jest is included for testing React components).
    ```
    yarn test
    ```
    
### Build For Production
- Full dApp build will live in /build folder.
    ```
    yarn build
    ```
