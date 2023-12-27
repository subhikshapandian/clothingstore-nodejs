const Router = require('koa-router');
const router = new Router();
const ordPlaced = require('../lib/orderPlaced');
const VError = require('verror')

router.get('/getOrderedDetail', async (ctx, next) => {
    const orderPlaced = ordPlaced(ctx);

    try{

        const response = await orderPlaced.getOrderPlacedDetail();
        console.log(response);
        ctx.body = response;
    }
    catch(err){
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }
 
     await next();

})

module.exports = router;