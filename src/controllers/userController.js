import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import db from "./../db.js";
import { loginSchema } from "../schemas/userSchemas.js";

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
  
              res.status(200).send(token);
          } else {
              res.sendStatus(401);
          }
      } catch (erro) {
          console.log(erro);
          res.sendStatus(500);
      }
  };
  
