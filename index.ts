const readlineSync = require("readline-sync");
import color from "./lib/colors";
import Block from "./src/Block";
import Blockchain from "./src/Blockchain";

const usage = `${color.fg.green}
 ____________________________________________________________________________________________________________
|                                                                                                            |
|  ${color.blink}Usage:-${color.reset}${color.fg.green}                                                                                                   |
|  > add sender_name receiver_name transfer_amount  # adds a block to blockchain with the given data         |
|  > show                                           # shows the list of blocks available in the blockchain   |
|  > tamper block_number                            # tampers with the block giver by the number             |
|  > check                                          # validates the blockchain                               |
|  > help                                           # show this message                                      |
|  > exit                                           # close the program                                      |
|____________________________________________________________________________________________________________|
${color.reset}`;

let input: string;
console.log(usage);

const format = (chain: Array<Block>, limit: number) => {
  let string = "";
  const isLongList = chain.length > limit;
  const newChain = chain.slice(isLongList ? chain.length - limit : 0);
  newChain.forEach((block, index) => {
    if (index == 0 && !isLongList) return;
    string += `\n${color.fg.yellow}[${index + (isLongList ? 1 : 0)}]${
      color.reset
    }\t${color.fg.magenta}Sender:${color.reset} ${block.data?.from}\t${
      color.fg.magenta
    }Receiver:${color.reset} ${block.data?.to}\t${color.fg.magenta}Amount:${
      color.reset
    } ${block.data?.amount}`;
  });
  return string || `${color.fg.yellow}Nothing to show :(${color.reset}`;
};

const blockchain = Blockchain.create(2);

do {
  input = readlineSync.question(`${color.dim}> ${color.reset}`);
  const commands = input.split(" ");
  const command = commands[0];
  const length = commands.length;
  const outputLimit = 10;
  switch (command) {
    case "add":
      if (length !== 4) {
        console.log(color.fg.red, `WRONG NUMBER OF ARGUMENTS!`, color.reset);
        continue;
      }
      const amount = parseFloat(commands[3]);
      if (isNaN(amount)) {
        console.log(color.fg.red, `Please give a correct Amount`, color.reset);
        continue;
      }
      blockchain.addBlock(commands[1], commands[2], amount);
      break;
    case "show":
      process.stdout.write(color.bright + "TXs: " + color.reset);
      console.log(format(blockchain.chain, outputLimit));
      break;
    case "tamper":
      if (length !== 2) {
        console.log(color.fg.red, "WRONG NUMBER OF ARGUMENTS :(", color.reset);
        continue;
      }
      const index = parseInt(commands[1]);
      if (index < 1 || index > outputLimit) {
        console.log(color.fg.red, "WRONG INDEX FOR BLOCK", color.reset);
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
          ? `${color.fg.yellow}The Blockchain is valid :)`
          : `${color.fg.red}[CRITICAL] The Blockchain is compromised :(`,
        color.reset
      );
      break;
    case "help":
      console.log(usage);
      break;
    case "exit":
      console.log(color.fg.cyan, "GOODBYE! :(", color.reset);
      break;
    default:
      console.log(color.fg.magenta, "WRONG COMMAND :(", color.reset);
  }
} while (input !== "exit");
