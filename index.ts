const readlineSync = require("readline-sync");
import Block from "./src/Block";
import Blockchain from "./src/Blockchain";

const usage = `
 _____________________________________________________________________________________________________________
|                                                                                                             |
|  Usage:-                                                                                                    |
|  -> add sender_name receiver_name transfer_amount  # adds a block to blockchain with the given data         |
|  -> show                                           # shows the list of blocks available in the blockchain   |
|  -> tamper block_number                            # tampers with the block giver by the number             |
|  -> check                                          # validates the blockchain                               |
|  -> help                                           # show this message                                      |
|  -> exit                                           # close the program                                      |
|_____________________________________________________________________________________________________________|
`;

let input: string;
console.log(usage);

const format = (chain: Array<Block>, limit: number) => {
  let string = "";
  const isLongList = chain.length > limit;
  const newChain = chain.slice(isLongList ? chain.length - limit : 0);
  newChain.forEach((block, index) => {
    if (index == 0 && !isLongList) return;
    string += `\n[${index + (isLongList ? 1 : 0)}]\tSender: ${
      block.data?.from
    }\tReceiver: ${block.data?.to}\tAmount-Transfered: ${block.data?.amount}`;
  });
  return string;
};

const blockchain = Blockchain.create(2);

do {
  input = readlineSync.question("-> ");
  const commands = input.split(" ");
  const command = commands[0];
  const length = commands.length;
  const outputLimit = 10;
  switch (command) {
    case "add":
      if (length !== 4) {
        console.log("<- WRONG NUMBER OF ARGUMENTS!");
        continue;
      }
      const amount = parseFloat(commands[3]);
      if (isNaN(amount)) {
        console.log("<- Please give a correct Amount");
        continue;
      }
      blockchain.addBlock(commands[1], commands[2], amount);
      break;
    case "show":
      process.stdout.write("<- ");
      console.log(format(blockchain.chain, outputLimit));
      break;
    case "tamper":
      if (length !== 2) {
        console.log("<- WRONG NUMBER OF ARGUMENTS :(");
        continue;
      }
      const index = parseInt(commands[1]);
      if (index < 1 || index > outputLimit) {
        console.log("<- WRONG INDEX FOR BLOCK");
        continue;
      }
      const chainLength = blockchain.chain.length;
      const changeIndex =
        index + (chainLength > outputLimit ? chainLength - outputLimit - 1 : 0);
      blockchain.chain[changeIndex].timestamp = new Date();
      break;
    case "check":
      console.log(
        blockchain.isValid()
          ? "<- The Blockchain is valid :)"
          : "<- [CRITICAL] The Blockchain is compromised :("
      );
      break;
    case "help":
      console.log(usage);
      break;
    case "exit":
      console.log("<- GOODBYE! :(");
      break;
    default:
      console.log("<- WRONG COMMAND :(");
  }
} while (input !== "exit");
