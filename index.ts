const readlineSync = require("readline-sync");
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

const blockchain = Blockchain.create(2);

do {
  input = readlineSync.question("-> ");
  const commands = input.split(" ");
  const command = commands[0];
  const length = commands.length;
  switch (command) {
    case "add":
      if (length !== 4) {
        console.log("<- WRONG NUMBER OF ARGUMENTS!");
        continue;
      }
      blockchain.addBlock(commands[1], commands[2], parseFloat(commands[3]));
      break;
    // todo format show output and limit to last 10
    case "show":
      process.stdout.write("<- ");
      console.log(blockchain.chain);
      break;
    case "tamper":
      if (length !== 2) {
        console.log("<- WRONG NUMBER OF ARGUMENTS :(");
        continue;
      }
      const index = parseInt(commands[1]) - 1;
      if (index < 0 || index >= blockchain.chain.length) {
        console.log("<- WRONG INDEX FOR BLOCK");
        continue;
      }
      blockchain.chain[index].pow = 0;
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
