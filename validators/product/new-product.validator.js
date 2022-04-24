const Joi = require('joi');

module.exports = Joi.object().keys({
    name: Joi.string().trim().alphanum().min(2).max(60).required(),
    price: Joi.number().min(0).max(1000000).required(),
    count: Joi.number().min(0).max(1000).required(),
    description: Joi.string().trim().optional(),
})