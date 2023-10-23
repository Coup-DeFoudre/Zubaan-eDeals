import connectDB from "@/middleware/mongoose";
import Product from "@/models/Product";

const handler = async (req, res) => {
  try {
    let products = await Product.find({});
    let tshirts = {};

    for (let item of products) {
      if (item.title in tshirts) {
        if (item.availableQty > 0) {
          if (!tshirts[item.title].color.some((color) => color.name === item.color)) {
            tshirts[item.title].color.push({ name: item.color });
          }
          if (!tshirts[item.title].size.some((size) => size.name === item.size)) {
            tshirts[item.title].size.push({ name: item.size });
          }
        }
      } else {
        tshirts[item.title] = JSON.parse(JSON.stringify(item));
        if (item.availableQty > 0) {
          tshirts[item.title].color = [ item.color ];
          tshirts[item.title].size = [  item.size ];
        } else {
          tshirts[item.title].color = [];
          tshirts[item.title].size = [];
        }
      }
    }

    res.status(200).json(tshirts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

export default connectDB(handler);
