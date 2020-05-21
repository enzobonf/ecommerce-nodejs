const categorias = require('./categorias');

module.exports = {

    get(){
    
        return new Promise((resolve, reject)=>{

            categorias.getAll().then(categorias=>{

                resolve({categorias});

                
            }).catch(err=>{
                reject(err);
            })

        });

    }

}