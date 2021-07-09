module.exports = class CurrencyDto {
    id;
    name;
    ticker;

    constructor(model) {
        this.id          = model._id;
        this.name        = model.name
        this.ticker      = model.ticker
    }
}