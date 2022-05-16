export function validateSchema(req, res, next, schema){
    const body = req.body;

    const validation = schema.validate(body, { abortEarly: false });

    if (validation.error) {
        console.log(validation.error.details.map((detail) => detail.message));
        res.sendStatus(422);
        return;
    }

    next();
}