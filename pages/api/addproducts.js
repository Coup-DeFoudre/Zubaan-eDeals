import Product from "@/models/Product";
import connectDB from "@/middleware/mongoose";

const handler = async (req, res) => {
    if (req.method === "POST") {
        const productsData = req.body; // Assuming productsData is an array of product objects

        try {
            const products = await Promise.all(
                productsData.map(async (productData) => {
                    const { title, slug, description, img, category, color, size, price, availableQty } = productData;

                    if (!title || !slug || !description || !img || !category || !size || !price || !availableQty || !color) {
                        return res.status(422).json({ error: "Please add all the fields" });
                    }

                    const product = new Product({
                        title,
                        slug,
                        description,
                        img,
                        category,
                        size,
                        price,
                        availableQty,
                        color,
                    });

                    await product.save();
                    return product;
                })
            );

            res.status(201).json({ msg: "Products added successfully", products });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        return res.status(405).json({ msg: "Method not allowed" });
    }
};

export default connectDB(handler);
