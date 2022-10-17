function buySell () {
    this.availableProp = [1,2,3,4,5,6,7,8,9,10] ;
    this.usersRegistered = [];
}

const userData = new Map() ;


buySell.prototype.buy = function(userId , propertyId){
    for(let i = 0 ; i<this.availableProp.length - 1 ; i++){
        if(propertyId == this.availableProp[i]){
            if(userData.get(propertyId) == undefined){
                userData.set(propertyId , userId)
                return "Success!!!" ;
            }
            else {
                return 'Property is already owned by someone' ;
            }
        }
        else {
            if(i == this.availableProp.length - 2)
            return "Property does not exist";
            else 
            continue;
        }
    }
       
    
}

buySell.prototype.sell = function(userId , propertyId){

        if(userData.get(userId) != undefined){
            userData.set(propertyId , undefined);
            return "success" ;
        
        }
        else {
            return 'This is not your property' ;
        }
}

module.exports = buySell ;
