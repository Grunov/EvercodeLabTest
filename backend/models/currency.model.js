const {Schema, model} = require('mongoose');

const CurrencySchema = new Schema({
    name: {type: String, required: true},
    ticker: {type: String, required: true}
})

module.exports = model('Currency', CurrencySchema);
