import AppDataSource from "../config";

import Product from "../entities/product";

const fetchProductDetails = async (req:any, res:any) => {
    console.log('fetch reached')
    // if(req.user_id !== req.body.user_id)
    try {
        const productRepo = AppDataSource.getRepository(Product);

        const products = await productRepo.find();

        if (products.length === 0) {
            return res.status(204).json({ message: 'No products found' });
        }

        return res.status(200).json({data: products});
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const productbycategory = async (req:any, res:any) => {
    const productRepo = AppDataSource.getRepository(Product);
    try {
        const products = await productRepo.find({
            where: { category: req.params.category }
        });
        res.status(200).json({data: products});
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const controller = {
    fetchProductDetails,
    productbycategory,
}

export default controller;