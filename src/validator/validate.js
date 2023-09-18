import ClientError from "../error/client-error.js";

const validate = (schema, payload)=>{

    const {error, value} = schema.validate(payload);

    if(error) throw new ClientError(error.message);

    return value;
}

export default validate;