# A simple implementation of Blockchain🔥

This is a bare minimum implementation of the blockchain technology using TypeScript for educational purposes only.

configure the function inside the `index.ts` to configure the blockchain instance.

This repository is part of a tutorial in [Medium](https://ankan101.medium.com/f2f8ccc54892?source=friends_link&sk=d92968f468d4e607355c6f0363e3be74)

![Blockchain illustration](https://i.imgur.com/wVnx1Mq.png)

# Getting Started

### 1. Install Node.js:

You need to have npm installed in your computer. It comes with Node.js and you can get it by installing Node from https://nodejs.org/en/

### 2. Clone Repository:

Clone this repository from the terminal by running `git clone https://github.com/ankanbag101/blockchain-demo/`

### 3. Open the Directory:

cd into the directory to run the program. Run `cd blockchain-demo`

### 4. Install Dependencies:

Run `npm install` to install all dependencies.

### 5. Run the program

Run `npm start` and the program will start executing with a usage instructions.

```
git clone https://github.com/ankanbag101/blockchain-demo/
cd blockchain-demo
npm install
npm start
```

## Usage

### 1. To add a block to the blockchain:

Enter `add sender_name receiver_name transfer_amout` in the prompt. <br />
_Example_: `add Bob Alice 200` - will create create a block with the transaction of amount 200 sent by Bob to Alice.

### 2. To show all the transactions in the blockchain

Enter `show` in the prompt to show last 10 verified transactions in the blockchain.

### 3. To tamper with a transaction

Enter `tamper` with a **block number** shown in the `show` command. <br />
_Example_: `tamper 2` will tamper with the 2nd verified transaction in the blockchain.

### 4. To check if the blockchain is valid or not

Enter `check` to run a validation test that will check the integrity of the blockchain and print a message accordingly.

### 5. To show the usage instruction on the screen

Enter `help` to show the instructions.

### 6. To terminate the program

Enter `exit` in the prompt or hit <kbd>ctrl</kbd>+<kbd>c</kbd>

```
Usage:
-> add sender_name receiver_name transfer_amount  # adds a block to blockchain with the given data
-> show                                           # shows the list of blocks available in the blockchain
-> tamper block_number                            # tampers with the block giver by the number
-> check                                          # validates the blockchain
-> help                                           # show this message
-> exit                                           # close the program
```
