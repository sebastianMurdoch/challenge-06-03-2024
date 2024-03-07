import { Router } from 'express';
import { ProductsManager } from '../managers/ProductsManager.js';
import { CartsManager } from '../managers/CartsManager.js';
import __dirname, { cartsPath, productsPath} from "../utils.js"
export const router = Router()

let productsManager = new ProductsManager(productsPath)
let cartsManager = new CartsManager(cartsPath)

router.post("/", (req, res) => {
    let newCart = cartsManager.createCart()

    res.status(201).json({ newCart })
})

router.get("/:id", (req, res) => {
    let id = Number(req.params.id)
    if (isNaN(id)) {
        return res.status(400).json({ error: "id debe ser numérico" })
    }

    let cart = cartsManager.getCartById(id)
    if (!cart) {
        return res.status(400).json({ error: `No el recurso con id ${id}` })
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ cart });

})

router.post("/:cid/product/:pid", (req, res) => {

    let { cid, pid } = req.params

    let cart = cartsManager.getCartById(cid)
    if (!cart) {
        return res.status(400).json({ error: `No el recurso con id ${cid}` })
    }

    let product = productsManager.getProductById(pid)
    if (!product) {
        return res.status(400).json({ error: `No el recurso con id ${pid}` })
    }

    if (!Array.isArray(cart.products)) {
        return res.status(500).json({ error: `Error no esperado` })
    }

    let productIndex = cart.products.findIndex(u => u.product == pid)
    // si no existe el producto se agrega sino se incrementa la cantidad
    if (productIndex === -1) {
        cart.products.push({
            product: product.id,
            quantity: 1
        })
    } else {
        cart.products[productIndex].quantity++
    }

    // update entire array
    let carts = cartsManager.getCartsFromFile()
    let cartIndex = carts.findIndex(u => u.id == cid)
    carts[cartIndex] = cart

    cartsManager.saveCartsToFile(carts)

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ cart: cart });

})




