const express = require('express');
const Quote = require('inspirational-quotes')
const cors = require('cors')
const port = 3001
const mongodb = require('mongodb');
const { json } = require('express/lib/response');
const uri = "mongodb+srv://vichayuth:pruk2543@cluster0.agzry.mongodb.net/mydb?retryWrites=true&w=majority"


const app = express()
app.use(cors())
app.use(express.json())



app.listen(port, () => {
    console.log(`Server started successfully at port ${port}`)
})


app.post('/users/create', async (req, res) => {
    const user = req.body;
    console.log(user)
    const client = new mongodb.MongoClient(uri);
    await client.connect();
    await client.db("mydb").collection("course").insertOne({
        id: parseInt(user.id),
        fname: user.fname,
        lname: user.lname,
        username: user.username,
        email: user.email,
        avatar: user.avatar
    });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "User with ID" + user.id + "is created",
        "user":user
    }) 

})

app.get('/course', async (req, res) => {
    const client = new mongodb.MongoClient(uri);
    await client.connect();
    const users = await client.db("mydb").collection("course").find({}).toArray()
    await client.close();
    res.status(200).send(users)
})

app.delete('/users/delete', async (req, res) => {
    const users = req.body;
    console.log(users)
    const client = new mongodb.MongoClient(uri);
    await client.connect();
    await client.db("mydb").collection("users").deleteOne({
        id: parseInt(users.id),

    });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "User with ID" + users.id + "is created",
        "user":users
    }) 

})