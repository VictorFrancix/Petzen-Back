import db from './../db.js';
import salesSchema from './../schemas/salesSchema.js';

export async function sendSale(req, res) {
    const body = req.body;

    const validation = salesSchema.validate(body, {abortEarly: false});
    
    if(validation.error){
        console.log(validation.error.details.map(detail => detail.message));
        res.sendStatus(422);
        return;
    }

    if(Date.now() - body.time < 600000){
        body.status = 'aceito';
    } else if(Date.now() - body.time < 3,6e+6){
        body.status = 'a caminho';
    } else {
        body.status = 'entregue';
    }

    try{
        await db.collection('sales').insertOne(body);
        res.sendStatus(201);

    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getSales(req, res) {

}