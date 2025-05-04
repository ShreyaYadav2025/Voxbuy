require('dotenv').config();
const express = require('express');
const UserRouter = require('./routers/userRouter');
const ProductRouter = require('./routers/productRouter');
const OrderRouter = require('./routers/orderRouter');
const ContactRouter = require('./routers/contactRouter');
const FeedbackRouter = require('./routers/feedbackRouter');
const cors = require('cors')
const razorpayRouter = require('./routers/razorpayRouter');

const app = express();

const port = process.env.PORT || 5000;

//middleware
app.use(cors({origin: '*'}));
app.use(express.json());
app.use('/user', UserRouter);
app.use('/product', ProductRouter);
app.use('/order', OrderRouter);
app.use('/razorpay', razorpayRouter);
app.use('/contact', ContactRouter);
app.use('/feedback', FeedbackRouter);

//end point or route

app.get('/', (req,res) => {
    res.send('response from request');
});
app.get('/add',(req,res)=>{
    res.send('response from add');
});
app.get('/getall',( req,res) =>{
    res.send('response from get all');
});
app.get('/delete',( req,res) =>{
    res.send('response from delete');
});

app.listen(port, () => {
    console.log('server started')
});