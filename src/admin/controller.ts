import AppDataSource from "../config";
import Product from "../entities/product";

const addproduct = async (req:any, res:any) => {
    try {
        const productRepo = AppDataSource.getRepository(Product);

        let newProduct = { ...req.body };
        newProduct.status = (parseInt(newProduct.stock) > 0) ? "Available" : "Out of Stock";
        const savedProduct = await productRepo.save(newProduct);
        return res.status(201).json(savedProduct);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to save product" });
    }
};

const deleteProduct = async (req:any, res:any) => {
    const productRepo = AppDataSource.getRepository(Product);
    try {
        const product = await productRepo.findOne({
            where: { product_id: req.params.product_id }
        })
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await productRepo.remove(product);

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const controller = {
    addproduct,
    deleteProduct,
}

export default controller;