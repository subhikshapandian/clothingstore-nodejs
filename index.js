const koa = require('koa');
const bodyparser = require('koa-bodyparser');
const socketio = require('socket.io');
const app = new koa();

app.use(bodyparser());

let login = require("./src/routers/login");
let product = require("./src/routers/product");
let payment = require("./src/routers/payment");
let register = require("./src/routers/user");
let feedBack = require("./src/routers/feedBack");
let orderPlaced = require("./src/routers/orderPlaced");

app.use(login.routes());
app.use(product.routes());
app.use(payment.routes());
app.use(register.routes());
app.use(feedBack.routes());
app.use(orderPlaced.routes());

app.listen(8000, function () {
    console.log("server running on localhost:8000")
})

const io = socketio(app)

io.on('connection', (socket) => {
    console.log('New connection')
})