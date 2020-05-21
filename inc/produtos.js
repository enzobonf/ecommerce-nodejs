const db = require('./db');
const Produto = require('./models/produtos');

let produtos = [
    new Produto({
        sku: 'imac-pro',
        nome: 'iMac Pro',
        descricao: 'Caro demais',
        preco: 12400.00,
        img: 'product01.png',
        categoria: 'Notebooks'
    }),
    new Produto({
        sku: 'notebook-gamer-msi',
        nome: 'Notebook Gamer MSI',
        descricao: 'Bom demais',
        preco: 4999.90,
        img: 'product06.png',
        categoria: 'Notebooks'
    }),
    new Produto({
        sku: 'galaxy-s7-edge',
        nome: 'Samsung Galaxy S7 Edge',
        descricao: 'Velho já',
        preco: 1990.99,
        img: 'product07.png',
        categoria: 'Smartphones'
    })
]

module.exports = {

    save(produto){

        return new Promise((resolve, reject)=>{

            let novoProduto = new Produto({
                sku: produto.sku,
                nome: produto.nome,
                descricao: produto.descricao,
                preco: produto.preco,
                img: produto.img,
                categoria: produto.categoria
            })

            novoProduto.save().then(response=>{
                resolve(response);
            }).catch(err=>{
                reject(err);
            });

        });

    },

    getAll(){

        return new Promise((resolve, reject)=>{

            Produto.find().lean().exec().then(produtos=>{
                resolve(produtos);
            }).catch(err=>{
                reject(err);
            });

        })

    },

    getBySku(sku){

        return new Promise((resolve, reject)=>{

            Produto.find({sku}).lean().exec().then(produto=>{
                resolve(produto[0]);
            }).catch(err=>{
                reject(err);
            });


        })

    }

}
