const passwordValidator=require("password-validator");
const schema =new passwordValidator();
const jwt= require("jsonwebtoken");
schema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces()
    const validatePass=(password)=>{
        const validatePassword=schema.validate(password,{list:true});
        if(validatePassword.length){
            for(let i=0;i<validatePassword.length;i++){
                switch(validatePassword[i]){
                    case "min":
                        validatePassword[i] = "tối thiểu 8 kí tự"
                        break;
                    case "uppercase":
                        validatePassword[i] = "có ít nhất 1 kí tự viết hoa"
                        break;
                    case "lowercase":
                        validatePassword[i] = "có ít nhất 1 kí tự viết thường"
                        break;
                    case "digits":
                        validatePassword[i] = "có ít nhất 1 kí tự là số"
                        break;
                    case "spaces":
                        validatePassword[i] = "không có dấu cách"
                        break;
                }
            }
            return {
                valid:false,
                massage:`Mật khẩu không đủ yêu cầu cần ${validatePassword}`
            }
        }
        return {valid:true};
    }
    const generateToken = (payload, expiresIn, secretKey) => {
        return jwt.sign({
                ...payload
            }, secretKey, {expiresIn}
        );
    }
    module.exports={
        validatePass,
        generateToken
    }