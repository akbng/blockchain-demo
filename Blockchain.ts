const { createHash } = require("crypto");

interface Transaction {
  from: string;
  to: string;
  amount: number;
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
  data: Transaction | null;
  hash: string;
  previousHash: string | undefined;
  timestamp: Date;
  pow: number;
  constructor(data: Transaction | null, previousHash: string | undefined) {
    this.data = data;
    this.hash = "0";
    this.previousHash = previousHash;
    this.timestamp = new Date();
    this.pow = 0;
  }
  mine(difficulty: number): void {
    const regex = new RegExp(`^(0){${difficulty}}.*`);
    while (!this.hash.match(regex)) {
      this.pow++;
      this.hash = calculateHash(this);
    }
  }
}

class Blockchain {
  genesisBlock: Block;
  chain: Array<Block>;
  difficulty: number;
  constructor(genesisBlock: Block, chain: Array<Block>, difficulty: number) {
    this.genesisBlock = genesisBlock;
    this.chain = chain;
    this.difficulty = difficulty;
  }
  static create(difficulty: number): Blockchain {
    const genesisBlock = new Block(null, undefined);
    return new Blockchain(genesisBlock, [genesisBlock], difficulty);
  }
  addBlock(from: string, to: string, amount: number): void {
    const blockData: Transaction = { from, to, amount };
    const lastBlock = this.chain[this.chain.length - 1];
    const newBlock: Block = new Block(blockData, lastBlock.hash);
    newBlock.mine(this.difficulty);
    this.chain.push(newBlock);
  }
  isValid(): boolean {
    if (this.chain.length === 1) return true;
    for (let index = 1; index < this.chain.length - 1; index++) {
      const currentBlock = this.chain[index];
      const nextBlock = this.chain[index + 1];
      if (
        currentBlock.hash !== calculateHash(currentBlock) ||
        nextBlock.previousHash !== currentBlock.hash
      )
        return false;
    }
    return true;
  }
}

(function () {
  const blockchain = Blockchain.create(5); // difficulty increases exponentially with each increase
  blockchain.addBlock("Alice", "Bob", 5);
  blockchain.addBlock("John", "Doe", 100);
  console.log(blockchain);
  console.log(blockchain.isValid());
  blockchain.chain[1].timestamp = new Date(); // tampering with the blockchain
  console.log(blockchain.isValid()); // should return false because I have tampered with the blockchain
})();
