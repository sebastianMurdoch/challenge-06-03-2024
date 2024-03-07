import { Router } from 'express';
import { ProductsManager } from '../managers/ProductsManager.js';
import __dirname, { cartsPath, productsPath} from "../utils.js"
export const router = Router()

let productsManager = new ProductsManager(productsPath)

router.get("/", (req, res) => {
    let limit = parseInt(req.query.limit);
    if (isNaN(limit)) {
        limit = 0;
    }

    let products = productsManager.getProducts(limit)

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
        status: "success",
        payload: products
    });

})

router.get("/:id", (req, res) => {

    let id = Number(req.params.id)
    if (isNaN(id)) {
        return res.status(400).json({ error: "id debe ser numérico" })
    }

    let product = productsManager.getProductById(id)

    if (!product) {
        return res.status(400).json({ error: `No existe un recurso con id ${id}` })
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
        status: "success",
        payload: product
    });

})

router.post("/", (req, res) => {
    if (req.body.id) {
        return res.status(400).json({
            error: "id is not accepted in the request"
        })
    }

    if (!req.body.title || !req.body.description || !req.body.code || !req.body.price || !req.body.status || !req.body.stock || !req.body.category) {
        return res.status(400).json({
            error: "required fields are missing"
        })
    }

    let newProduct = productsManager.createProduct(req.body)

    res.status(201).json({
        status: "success",
        payload: newProduct
    })
})


router.put("/:id", (req, res) => {

    let id = Number(req.params.id)
    if (isNaN(id)) {
        return res.status(400).json({ error: "id debe ser numérico" })
    }

    let updatedProduct = productsManager.updateProduct(id)

    if (!updatedProduct) {
        return res.status(400).json({ error: `No existe el recurso con id ${id}` })
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
        status: "success",
        payload: updatedProduct
    });

})


router.delete("/:id", (req, res) => {

    let id = Number(req.params.id)
    if (isNaN(id)) {
        return res.status(400).json({ error: "id debe ser numérico" })
    }

    let deletedProduct = productsManager.deleteProduct(id)

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
        status: "success",
        payload: deletedProduct
    });

})




