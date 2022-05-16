import joi from 'joi';

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});

export const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
});

export const editUserSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    change: joi.object({
        name: joi.boolean().required(),
        email: joi.boolean().required(),
        password: joi.boolean().required()
    }).required(),
    new: joi.object()
})