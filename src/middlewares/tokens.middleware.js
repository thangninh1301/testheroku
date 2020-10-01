const jwt = require('jsonwebtoken');
const responseFactory = require("response-factory");
const usersModel = require('../models/users.model');
const secretTokenSingupKey = require('config').get("SECRET_ACCESS_TOKEN_KEY");
function verifyAccesstoken(req,res,next){
    const{header:{authorization}}=req;
    const Regx=/\s+(.*)/g;
    const token=Regx.exec(authorization)[1];
    jwt.verify(token,secretTokenSingupKey, async(err,decoded)=>{
        if(err){
            return res.json(
                responseFactory
                .authorizationFail({
                    reason:"User is unauthorized"
                })
            )
        }
        req.user=await usersModel.findById(decoded.id);
        const passwordTokenUpdateTime=new Date(decoded.passwordUpdatetime);
        const passwordUserUpdateTime= new Date(req.user.passwordUpdatetime);
        if(passwordTokenUpdateTime<passwordUserUpdateTime){
            return res.json(
                responseFactory
                .authorizationFail({
                    reason:"User is unauthorized"
                })
            )
        }
        req.token = decoded;
        next();
    })
    
}
module.exports={
    verifyAccesstoken
}