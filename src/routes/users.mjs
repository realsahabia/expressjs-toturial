import { Router } from "express";
import { query, validationResult, matchedData, checkSchema } from "express-validator";
import { testUsers } from "../utils/constants.mjs";
import { createUserValidationSchema } from "../utils/validationSchema.mjs"; 
import { resolveIndexByUserId } from "../utils/middlewares.mjs";

const userRouter = Router();

userRouter.get(
    "/api/users", 
    query("filter")
    .isString().notEmpty()
    .isLength({ min: 3, max: 10 })
    .withMessage("must be atleast 3 to 10 characters"), 
    (req, res) =>{
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
    }
);

userRouter.get(
    "/api/users/:id", 
    resolveIndexByUserId, 
    (req, res) =>{
    const { findUserIndex } = req;
    const findUser = testUsers[findUserIndex];

    if (!findUser) {
        return res.sendStatus(404);
    }

    return res.send(findUser);  
})

userRouter.post(
    "/api/users",
    checkSchema(createUserValidationSchema),
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
    }
);

userRouter.put(
    '/api/users/:id', 
    resolveIndexByUserId, 
    (req, res) =>{
    const {body, findUserIndex} = req;

    // update the object
    testUsers[findUserIndex] = {id: testUsers[findUserIndex].id, ...body};
    
    //return updated user info
    return res.sendStatus(200);
});

// patch request => use to update portion of the object
userRouter.patch(
    '/api/users/:id', 
    resolveIndexByUserId, 
    (req, res) =>{
    const { body, findUserIndex } = req;

    testUsers[findUserIndex] = {...testUsers[findUserIndex], ...body};

    return res.sendStatus(200);
})

// delete request => use to delete an object
userRouter.delete(
    "/api/users/:id", 
    resolveIndexByUserId, 
    (req, res) =>{
    const { findUserIndex } = req;

    testUsers.splice(findUserIndex, 1);

    return res.sendStatus(200)
})

export default userRouter;