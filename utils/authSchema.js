const registerSchema = {
    type: 'object',
    properties: {
        name: {type: 'string', minLength: 1 },
        email: {type: 'string', format: 'email'},
        password: {type: 'string', minLength: 6}
    },
    required: ['name', 'email', 'password'],
    addtionalProperties: false
};

module.exports =  {registerSchema};
