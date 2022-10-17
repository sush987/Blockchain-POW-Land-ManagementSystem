const sha256 = require('sha256');
const transaction = require('./transaction');
const buyselltrans = new transaction();

function Blockchain () {
    this.chain = [];
    this.newTransaction = [];

    this.createNewBlock(0 , '0' , '0');//genesis block
}

Blockchain.prototype.createNewBlock = function (nonce , prevHash , hash){
    const newBlock = {
        index: this.chain.length + 1,
        timestamp : Date.now(),
        nonce: nonce,
        hash: hash,
        prevHash: prevHash,
    }

    this.newTransaction = [];
    this.chain.push(newBlock);

    return newBlock;
}

/*const currentBlockData = [
    {
        amount:1000,
        sender:"wfwefqwef",
        reciever: "wefwe",
        propertyId: 1 
    },
    {
        amount:1,
        sender:"wfwefqwef",
        reciever: "wefwe",
        propertyId: 1 
    },
    {
        amount:105,
        sender:"wfwefqwef",
        reciever: "wefwe",
        propertyId: 1 
    },
    {
        amount:1067,
        sender:"wfwefqwef",
        reciever: "wefwe",
        propertyId: 1 
    },
]*/



Blockchain.prototype.getLastBlock = function(){
    return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createNewTrans = function(amount , sender , reciever , transactionNum){
    

        const newTransactions = {
            amount: amount,
            sender: sender,
            reciever: reciever
        };

        this.newTransaction.push(newTransactions);

        //return [
         //   newTransactions,
        //]
       
    //return this.getLastBlock()['index'] + 1 ;
}
Blockchain.prototype.hashBlock = function(prevHash, merkelRoot , nonce){
    const dataAsString = prevHash + nonce.toString() + merkelRoot //+ Date.now() ;//block headder inputed in sha256 to find block hash
    const hash = sha256(dataAsString);

    return hash;
}

Blockchain.prototype.POW = function(prevHash){
    //if(currentBlockData.length != 0){

    let nonce = 0 ;
    prevHash = this.chain[this.chain.length-1].hash;
    let hash = this.hashBlock(prevHash, this.merkelRoot(2), nonce);

    while(hash.substring(0,4) !== '0000'){
        nonce++;
        hash = this.hashBlock(prevHash,this.merkelRoot(2),nonce);
    }

    const blockStruct = {
        hash : hash,//current block hash
        timestamp : Date.now(),//block timestamp
        MerkelRoot : this.merkelRoot(2),//merkel root 
        Nonce : nonce,
        PrevHash : prevHash
    }

    this.chain.push(blockStruct);

    return [
        "hash : " + hash,//current block hash
        "TimeStamp : " + Date.now(),//block timestamp
        "Merkel Root : " + this.merkelRoot(2),//merkel root 
        "Nonce : " + nonce,
        "Prev Hash : " + prevHash,
    ]

    }
    
    
//}

Blockchain.prototype.merkelRoot = function(_leafNodes) {
    const leafNodes = _leafNodes ;
    let nodePerItr = leafNodes;
    
        let nodeArr = [];
        let low = 0;
        let h = low+1;
        let i = 0;
        let j = 0;
        while(j < leafNodes){
            nodeArr[j] =  sha256(JSON.stringify(this.newTransaction[j]));
            j++;
        }

        while(nodePerItr >1){

            if(nodePerItr % 2 == 0){
                while(h<=nodePerItr-1){
                  nodeArr[i] =  sha256(nodeArr[low] + nodeArr[h] + Date.now());
                  low = h+1;
                  h = low + 1;
                  i++;
              }
              nodePerItr = nodePerItr/2;
          }
          else {
  
                while(h<=nodePerItr-1){
                  nodeArr[i] =  sha256(nodeArr[low] + nodeArr[h] + Date.now());
                  low = h+1;
                  h = low + 1;
                  i++;
                  if(low == nodePerItr - 1){
                      h = low ;
                      continue;
                  }
              }
              nodePerItr = (nodePerItr + 1)/2;
          }

        }

        return [
            nodeArr[0],//current block merkel root 
        ]

    }

    Blockchain.prototype.chainShow = function(index){
        
        return [
            this.chain[0].index,
            this.chain[0].timestamp, 
            this.chain[0].transactions,
            this.chain[0].nonce,
            this.chain[0].hash,
            this.chain[0].prevHash
        ];


    }   


module.exports = Blockchain;