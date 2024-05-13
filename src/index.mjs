import express from "express";

// start the express the app
const app = express();

// Get a port
let PORT = process.env.PORT || 3000;

// create routes with the GET request
app.get("/", (req, res) =>{
    // send a respose
    res.send("Hello World!");
});

app.get("/api/users", (req, res) =>{
    // send a respose of user
    res.status(201).send([
        {
            name: 'John',
            age: 25,
            email:'john@gmail.com',
        },
        {
            name: 'Karim',
            age: 20,
            email:'karim@gmail.com',
        },
        {
            name: 'Asana',
            age: 30,
            email:'asana@gmail.com',
        },
    ])
})

app.get("/api/products", (req, res) =>{
    // send a respose of user
    res.status(201).send([
        {
            name: 'rice cooker',
            price: 25,
            brand:'Binatone',
        },
        {
            name: 'baker',
            price: 25,
            brand:'Nasco',
        },
        {
            name: 'stove',
            price: 25,
            brand:'Akai',
        },
    ])
})

// 

// start the server
app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
});
