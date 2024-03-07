import { Router } from 'express';
import { ProductsManager } from '../managers/ProductsManager.js';
import { productsPath } from '../utils.js';

export const router=Router()

let productsManager = new ProductsManager(productsPath)

router.get('/home',(req,res)=>{
    let products = productsManager.getProducts()

    res.status(200).render("home", { products })
})

router.get('/realtimeproducts',(req,res)=>{

    let products = productsManager.getProducts()

    res.status(200).render("realTimeProducts", { products })
})

