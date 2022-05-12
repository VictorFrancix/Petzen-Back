import joi from 'joi';

const salesSchema = joi.object({
    products: joi.array().items(joi.object({
        idProduct: joi.string().required(),
        quantity: joi.number().integer().min(1).required(),
    }).required()).required(),
    paymentMethod: joi.string().valid('money', 'credit', 'debit').required(),
    total: joi.number().min(0).required(),
    time: joi.number().required(),
});

export default salesSchema;