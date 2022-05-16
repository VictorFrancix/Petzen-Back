import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import db from "./../db.js";
import { loginSchema, signUpSchema, editUserSchema } from "../schemas/userSchemas.js";


export async function login(req, res) {
    const body = req.body;
    const validate = loginSchema.validate(body, { abortEarly: false });

    if (validate.error) {
        console.log(validate.error.details.map(detail => detail.message));
        res.sendStatus(422);
        return;
    }

    try {
        const user = await db
            .collection("users")
            .findOne({ email: body.email });

        if (user && bcrypt.compareSync(body.password, user.password)) {
            const token = uuid();
            await db.collection("sessions").insertOne({
                userId: user._id,
                token,
            });
            const name = user.name;
            const response = {
                token: token,
                name: name
            }
            res.status(200).send(response);
        } else {
            res.sendStatus(401);
        }
    } catch (erro) {
        console.log(erro);
        res.sendStatus(500);
    }
};

export async function signUp(req, res) {
    const { email, password, name } = req.body;

    const validate = signUpSchema.validate({ email, password, name }, { abortEarly: false });

    if (validate.error) {
        console.log(validate.error.details.map(detail => detail.message));
        res.sendStatus(422);
        return;
    }

    try {
        const user = await db.collection("users").findOne({ email });
        if (user) {
            res.sendStatus(409);
            return;
        }
        const hash = bcrypt.hashSync(password, 10);
        await db.collection("users").insertOne({
            name,
            email,
            password: hash,
        });
        res.sendStatus(201);
        console.log(db.collection("users").findOne({ email }));
    } catch (error) {
        res.sendStatus(500);
    }

};

export async function getUser(req, res) {
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

        delete user.password;
        delete user._id;

        res.status(200).send(user);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

export async function editUser(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    const body = req.body;

    const validate = editUserSchema.validate(body, { abortEarly: false });

    if (validate.error) {
        console.log(validate.error.details.map(detail => detail.message));
        res.sendStatus(422);
        return;
    }

    const newUser = {
        email: body.change.email ? body.new.email : body.email,
        name: body.change.name ? body.new.name : body.name,
        password: body.change.password ? body.new.password : body.password
    };

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

        if (user && bcrypt.compareSync(body.password, user.password)) {
            user.name = newUser.name;
            user.email = newUser.email;
            user.password = bcrypt.hashSync(newUser.password, 10);
            await db.collection('users').updateOne({ _id: user._id }, { $set: user });
            res.sendStatus(201);
        } else {
            res.sendStatus(401);
        }

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function logout(req, res) {
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

        await db.collection("sessions").deleteOne({ token });
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};