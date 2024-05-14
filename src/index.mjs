import express from "express";

// start the express the app
const app = express();

const testUsers = [
    {
        id: 1,
        name: 'John',
        age: 25,
        email:'john@gmail.com',
    },
    {
        id: 2,
        name: 'Karim',
        age: 20,
        email:'karim@gmail.com',
    },
    {
        id: 3,
        name: 'Asana',
        age: 30,
        email:'asana@gmail.com',
    },
    {
        id: 4,
        name: 'Esther',
        age: 25,
        email:'esther@gmail.com',
    },
    {
        id: 5,
        name: 'sahabia',
        age: 20,
        email:'sahabia@gmail.com',
    },
    {
        id: 6,
        name: 'Luyana',
        age: 30,
        email:'luyana@gmail.com',
    },
];

const testProducts = [
    {
        id: 1,
        name: 'rice cooker',
        price: 25,
        brand:'Binatone',
    },
    {
        id: 2,
        name: 'baker',
        price: 25,
        brand:'Nasco',
    },
    {
        "id": 3,
        name: 'stove',
        price: 25,
        brand:'Akai',
    },
];

// Get a port
let PORT = process.env.PORT || 3000;

// create routes with the GET request
app.get("/", (req, res) =>{
    // send a respose
    res.send("Hello World!");
});

app.get("/api/users", (req, res) =>{
    console.log(req.query);

    // destructure query
    const {query: { filter, value}} = req;

    if (filter && value) {
        res.send(
            testUsers.filter((user)=> user[filter].includes(value))
        )
    }

    // send a respose of user
    return res.send(testUsers);
})

app.get("/api/products", (req, res) =>{
    // send a respose of user
    res.status(201).send(testProducts);
})

// setting route params
app.get("/api/users/:id", (req, res) =>{
    // console.log(req.params);

    // convert ids to actual numbers
    const parsedId = parseInt(req.params.id);

    if (isNaN(parsedId)){
        return res.status(400).send({
            msg: "Bad request. Invalid ID"
    })
    }

    const findUser = testUsers.find((user) => user.id === parsedId);

    if (!findUser) {
        return res.status(404).sendStatus(404);
    }

    return res.send(findUser);  
})

// start the server
app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
});
