const CurrencyModel = require('../models/currency.model');
const CurrencyDto   = require('../dtos/currency.dto');
const ApiError      = require('../exeptions/api.error');

class CurrencyService {
    async createCurrency(name, ticker) {
        const existName = await CurrencyModel.findOne({name});
        if(existName) {
            throw ApiError.BadRequest(`Currency with name '${name}' allready exist`);
        }

        const existTicker = await CurrencyModel.findOne({ticker});
        if(existTicker) {
            throw ApiError.BadRequest(`Currency with ticker name '${ticker}' allready exist`);
        }

        const currency = await CurrencyModel.create({name: name, ticker: ticker});

        return currency;
    }

    async getCurrency(id) {
        const currency = await CurrencyModel.findById(id);
        if(!currency) {
            throw ApiError.BadRequest(`Currency with id '${id}' not exist`);
        }
        return currency;
    }

    async updateCurrency(id, name, ticker) {
        const existName = await CurrencyModel.findOne({name});
        if(existName) {
            throw ApiError.BadRequest(`Currency with name '${name}' allready exist`);
        }
        const existTicker = await CurrencyModel.findOne({ticker});
        if(existTicker) {
            throw ApiError.BadRequest(`Currency with ticker name '${ticker}' allready exist`);
        }
        const currency = await CurrencyModel.findById(id, function (err, doc) {
            if (err) throw new Error(err);
            doc.name = name;
            doc.ticker = ticker;
            doc.save();
        });
        return {
            _id: id,
            name: name,
            ticker: ticker
        };
    }

    async deleteCurrency(id) {
        const currencyWithRequestId =  await CurrencyModel.find({_id: id});
        if(!currencyWithRequestId) {
            throw ApiError.BadRequest('Something wrong. This currency is not defined');
        }
        const resData = await CurrencyModel.deleteOne({_id: id});

        return {...resData, id: id};
    }


    async getAllCurrencies() {
        const currencies = await CurrencyModel.find();
        return currencies;
    }
}

module.exports = new CurrencyService;