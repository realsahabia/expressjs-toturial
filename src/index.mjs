import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
// import { testUsers } from "./utils/constants.mjs";
import passport from "passport";
import "./strategies/local-strategy.mjs";

// start the express app
const app = express();
app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(session({
    secret: 'karim the dev',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);



// middleware
const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
}

// Get a port
let PORT = process.env.PORT || 3000;

// start the server
app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
});

// create routes with the GET request
app.get("/", (req, res) =>{
    console.log(req.session);
    console.log(req.session.id);

    // send a respose
    res.cookie("hello", "world", {maxAge: 60000, signed: true})
    res.send("Hello World!");
});

app.post("/api/auth",  
passport.authenticate("local"), 
(req, res) =>{
    res.sendStatus(200);
});

// app.post("/api/auth", (req, res) =>{
//     const {
//         body: {name, password}
//     } = req;

//     const findUser = testUsers.find((user) => user.name === name);

//     if (!findUser || findUser.password !== password) return res.status(401).send({ msg: "BAD CREDENTIALS"});

//     req.session.user = findUser;

//     return res.status(200).send(findUser);
// })

app.get("/api/auth/status", (req, res) =>{
    console.log(`Inside  /auth/status endpoint`)
    console.log(req.user);

    return req.user 
    ? res.send( req.user ) 
    : res.sendStatus(401);
})






// const resolveIndexByUserId = (req, res, next) =>{
//     const {params:{id}} = req;

//     const parsedId = parseInt(id);

//     if (isNaN(parsedId)){
//         return res.statusCode(400);
//     }

//     const findUserIndex = testUsers.findIndex((user) => user.id === parsedId);
//     if (findUserIndex === -1){
//         return res.status(404);
//     }

//     req.findUserIndex = findUserIndex;

//     next();
// }

// app.get("/api/users", 
// query("filter")
// .isString().notEmpty()
// .isLength({ min: 3, max: 10 })
// .withMessage("must be atleast 3 to 10 characters"), 
// (req, res) =>{
//     // console.log(req);
//     const result = validationResult(req);
//     console.log(result)

//     // destructure query
//     const {query: { filter, value}} = req;

//     if (filter && value) {
//         res.send(
//             testUsers.filter((user)=> user[filter].includes(value))
//         )
//     }

//     // send a respose of user
//     return res.send(testUsers);
// }
// )

// app.get("/api/products", (req, res) =>{
//     // send a respose of user
//     res.status(201).send(testProducts);
// })

// setting route params
// app.get("/api/users/:id", resolveIndexByUserId, (req, res) =>{
//     const { findUserIndex } = req;
//     const findUser = testUsers[findUserIndex];

//     if (!findUser) {
//         return res.sendStatus(404);
//     }

//     return res.send(findUser);  
// })



// posting a request to the server
// app.post("/api/users", 
// checkSchema(createUserValidationSchema),
// // [body("name")
// // .notEmpty()
// // .withMessage("name must not be empty")
// // .isLength({min: 5, max: 32})
// // .withMessage("username must be at least 5 to 32 characters"),
// // body("age")
// // .isNumeric()
// // .withMessage("must be a number")
// // .notEmpty()
// // .withMessage("must not be empty")], 
// (req, res) =>{
//     const result = validationResult(req);
//     console.log(result);

//     if (!result.isEmpty()){
//         res.status(400).send({errors: result.array()});
//     }

//     const data = matchedData(req);

//     console.log(data)

//     const newUser = { id: testUsers[testUsers.length - 1].id + 1,  ...data}
//     testUsers.push(newUser);

//     return res.status(200).send(newUser);
// })

// use put to update data => use to update the entire object
// app.put('/api/users/:id', resolveIndexByUserId, (req, res) =>{
//     const {body, findUserIndex} = req;

//     // update the object
//     testUsers[findUserIndex] = {id: testUsers[findUserIndex].id, ...body};
    
//     //return updated user info
//     return res.sendStatus(200);
// })

// // patch request => use to update portion of the object
// app.patch('/api/users/:id', resolveIndexByUserId, (req, res) =>{
//     const { body, findUserIndex } = req;

//     testUsers[findUserIndex] = {...testUsers[findUserIndex], ...body};

//     return res.sendStatus(200);
// })

// // delete request => use to delete an object
// app.delete("/api/users/:id", resolveIndexByUserId, (req, res) =>{
//     const { findUserIndex } = req;

//     testUsers.splice(findUserIndex, 1);

//     return res.sendStatus(200)
// })