import Product from "@/models/Product";
import connectDB from "@/middleware/mongoose"

const handler = async (req, res) => {
    if(req.method == 'POST'){
        for(let i = 0;i< req.body.length;i++){
            let p = await Product.findByIdAndUpdate(req.body[i]._id,req.body[i])
        }
        res.status(200).json({msg: "Products updated successfully"})
    }else{
        return res.status(405).json({ msg: "Method not allowed" })
    }
    }


export default connectDB(handler)