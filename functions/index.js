const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors")
const stripe = require("stripe")('sk_test_51MrPTtSA4AQcOAQXr3fLXHCpFnBCKj0cpRKfxkAZNXKGWWcHVbpdvhozM9Ft5Au1ZAfmGDX6OcWZSUSt2Y0XXzby00vrtyPCnz');
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

//api
//app config
const app = express();

//middlewares
app.use(cors({ original: true }))
app.use(express.json());
//api routes
app.get('/', (request, response) => response.status(200).send('hello world'));

// app.post('/payments/create', async (request, response) => {
//     const total = request.query.total;
//     console.log('Payment request recieved', total)

//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: total, //subunits of currency
//         currency: "usd"
//     })
//     //ok -created
//     console.log("secret", paymentIntent.client_secret)
//     response.status(201).send({
//         clientSecret: paymentIntent.client_secret,
//     })
// })
//listen command

app.post("/payments/create", async (request, response) => {
    const total = request.body.total;

    const paymentIntent = await stripe.paymentIntents.create( {
        amount: total,
        currency:"usd"
    });

    const intentSecret = paymentIntent.client_secret;
    console.log("intentSecret", intentSecret);

    response.status(201).send({
        clientSecret: intentSecret,
    });
});

//listen command
exports.api = functions.https.onRequest(app);






//exports.api = functions.https.onRequest(app)

//example endpoint
//http://127.0.0.1:5001/mr-signboards/us-central1/api


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
