import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import db from "./../db.js";
import { loginSchema, signUpSchema } from "../schemas/userSchemas.js";

function validateToken(token){
  try {
    const session = await db.collection("sessions").findOne({ token });
    console.log;

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

} catch (e) {
    console.log(e);
    res.sendStatus(500);
}
}


export async function login (req, res) {
    const body = req.body;
    const validate = loginSchema.validate(body, {abortEarly: false});

    if(validate.error){
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
  
              res.status(200).send(token, user.name);
          } else {
              res.sendStatus(401);
          }
      } catch (erro) {
          console.log(erro);
          res.sendStatus(500);
      }
  };
  
  export async function signUp (req, res)  {
    const {email, password, name} = req.body;

    const validate = signUpSchema.validate({email, password, name}, {abortEarly: false});
    
    if(validate.error){ 
        console.log(validate.error.details.map(detail => detail.message));
        res.sendStatus(422);
        return;
    }

    try {
      const user = await db.collection("users").findOne({email});
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
      console.log(db.collection("users").findOne({email}));
    } catch (error) {
      res.sendStatus(500);
    }
    
  };

  export async function logout(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    validateToken(token);

    try{
        await db.collection("sessions").deleteOne({token});
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
  };