import db from "./../db.js";

export async function getProducts(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) {
            res.sendStatus(401);
            return;
        }

        const products = await db.collection("products").find({}).toArray();

        res.status(200).send(products);
    
    } catch (err) {
        console.log(err);
        res.status(500).send("Não é possível exibir os produtos. Tente novamente.");
    }
}
