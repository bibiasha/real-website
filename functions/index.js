const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors")
const stripe = require("stripe")('sk_test_51MrPTtSA4AQcOAQXr3fLXHCpFnBCKj0cpRKfxkAZNXKGWWcHVbpdvhozM9Ft5Au1ZAfmGDX6OcWZSUSt2Y0XXzby00vrtyPCnz');

//api
//app config
const app = express();

//middlewares
app.use(cors({ original: true }))
app.use(express.json());
//api routes
app.get('/', (request, response) => response.status(200).send('hello world'));

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    console.log('Payment request recieved', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of currency
        currency: "usd"
    })
    //ok -created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})
//listen command

exports.api = functions.https.onRequest(app)

//example endpoint
//http://127.0.0.1:5001/mr-signboards/us-central1/api


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
