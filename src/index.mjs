import express from "express";
import { query, validationResult, body, matchedData, checkSchema } from "express-validator";
import { createUserValidationSchema } from "./utils/validationSchema.mjs";

// start the express the app
const app = express();
app.use(express.json());

// middleware
const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
}

const resolveIndexByUserId = (req, res, next) =>{
    const {params:{id}} = req;

    const parsedId = parseInt(id);

    if (isNaN(parsedId)){
        return res.statusCode(400);
    }

    const findUserIndex = testUsers.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1){
        return res.status(404);
    }

    req.findUserIndex = findUserIndex;

    next();
}


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

app.get("/api/users", query("filter").isString().notEmpty().isLength({ min: 3, max: 10 }).withMessage("must be atleast 3 to 10 characters"), (req, res) =>{
    // console.log(req);
    const result = validationResult(req);
    console.log(result)

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
app.get("/api/users/:id", resolveIndexByUserId, (req, res) =>{
    const { findUserIndex } = req;
    const findUser = testUsers[findUserIndex];

    if (!findUser) {
        return res.sendStatus(404);
    }

    return res.send(findUser);  
})

// start the server
app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
});

// poating a request to the server
app.post("/api/users", 
checkSchema(createUserValidationSchema),
// [body("name")
// .notEmpty()
// .withMessage("name must not be empty")
// .isLength({min: 5, max: 32})
// .withMessage("username must be at least 5 to 32 characters"),
// body("age")
// .isNumeric()
// .withMessage("must be a number")
// .notEmpty()
// .withMessage("must not be empty")], 
(req, res) =>{
    const result = validationResult(req);
    console.log(result);

    if (!result.isEmpty()){
        res.status(400).send({errors: result.array()});
    }

    const data = matchedData(req);

    console.log(data)

    const newUser = { id: testUsers[testUsers.length - 1].id + 1,  ...data}
    testUsers.push(newUser);

    return res.status(200).send(newUser);
})

// use put to update data => use to update the entire object
app.put('/api/users/:id', resolveIndexByUserId, (req, res) =>{
    const {body, findUserIndex} = req;

    // update the object
    testUsers[findUserIndex] = {id: testUsers[findUserIndex].id, ...body};
    
    //return updated user info
    return res.sendStatus(200);
})

// patch request => use to update portion of the object
app.patch('/api/users/:id', resolveIndexByUserId, (req, res) =>{
    const { body, findUserIndex } = req;

    testUsers[findUserIndex] = {...testUsers[findUserIndex], ...body};

    return res.sendStatus(200);
})

// delete request => use to delete an object
app.delete("/api/users/:id", resolveIndexByUserId, (req, res) =>{
    const { findUserIndex } = req;

    testUsers.splice(findUserIndex, 1);

    return res.sendStatus(200)
})