import db from "./../db.js";
import salesSchema from "./../schemas/salesSchema.js";

export async function sendSale(req, res) {
    const body = req.body;

    const validation = salesSchema.validate(body, { abortEarly: false });

    if (validation.error) {
        console.log(validation.error.details.map((detail) => detail.message));
        res.sendStatus(422);
        return;
    }

    try {
        const {user} = res.locals;

        body.idUser = user._id;

        await db.collection("sales").insertOne(body);
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getSales(req, res) {
    try {
        const {user} = res.locals;
        const sales = await db
            .collection("sales")
            .find({ idUser: user._id })
            .toArray();

        sales.forEach((sale) => {
            if (Date.now() - sale.time < 600000) {
                sale.status = "Aceito";
            } else if (Date.now() - sale.time < 3600000) {
                sale.status = "A caminho";
            } else {
                sale.status = "Entregue";
            }
            
            delete sale.idUser;
        });

        res.status(200).send(sales);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
