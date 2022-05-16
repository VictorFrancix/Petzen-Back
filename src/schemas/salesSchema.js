import joi from 'joi';

const salesSchema = joi.object({
    products: joi.array().items(joi.object({
        product: joi.string().required(),
        quantity: joi.number().integer().min(1).required(),
    }).required()).required(),
    paymentMethod: joi.string().valid('money', 'credit', 'debit').required(),
    total: joi.number().min(0).required(),
    time: joi.number().required(),
    address: joi.object({
        CEP: joi.string().length(9).required(),
        city: joi.string().required(),
        UF: joi.string().length(2).required(),
        street: joi.string().required(),
        district: joi.string().required(),
        number: joi.string().required()
    })
});

export default salesSchema;