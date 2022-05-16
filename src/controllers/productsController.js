import db from "./../db.js";
import { ObjectId } from "mongodb";

export async function getProducts(req, res) {

    try {
        const products = await db.collection("products").find({}).toArray();

        res.status(200).send(products);
    
    } catch (err) {
        console.log(err);
        res.status(500).send("Não é possível exibir os produtos. Tente novamente.");
    }
}

export async function getProduct(req, res){
    const { productId } = req.params;

    try {
        const product = await db.collection("products").findOne({ _id: ObjectId(`${productId}`) });

        res.status(200).send(product);

    } catch(e) {
        console.log(e);
        res.status(500).send("Não foi possível exibir esse produto. Tente novamente.");
    }
}
