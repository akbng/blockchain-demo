const { createHash } = require("crypto");

interface Transaction {
  from: string;
  to: string;
  amount: number;
}

interface GenesisBlock {
  hash: string;
  previousHash: null;
  timestamp: Date;
}

const calculateHash = (block: Block): string => {
  const data = JSON.stringify(block.data);
  const blockData =
    data +
    block.previousHash +
    block.timestamp.toISOString() +
    block.pow.toString();
  const hash = createHash("sha256");
  hash.update(blockData);
  return hash.digest("hex");
};

class Block {
  data: Transaction;
  hash: string;
  previousHash: string;
  timestamp: Date;
  pow: number;
  constructor(data: Transaction, previousHash: string) {
    this.data = data;
    this.hash = ""; //todo change this!
    this.previousHash = previousHash;
    this.timestamp = new Date();
    this.pow = 0;
  }
  mine(difficulty: number): void {
    //todo implement the mine functionality
    const regex = new RegExp(`^(0){${difficulty}}.*`);
    while (!this.hash.match(regex)) {
      this.pow++;
      this.hash = calculateHash(this);
    }
  }
}

class Blockchain {
  genesisBlock: GenesisBlock;
  chain: Array<Block | GenesisBlock>;
  difficulty: number;
  constructor(
    genesisBlock: GenesisBlock,
    chain: Array<Block | GenesisBlock>,
    difficulty: number
  ) {
    this.genesisBlock = genesisBlock;
    this.chain = chain;
    this.difficulty = difficulty;
  }
  static create(difficulty: number): Blockchain {
    const genesisBlock: GenesisBlock = {
      hash: "0",
      previousHash: null,
      timestamp: new Date(),
    };
    return new Blockchain(genesisBlock, [genesisBlock], difficulty);
  }
  addBlock(from: string, to: string, amount: number): void {
    const blockData: Transaction = { from, to, amount };
    const lastBlock = this.chain[this.chain.length - 1];
    const newBlock: Block = new Block(blockData, lastBlock.hash);
    newBlock.mine(this.difficulty);
    this.chain.push(newBlock);
  }
}

(function () {
  const blockchain = Blockchain.create(3);
  blockchain.addBlock("Alice", "Bob", 5);
  blockchain.addBlock("John", "Doe", 100);
  console.log(blockchain);
})();
