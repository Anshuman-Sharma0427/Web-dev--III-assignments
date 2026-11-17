const { validateProduct } = require("../middleware/errorMiddleware")
const express = require("express")
const router = express.Router()

const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    updateStock,
    deleteProduct,
    lowStockReport,
    categorySummary
} = require("../controllers/productController")

// Create Product
router.post("/", validateProduct, createProduct)

// Get All Products
router.get("/", getAllProducts)

// Low Stock Report
router.get("/low-stock", lowStockReport)

// Category-wise Summary
router.get("/summary", categorySummary)

// Stock Adjustment
router.patch("/:id/stock", updateStock)

// Update Product
router.put("/:id", validateProduct, updateProduct)

// Delete Product
router.delete("/:id", deleteProduct)

// Get Single Product
router.get("/:id", getProductById)

module.exports = router
