const Blockchain = require('./blockchain');
const Registration = require('./registration');
const Transaction = require('./transaction');
const buySellFunction = new Transaction();
const bitcoin = new Blockchain();
const userReg = new Registration();
const SHA256 = require('sha256');
const express = require('express');
const buySell = require('./transaction');
const prompt = require('prompt-sync')();
const _prevHash = bitcoin.chain[0].prevHash;
var app = express();
/*const currentBlockData = [
    {
        amount:10,
        sender:"wfwefqwef",
        reciever: "wefwe",
    },
    {
        amount:1,
        sender:"wfwefqwef",
        reciever: "wefwe",
    },
    {
        amount:105,
        sender:"wfwefqwef",
        reciever: "wefwe",
    },
    {
        amount:1067,
        sender:"wfwefqwef",
        reciever: "wefwe",
    },
]*/
/*const merkelRoot = function(_leafNodes) {
    const leafNodes = _leafNodes ;
    let nodePerItr = leafNodes;
    
        this.nodeArr = [];
        let low = 0;
        let h = low+1;
        let i = 0;
        let j = 0;
        while(j < leafNodes){
            nodeArr[j] =  SHA256(JSON.stringify(currentBlockData[j]));
            j++;
        }

        while(nodePerIte >1){

            if(nodePerItr % 2 == 0){
                while(h<=nodePerItr-1){
                  nodeArr[i] =  SHA256(nodeArr[low] + nodeArr[h]);
                  low = h+1;
                  h = low + 1;
                  i++;
              }
              nodePerItr = nodePerItr/2;
          }
          else {
  
                while(h<=nodePerItr-1){
                  nodeArr[i] =  SHA256(nodeArr[low] + nodeArr[h]);
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

        

        /*while(leafNode != 0){
            let low = 0;
            let h = low+1;
            let i = 0;

            if(nodePerItr % 4 == 0){
                while(h<=nodePerItr-1){
                nodeArr[i] =  SHA256(nodeArr[low] + nodeArr[h]);
                low = h+1;
                h = low + 1;
                i++;
                }
                nodePerItr = nodePerItr/2;
            }
            else if(nodePerItr % 2 == 0 && nodePerNode % 4 != 0){
                while(h<=nodePerItr-1){
                nodeArr[i] =  SHA256(nodeArr[low] + nodeArr[h]);
                low = h+1;
                h = low + 1;
                i++;
                }
                nodePerItr = nodePerItr/2 ;
            }
            else if(nodePerItr % 2 != 0){

                while(h<=nodePerItr-1){
                    nodeArr[i] =  SHA256(nodeArr[low] + nodeArr[h]);
                    low = h+1;
                    h = low + 1;
                    i++;
                    if(low == nodePerItr - 1){
                        h = low ;
                    }
                }
                
            }
        }
    }
    else {
        leafNodes = //number of TX 
    }*/
    
//}
console.log(bitcoin.chain[0]);
var _transactionNum = 0;
var n = 1;
var m = 1;
var TXLength = bitcoin.newTransaction.length ;
_transactionNum = _transactionNum + TXLength ;
function options() {

    
    var temp = prompt(
        "Select any one of the following : \n" +
        "Click 0 : Add transactions \n" +
        "Click 1 : See transactions added \n" +
        "Click 2 : Start mining block \n" +
        "Click 3 : Register New user\n" +
        "Click 4 : Buy Property\n" +
        "Click 5 : Sell Property\n" + 
        "Click 6 : Exit\n"
    )

    return temp ;
}



var whatNext = options();


while(whatNext !=6 ){


if(whatNext == 1){
    var transID = prompt("Property ID : ");
    for(let i = 0 ; i < bitcoin.newTransaction.length ; i++){
        if(transID == bitcoin.newTransaction[i].amount){
            console.log(bitcoin.newTransaction[i]);
            break;
        }
    }
    whatNext = options();
}
else if(whatNext == 2){

    if(_transactionNum > 0 && TXLength == 0){
        if(_transactionNum > 0){
            console.log(bitcoin.POW(_prevHash));
            if(_transactionNum != 1){
                _transactionNum = _transactionNum - 2 ;
            }
            
            else
            break;
        }
        else {
            break;
        }
    } //only check  0
    else if (_transactionNum == 0 && TXLength > 0){
    
        if(n > 0){
            TXLength = bitcoin.newTransaction.length ;
            n--;
        }
        else {
            TXLength = 0;
        }
         
        _transactionNum = _transactionNum + TXLength ;
    
    
    
        if(_transactionNum > 0){
            console.log("sdojfnawjo");
            console.log(bitcoin.POW(_prevHash));
            if(_transactionNum != 1){
                _transactionNum = _transactionNum - 2 ;
            }
            
            else
            break;
        }
        else {
            break;
        }
    
    
    }
    else if (_transactionNum > 0 && TXLength > 0){
    
        if(n > 0){
            TXLength = bitcoin.newTransaction.length ;
            n--;
        }
    
        if(m > 0){
            _transactionNum = _transactionNum + TXLength ;
            m--;
        }
    
        if(_transactionNum > 0){
            console.log(bitcoin.POW(_prevHash));
            if(_transactionNum != 1){
                _transactionNum = _transactionNum - 2 ;
            }
            
            else
            break;
        }
        else {
            break;
        }
    }
    //console.log("\nWork in progress !!!!")

   /* if(n > 0){
        TXLength = bitcoin.newTransaction.length ;
        n--;
    }
    else {
        TXLength = 0;
    }
     
    _transactionNum = _transactionNum + TXLength ;



    if(_transactionNum > 0){
        console.log(bitcoin.POW(_prevHash));
        if(_transactionNum != 1){
            _transactionNum = _transactionNum - 2 ;
        }
        
        else
        break;
    }
    else {
        break;
    }*/
    

}
else if(whatNext == 3){
    prompt("Click Enter to register yourself ");
    var _userId =  prompt("User Id : ") ;
    var _propertyId = prompt("Property Id :");

    console.log(userReg.addUser(_userId,_propertyId));

    whatNext = options();
}
else if(whatNext == 4){

    var buyer  = prompt('Buyer Id : ');
    var propertyToBuys = prompt('Property Id : ');

    console.log(buySellFunction.buy(buyer , propertyToBuys));
    bitcoin.createNewTrans(buyer , propertyToBuys , 0 );

    whatNext = options();
    
}
else if(whatNext == 0){
    
    
    _transactionNum = prompt("Number of transactions : ");
    
    for(let i = 0 ; i< _transactionNum ; i++){

        var _seller = prompt("Seller ID : ");
        var _buyer =   prompt("Buyer ID : ");
        var _amount =   prompt("Property ID : ");
        if(i<_transactionNum-1)
            var next = prompt("Click enter for new transaction ->>");

    bitcoin.createNewTrans(
        _amount , _seller , _buyer , _transactionNum
    ) 

    
    }

    whatNext = options();
}
else {
    var seller  = prompt('Seller Id : ');
    console.log(buySellFunction.sell(seller));
    whatNext = options();
}

}
//console.log(bitcoin.chainShow(0));
//console.log(bitcoin.merkelRoot(4)); 