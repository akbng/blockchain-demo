import Blockchain from "./Blockchain";

(function () {
  const blockchain = Blockchain.create(3); // difficulty increases exponentially with each increase
  blockchain.addBlock("Alice", "Bob", 5);
  blockchain.addBlock("John", "Doe", 100);
  console.log(blockchain);
  console.log(blockchain.isValid());
  blockchain.chain[1].timestamp = new Date(); // tampering with the blockchain
  console.log(blockchain.isValid()); // should return false because I have tampered with the blockchain
})();
