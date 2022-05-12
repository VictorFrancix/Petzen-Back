import db from './../db.js';
import salesSchema from './../schemas/salesSchema.js';

export async function sendSale(req, res) {
    const body = req.body;

    // TODO: autenticação e adicionar idUser

    const validation = salesSchema.validate(body, {abortEarly: false});
    
    if(validation.error){
        console.log(validation.error.details.map(detail => detail.message));
        res.sendStatus(422);
        return;
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
    const {idUser} = req.params

    // TODO: autenticação 

    try{
        const sales = await db.collection('sales').find({idUser}).toArray();

        sales.forEach(sale => {
            if(Date.now() - sale.time < 600000){
                sale.status = 'aceito';
            } else if(Date.now() - sale.time < 3,6e+6){
                sale.status = 'a caminho';
            } else {
                sale.status = 'entregue';
            }
        });

        res.status(200).send(sales);

    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}