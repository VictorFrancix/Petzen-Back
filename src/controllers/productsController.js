import db from "./../db.js";

export async function getProducts(req, res) {

    try {
        const products = await db.collection("products").find({}).toArray();

        res.status(200).send(products);
    
    } catch (err) {
        console.log(err);
        res.status(500).send("Não é possível exibir os produtos. Tente novamente.");
    }
}
