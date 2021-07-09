const Router = require('express').Router;
const router = new Router()
const {body} = require('express-validator');
const currencyController = require('../controllers/currency.controller');

router.get('/', currencyController.getAllCurrencies);
router.get('/:id', currencyController.getCurrency);
router.post(
    '/create', 

    body('name')
        .isLength({min: 1, max: 20})
        .withMessage('is required and no longer than 20 characters')
        .matches(/[A-Za-z0-9]/)
        .withMessage('Can only contain letters A-Z and numbers'),

    body('ticker')
        .isLength({min: 3, max: 5})
        .withMessage('no shorter than 3 and no longer than 20 characters')
        .matches(/[A-Za-z0-9]/)
        .withMessage('Can only contain letters and numbers'),

    currencyController.createCurrency
)
router.patch(
    '/update', 
    body('name')
        .isLength({min: 1, max: 20})
        .withMessage('is required and no longer than 20 characters')
        .matches(/[A-Za-z0-9]/)
        .withMessage('Can only contain letters A-Z and numbers'),

    body('ticker')
        .isLength({min: 3, max: 5})
        .withMessage('no shorter than 3 and no longer than 20 characters')
        .matches(/[A-Za-z0-9]/)
        .withMessage('Can only contain letters and numbers'),
        
    currencyController.updateCurrency
)
router.delete('/delete', currencyController.deleteCurrency)

module.exports = router;