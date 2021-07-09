const currencyService =  require('../services/currency.service');
const {validationResult} = require('express-validator');
const ApiError = require('../exeptions/api.error');

class CurrencyController {
    async createCurrency(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()));
            }
            const {name, ticker} = req.body;
            const currencyData = await currencyService.createCurrency(name, ticker);
            return res.json(currencyData);
        }
        catch(error) {
            next(error);
        }
    }

    async getCurrency(req, res, next) {
        try {
            const {id} = req.params;
            const currencyData = await currencyService.getCurrency(id);
            return res.json(currencyData);
        }
        catch(error) {
            next(error);
        }
    }

    async updateCurrency(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()));
            }
            const {id, name, ticker} = req.body;
            const currencyData = await currencyService.updateCurrency(id, name, ticker);
            return res.json(currencyData);
        }
        catch(error) {
            next(error);
        }
    }

    async deleteCurrency(req, res, next) {
        try {
            const {id} = req.body;
            const resData = await currencyService.deleteCurrency(id);
            return res.json(resData);
        }
        catch(error) {
            next(error);
        }
    }

    async getAllCurrencies(req, res, next) {
        try {
            const currencies = await currencyService.getAllCurrencies();
            return res.json(currencies);
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new CurrencyController();