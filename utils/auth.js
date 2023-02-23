import bcrypt from 'bcrypt';



export const hashPassword=(password)=>{

    return new Promise((relolve,reject)=>{
        bcrypt.genSalt(12,(error,salt)=>{
            if(err){
                reject(err)
            }
            bcrypt.hash(password,salt,(err,hash)=>{
                 if(err){
                     reject(err);
                 }
                 relolve(hash)
            });
        });
    });



}


export const comparePassword=(password,hashPassword)=>{

}