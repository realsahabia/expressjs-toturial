import { testUsers } from "./constants.mjs";

export const resolveIndexByUserId = (req, res, next) =>{
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