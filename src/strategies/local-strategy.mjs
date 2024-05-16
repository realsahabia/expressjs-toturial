import passport from "passport";
import { Strategy } from "passport-local";
import { testUsers } from "../utils/constants.mjs";


passport.serializeUser((user, done) => {
    console.log(`Inside Serialize User`)
    console.log(user)
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    console.log(`Inside Dserializer`)
    console.log(`Desirilizing user ID: ${id}`)
    try {
        const findUser = testUsers.find((user) => user.id === id);
        if (!findUser) throw new Error("User Not Found");
        done(null, findUser);
    }catch(err){
        done(err, null);
    }
});

export default passport.use(
new Strategy({usernameField: "name"}, (name, password, done) => {
    console.log(`name: ${name}`);
    console.log(`password: ${password}`);

    try{
        const findUser = testUsers.find((user) => user.name === name);
        if (!findUser) throw new Error("user is not found");
        if (findUser.password !== password) {
            throw new Error("password is not correct");
        } 
        done(null, findUser);
    } catch(err) {
            done(err, null);
        }
    })
);

