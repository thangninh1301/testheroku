const express= require("express");
const Router=express.Router();
const usersController= require("../controllers/users.controller");
const tokenMiddleware=require("../middlewares/tokens.middleware");

Router.post("/registration", usersController.SignUp);
Router.post("/login",usersController.SignIn);
module.exports = Router