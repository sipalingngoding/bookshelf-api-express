import Joi from "joi";

const addBookSchema = () => {
    return Joi.object({
        name : Joi.string().required(),
        year : Joi.number().required().min(2020),
        author : Joi.string().required(),
        summary : Joi.string().required().min(5),
        publisher : Joi.string().required(),
        pageCount : Joi.number().required(),
        readPage :Joi.number().required(),
        reading : Joi.bool().required(),
    });
};

export {
    addBookSchema,
}
