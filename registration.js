function Registration() {

    this.userId =[];
    this.propertyId = [1,2,3,4,5,6,7,8,9,10];
}


Registration.prototype.addUser = function(_id, _property) {
    for(let i = 0 ; i < this.propertyId.length - 1 ; i++){
        if(_property == this.propertyId[i]){
            const newUser = {
                id : _id ,
                property: _property
            }
        
            this.userId.push(newUser.id);
            this.propertyId.push(newUser.property);

            return "Success You are registered";
        }
        else{
            if(i == this.propertyId.length - 2){
                 return "Property does not exist i the system" ;
            }
            else 
            continue;
        }
        
       
    }

    
    //return this.users[0];
}

//console.log(registration.addUser(1, 10));

module.exports = Registration ;