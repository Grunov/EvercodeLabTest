const Router = require('express').Router;
const router = new Router();
const authRouter  = require('./auth.router');
const currencyRouter = require('./currency.router')
const authMiddleware = require('../middlewares/auth.middlware');

router.use('/auth', authRouter);
router.use('/currency', currencyRouter);

module.exports = router;