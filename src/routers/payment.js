const Router = require('koa-router');
const router = new Router();
const payment = require('../lib/payment');
const register = require('../lib/user');
const VError = require('verror')

router.post('/UserPayment', async (ctx, next) => {
    const Userpayment = payment(ctx);
    const Userregister = register(ctx);
    try{

        const response = await Userpayment.createPayment();
        const OrderdItem = await Userpayment.insertOrderPlacedItems(response);
        const useraddress = await Userregister.updateUserAddress();
        ctx.body = useraddress;
    }
    catch(err){
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }
 
     await next();

})


module.exports = router;