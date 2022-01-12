import Transaction, { calculateHash } from "./utils";
import Block from "./Block";

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
    for (let index = 1; index < this.chain.length; index++) {
      const currentBlock = this.chain[index];
      const previousBlock = this.chain[index - 1];
      if (
        currentBlock.hash !== calculateHash(currentBlock) ||
        previousBlock.hash !== currentBlock.previousHash
      )
        return false;
    }
    return true;
  }
}

export default Blockchain;
