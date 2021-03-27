# Pintu Assessment

This assessment project was developed in Truffle framework using Ganache as a client and Fortmatic as a wallet connect.

## How To Install

1. Clone this repository
2. Install the dependencies
    ```sh
    npm install
    ```
3. Prepare Ganache as a client
    - Download and install [Ganache] first
    - Open Ganache and create New Workspace
    - On Truffle Project, click add project and choose truffle-config.js inside this project
    - Save Workspace
4. Start the server
    ```sh
    npm run dev
    ```
5. Open the server in browser and Fortmatic dialog box will pop up.
6. Create your Ethereum Fortmatic Address by SignUp and Login
7. Do not forget to add some balance to your new Ethereum Fortmatic Address in Ganache network (default is http://127.0.0.1:7545), as the Dapp need some ETH to make transactions. You could add balance by Metamask, Fortmatic, or etc.

## How To Run Contract Test

1. Change directory to this project
    ```sh
    cd pintu
    ```
2. Install Truffle globally
    ```sh
    npm install -g truffle
    ```
3. Start the Truffle test
    ```sh
    truffle test ./test/app.js
    ```


   [ganache]: <https://www.trufflesuite.com/ganache>
