const { StatusCodes } = require("http-status-codes");

const validated =  (schema) =>{
    const return_function = async (req,res,next) => {
        const body_value = req.body;
        const {error,value} = await schema.validate(body_value);
        if(error){
            return res.status(StatusCodes.BAD_REQUEST).json({error:error,data:{}})
        }
        req.body=value;
        
        next();
    };
    return return_function;
}

module.exports = {validated}