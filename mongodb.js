//CRUD operation 

const mongodb = require('mongodb');
const mongodbClient = mongodb.MongoClient;

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

mongodbClient.connect(connectionUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if(error) {
        return console.log("Unable to connect database", error);
    }
    console.log("Connected Successfully...");

    const db = client.db(databaseName);

    // db.collection("users").insertOne({
    //     name: "Anil",
    //     age: 24
    // }, (error, result) => {
    //     if(error) {
    //         return console.log(error);
    //     }
    //     console.log(result.ops);
    // });

    // db.collection('tasks').insertMany([
    //     {
    //         description: "Clean the house",
    //         completed: true
    //     },
    //     {
    //         description: "Renew inspection",
    //         completed: false
    //     },
    //     {
    //         description: "Pot the plants",
    //         completed: false
    //     }
    // ], (err, res) => {
    //     if(err) 
    //         return console.log(err);
        
    //         console.log(res.ops);
    // });


    // //db.collection('tasks').find({completed: false}).toArray((err, res) => console.log(res));

    // const updatePromise = db.collection('users').updateOne({
    //     _id: new mongodb.ObjectID('60bf153249a932f6e9d142a5')
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // });

    // updatePromise.then((res) => {
    //     console.log(res);
    // }).catch((err) => {
    //     console.log(err);
    // });

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((res) => {
    //     console.log(res);
    // }).catch((err) => {
    //     console.log(err);
    // });

    db.collection('users').deleteMany({
        age: 24
    })
    .then(res =>console.log(res))
    .catch(err => console.log(err));

});