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
    //todo implement the hashing function then the mining function.
  }
}

const block = new Block({ from: "ankan", to: "baby", amount: 10000 }, "0000");
console.log(block);

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
  static create(difficulty: number) {
    const genesisBlock: GenesisBlock = {
      hash: "0",
      previousHash: null,
      timestamp: new Date(),
    };
    return new Blockchain(genesisBlock, [genesisBlock], difficulty);
  }
  addBlock(from: string, to: string, amount: number) {
    const blockData: Transaction = { from, to, amount };
    const lastBlock = this.chain[this.chain.length - 1];
    const newBlock: Block = new Block(blockData, lastBlock.hash);
    newBlock.mine(this.difficulty);
    return new Blockchain(
      this.genesisBlock,
      [...this.chain, newBlock],
      this.difficulty
    );
  }
}
