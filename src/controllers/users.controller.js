const UsersModel = require("../models/users.model");
const responseFactory = require("response-factory");
const validator = require("email-validator");
const bcrypt = require("bcrypt");
const config = require("config");
const accountsUtil = require("../utils/accounts.util");

const SignUp = async (req, res) => {
    try {
        const { fullName, email, password, phone } = req.body;
        if (!fullName
            || !email
            || !password
            || !phone
        ) {
            throw new Error("Missing argument");
        }
        if (!validator.validate(email)) {
            throw new Error("Email của bạn không đúng");
        }
        if (email.search("vnu.edu.vn") < 0) {
            throw new Error("Email phải có định dạng @vnu.edu.vn")
        }
        const passwordValidate = accountsUtil.validatePass(password);
        if (!passwordValidate.valid) {
            throw new Error(passwordValidate.massage);
        }
        // const usersWithInformation = await UsersModel.find({
        //     $or: [
        //         { email },
        //         { phone }
        //     ]
        // });

        // if (userWithInfor.length) {
        //     let message = "đã tồn tại";
        //     const users = usersWithInformation[0];
        //     message = users.email === email ? "Email " + message : message;
        //     message = users.phone === phone ? "Số điện thoại, " + message : message;
        //     throw new Error(message);
        // }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const nowTimeStamp = Date.now();
        const nowDateType = new Date(nowTimeStamp);
        const user = new UsersModel({
            fullName,
            email,
            password: hashPassword,
            passwordUpdateTime: nowDateType,
            phone,
            confirmEmail: false,
            status: false
        });
        user.save();
        const success = responseFactory.success({ data: {} });
        res.json(success);
    } catch (err) {
        const fail = responseFactory.fail({ reason: err.message });
        res.json(fail);
    }

}
const SignIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email
            || !password
        ) {
            throw new Error("Missing argument");
        }
        const userWithEmail = await UsersModel.find({
            email
        });
        if (!userWithEmail.length) {
            throw new Error("Tài khoản không tồn tại");
        }
        const { _id, passwordUpdateTime } = userWithEmail[0];
        const checkPass = bcrypt.compareSync(password, userWithEmail[0].password);
        if (!checkPass) {
            throw new Error("Mật khẩu không chính xác");
        }
        const tokenPayload = {
            id: _id,
            passwordUpdateTime
        }
        const accessToken = accountsUtil
            .generateToken(tokenPayload,
                config.get("ACCESS_TOKEN_EXPIRE_TIME"),
                config.get("SECRET_ACCESS_TOKEN_KEY"))
        const success = responseFactory.success({ data: { accessToken } });
        res.json(success);
    } catch (err) {
        const fail = responseFactory.fail({ reason: err.message });
        res.json(fail);
    }
}
module.exports = {
    SignUp,
    SignIn
}