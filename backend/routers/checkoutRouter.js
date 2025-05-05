const express = require("express");

const router = express.Router();
const Model = require('../models/checkoutModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Checkout = require('../models/checkoutModel');

// Create a new checkout
router.post('/create', async (req, res) => {
  try {
    const { userId, items, totalAmount, shippingAddress, paymentStatus } = req.body;

    const newCheckout = new Checkout({
      userId,
      items,
      totalAmount,
      shippingAddress,
      paymentStatus,
    });

    const savedCheckout = await newCheckout.save();
    res.status(201).json(savedCheckout);
  } catch (error) {
    console.error('Error creating checkout:', error);
    res.status(500).json({ error: 'Failed to create checkout' });
  }
});

// Get all checkouts
router.get('/', async (req, res) => {
  try {
    const checkouts = await Checkout.find();
    res.status(200).json(checkouts);
  } catch (error) {
    console.error('Error fetching checkouts:', error);
    res.status(500).json({ error: 'Failed to fetch checkouts' });
  }
});

router.post('/add', (req, res) => {
  console.log(req.body);
  new Model(req.body).save()
    .then((result) => {
      res.status(200).json(result);

    }).catch((err) => {
      console.log(err);
      res.status(500).json(err);

    });
});

router.get('/getbyemail/:email', (req, res) => {
  console.log(req.params.email);
  res.send('respond from user email');
});

//getall
router.get('/getall', (req, res) => {
  Model.find()
    .then((result) => {
      res.status(200).json(result);

    }).catch((err) => {
      console.log(err);
      res.status(500).json(err);

    });
});

router.delete('/delete/:id', (req, res) => {
  Model.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json(result);

    }).catch((err) => {
      console.log(err);
      res.status(500).json(err);

    });

});

router.post('/authenticate', (req, res) => {
  Model.findOne(req.body)
    .then((result) => {

      if (result) {
        //login success-generate token

        const { _id, name, email } = result;
        const payload = { _id, name, email };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: '2d' },
          (err, token) => {
            if (err) {
              console.log(err);
              res.status(500).json(err);

            } else {
              res.status(200).json({ token });
            }
          }

        )


      } else {
        //login failed-send error message
        res.status(401).json({ message: 'invalid username or password' });
      }

    }).catch((err) => {
      console.log(err);
      res.status(500).json(err);

    });
})

//getbyid
//update
//delete
module.exports = router;