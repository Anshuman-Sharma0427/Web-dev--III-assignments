
const validateProduct = (req, res, next) => {
    let { name, sku, category, price, quantity, reorderLevel, supplier } = req.body

    if (!name || !sku || !category || price === undefined || quantity === undefined || reorderLevel === undefined || !supplier) {
        return res.status(400).send("Please provide all product details")
    }

    if (Number(price) < 0 || Number(quantity) < 0 || Number(reorderLevel) < 0) {
        return res.status(400).send("Price and stock values cannot be negative")
    }

    next()
}

const errorMiddleware = (err, req, res, next) => {
    console.log(err)

    res.status(500).json({
        message: "Internal Server Error"
    })
}

module.exports = { validateProduct, errorMiddleware }
