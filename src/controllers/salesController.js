import db from "./../db.js";
import salesSchema from "./../schemas/salesSchema.js";

export async function sendSale(req, res) {
    const body = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    const validation = salesSchema.validate(body, { abortEarly: false });

    if (validation.error) {
        console.log(validation.error.details.map((detail) => detail.message));
        res.sendStatus(422);
        return;
    }

    try {
        const session = await db.collection("sessions").findOne({ token });

        if (!session) {
            res.sendStatus(401);
            return;
        }

        const user = await db
            .collection("users")
            .findOne({ _id: session.userId });

        if (!user) {
            res.sendStatus(404);
            return;
        }

        body.idUser = user._id;

        await db.collection("sales").insertOne(body);
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getSales(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    
    try {
        const session = await db.collection("sessions").findOne({ token });

        if (!session) {
            res.sendStatus(401);
            return;
        }

        const user = await db
            .collection("users")
            .findOne({ _id: session.userId });

        if (!user) {
            res.sendStatus(404);
            return;
        }

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
