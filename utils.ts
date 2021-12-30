const { createHash } = require("crypto");
import Block from "./Block";

interface Transaction {
  from: string;
  to: string;
  amount: number;
}

export const calculateHash = (block: Block): string => {
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

export default Transaction;
