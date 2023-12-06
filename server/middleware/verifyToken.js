import jwt from "jsonwebtoken";
import logger from "../logger.js";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    console.log("token __ : ", token);

    if (!token) return res.status(401).send("Access Denied by token");

    const tokenWithoutBearer = token.replace("Bearer ", "");
    console.log("\n asfasf as");

    // const verified = jwt.verify(
    //   token.replace("Bearer ", ""),
    //   process.env.TOKEN_SECRET
    // );

    const verified = jwt.verify(
      token.startsWith("Bearer ") ? token.slice(7) : token,
      process.env.TOKEN_SECRET
    );

    console.log("\n aGGGGGGGGG", verified);
    
    req.user = verified;
    console.log("\n YES VERIFIED:", verified);
    next();
  } catch (err) {
    // res.status(500).json({ error: err.message });
    logger.error('An error occurred:', err);
  }
};

export default verifyToken;

// const verifyToken = async (req, res, next) => {
//     try {
//         const token = req.header("auth-token");
//         console.log("token __ : ", token)

//         if(!token) return res.status(401).send("Access Denie by token");

//         // if(token.startsWith("Bearer ")){
//         //     token = token.slice(7, token.length).trimLeft();
//         // }
//         console.log("\n asfasf as");
//         const verified = jwt.verify(token.replace("Bearer ", ""), process.env.TOKEN_SECRET);
//         console.log("\n aGGGGGGGGG", verified);
//         req.user = verified;
//         console.log("\n YES VERIFIED:", verified);
//         next();
//     } catch (err){
//         res.status(500).json({error: err.message});
//     }
// }

// export default verifyToken;
