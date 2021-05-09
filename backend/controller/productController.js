const Product = require('../models/Product');

// GET ALL PRODUCT
const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

// GET DETAIL PRODUCT
const getDetailProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

module.exports = {
    getAllProduct,
    getDetailProduct
}