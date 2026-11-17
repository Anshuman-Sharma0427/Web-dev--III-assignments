
const Product = require("../models/Product")

// Create Product
const createProduct = async (req, res, next) => {
    try {
        let { name, sku, category, price, quantity, reorderLevel, supplier } = req.body

        let product = await Product.create({
            name, sku, category, price, quantity, reorderLevel, supplier
        })

        res.status(201).json({
            message: "Product Created Successfully",
            data: product
        })
    } catch (err) {
        next(err)
    }
}

// Get All Products
const getAllProducts = async (req, res, next) => {
    try {
        let { category, sort, page, limit } = req.query

        let filter = {}

        if (category) {
            filter.category = category
        }

        let products = await Product.find(filter)
            .sort(sort ? sort : "name")
            .skip((Number(page || 1) - 1) * Number(limit || 10))
            .limit(Number(limit || 10))

        res.status(200).json({
            message: "Products Fetched Successfully",
            data: products
        })
    } catch (err) {
        next(err)
    }
}

// Get Single Product
const getProductById = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).send("Product Not Found")
        }

        res.status(200).json({
            data: product
        })
    } catch (err) {
        next(err)
    }
}

// Update Product Details
const updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )

        if (!product) {
            return res.status(404).send("Product Not Found")
        }

        res.status(200).json({
            message: "Product Updated Successfully",
            data: product
        })
    } catch (err) {
        next(err)
    }
}

// Stock Adjustment
const updateStock = async (req, res, next) => {
    try {
        let { operation, quantity } = req.body

        let product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).send("Product Not Found")
        }

        if (operation === "restock") {
            product.quantity += Number(quantity)
        }
        else if (operation === "sale") {
            if (product.quantity < Number(quantity)) {
                return res.status(400).send("Insufficient Stock")
            }
            product.quantity -= Number(quantity)
        }
        else {
            return res.status(400).send("Invalid Operation")
        }

        await product.save()

        res.status(200).json({
            message: "Stock Updated Successfully",
            data: product
        })
    } catch (err) {
        next(err)
    }
}

// Delete Product
const deleteProduct = async (req, res, next) => {
    try {
        let product = await Product.findByIdAndDelete(req.params.id)

        if (!product) {
            return res.status(404).send("Product Not Found")
        }

        res.status(200).send("Product Deleted Successfully")
    } catch (err) {
        next(err)
    }
}

// Low Stock Report
const lowStockReport = async (req, res, next) => {
    try {
        let products = await Product.aggregate([
            {
                $project: {
                    name: 1,
                    sku: 1,
                    category: 1,
                    quantity: 1,
                    reorderLevel: 1,
                    lowStock: {
                        $lte: ["$quantity", "$reorderLevel"]
                    }
                }
            },
            {
                $match: {
                    lowStock: true
                }
            }
        ])

        res.status(200).json({
            message: "Low Stock Products",
            data: products
        })
    } catch (err) {
        next(err)
    }
}

// Category-wise Inventory Summary
const categorySummary = async (req, res, next) => {
    try {
        let summary = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalProducts: {
                        $sum: 1
                    },
                    totalQuantity: {
                        $sum: "$quantity"
                    },
                    totalValue: {
                        $sum: {
                            $multiply: ["$price", "$quantity"]
                        }
                    }
                }
            }
        ])

        res.status(200).json({
            message: "Category-wise Inventory Summary",
            data: summary
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    updateStock,
    deleteProduct,
    lowStockReport,
    categorySummary
}
