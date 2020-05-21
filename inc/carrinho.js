let conn = require('./db');
let path = require('path');

module.exports ={
    
    addProduto(req, id, qnt){

        return new Promise((resolve, reject)=>{

            req.session.user.carrinho.push({produto:{id, qnt}});
            resolve(req.session.user.carrinho);

        });

    }


}