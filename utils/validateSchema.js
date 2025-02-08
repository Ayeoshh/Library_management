const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv();
addFormats(ajv);

/**
 * middleware to validate request body using Json Schema
 * @param {Object} schema - Json schema for validation 
 */

const validateSchema = (schema) =>(req, res, next)=>{
    const validate = ajv.compile(schema);
    const valid = validate(req.body);

    if(!valid){
        return res.status(400).json({errors: validate.errors});
    }

    next();
};

module.exports = validateSchema;