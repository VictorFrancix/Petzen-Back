import db from "./../db.js";

export async function test(req, res) {
    const textObject = req.body;

    try {
        // save text
        await db.collection("test").insertOne(textObject);
        
        const getTextObject = await db.collection("test").findOne({ text: textObject.text });
        
        res.status(201).send(getTextObject.text);
    } catch (e) {
        res.sendStatus(500);
        console.log("Erro", e);
    };
}

