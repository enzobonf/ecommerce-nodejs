const mongoose = require('mongoose');
const db = require('./db');
const Categoria = require('./models/categorias');

/* let categorias = [
    new Categoria({
        nome: 'Notebooks',
        sku: 'notebooks',
        img: 'categorias/cat-1.jpg',
    }),
    new Categoria({
        nome: 'Smartphones',
        sku: 'smartphones',
        img: 'categorias/cat-2.jpg',
    }),
    new Categoria({
        nome: 'Câmeras',
        sku: 'cameras',
        img: 'categorias/cat-3.jpg',
    }),
    new Categoria({
        nome: 'Acessórios',
        sku: 'acessorios',
        img: 'categorias/cat-4.jpg',
    }),
    new Categoria({
        nome: 'Áudio',
        sku: 'audio',
        img: 'categorias/cat-5.jpg',
    }),
] */

module.exports = {

    save(categoria){

        return new Promise((resolve, reject)=>{

            let novaCategoria = new Categoria({
                nome: categoria.nome,
                sku: categoria.sku,
                img: categoria.img
            })

            novaCategoria.save().then(response=>{
                resolve(response);
            }).catch(err=>{
                reject(err);
            });

        });

    },

    getAll(){

        return new Promise((resolve, reject)=>{

            Categoria.find().lean().exec().then(categorias=>{
                resolve(categorias);
            }).catch(err=>{
                reject(err);
            });

        })

    },

}
