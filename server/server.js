//import { Server } from 'https';
const express = require('express'); //en route node js, modul
const app = express(); //Skapa express app, tar emot frågor från client till server
const bodyParser = require('body-parser'); //skaas för att visa content
const path = require('path');// lägger till möjligheten till olika sökvägar
const stripe = require('stripe')('sk_test_ghiVRkjlfHaQ4l5UsTcdKFg1');// stripe betlning


const bcrypt = require('bcrypt'); // kryptering
const saltRounds = 10;

//Databas mongoDB
global.mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/the_magazine_store');
app.use(bodyParser.json());

// serve frontend files (all existing files in the client folder will respond)
app.use(express.static( '../client/'));
app.get(/^((?!rest).)*$/, async(req, res)=>{
  res.sendFile(path.normalize(__dirname + '/../client/index.html'));
});
// skapa sessiontabeller och usertabeller
const AccessManager = require('access-manager');
const accessManager = new AccessManager({
  mongoose: mongoose, // mongoose (connected)
  expressApp: app, // an express app
  sessionSchema: {
    loggedIn: {type:Boolean, default:false},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }
  },
  userSchema: {
    email: {type: String, required:true, unique:true},
    password: {type: String, required:true},
    roles: [String],
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }
  }
});

const Category = require('./models/category.js');
const Product = require('./models/product.js');
global.Cart = require('./models/cart.js');
const User = accessManager.models.user;
const Order = require('./models/order.js');
const CartMiddleware = require('./middlewares/cart-middleware.js');

app.use(CartMiddleware);

// R E S T 
// Payment CRUD path
app.post('/rest/pay', async(req, res)=>{
  const userEmail = req.session.user.email;
  let paymentSum = 0;

  const cart = await Cart.findOne({ _id: req.session.cart }).populate('items.product');

  for(let item of cart.items){
    const price = item.product.price * item.amount;
    paymentSum += price;
  }

// Fraktsumma
let frakt = 50;
  if(paymentSum > 200){
    console.log("Fri frakt");
  }else{
    paymentSum += frakt;
  }
  console.log(paymentSum);

  const customer = await stripe.customers.create(
    { "email": userEmail }
  ).catch(e=>console.error);

  let source = await stripe.customers.createSource(customer.id, {
    source: 'tok_visa'
  }).catch(e=>console.error);

  let charge = await stripe.charges.create({
    amount: paymentSum * 10,
    currency: 'sek',
    customer: source.customer
  }).catch(e=>console.error);

  let order = await new Order({
    customer: req.user,
    result: charge,
    cartData: cart
  });
  await order.save();

  res.json(charge);
});

app.get('/rest/order', async(req, res)=>{
  let orders = await Order.find(); 
  res.json(orders);
}); 

// Produkter CRUD path
app.get('/rest/products', async(req, res)=>{
  let products = await Product.find().populate('category');
  res.json(products);
});

app.get('/rest/products/:id', async(req, res)=>{
  // Hämta produkt från databas
  let product = await Product.findOne({_id: req.params.id}).populate('category');
  if(this.search == product){
    return this.product;
  }
  res.json(product);
});

app.post('/rest/products', async(req, res)=>{
  // Skapa nya produkter
  let product = await new Product(req.body);
  try{
    product.save();
    res.json(product);
  }catch(err){
    console.error(err);
    res.json(err);
  }
});

app.put('/rest/products/:id', async(req, res)=>{
  // Uppdatera produkter
  // Hämta produkt från databas
  let product = await Product.findOne({_id: req.params.id});
  // Få reultatet
  let result = await product.update(req.body);
  if(result.ok){
    result = req.body;
  }
  res.json(result);
});

app.delete('/rest/products/:id', async (req, res)=>{
  // delete the product from the db
  let result = await Product.deleteOne({_id: req.params.id});
  res.json(result);
});

// Kategorier CRUD path
app.post('/rest/category', async(req, res)=>{
  let category = await new Category(req.body);
  try{
    category.save();
    res.json(category);
  }catch(err){
    console.error(err);
    res.json(err);
  }
});

app.get('/rest/category', async(req, res)=>{
  let categories = await Category.find();
  res.json(categories);
});

// Cart CRUD paths
app.post('/rest/cart', async(req, res)=>{
  let cart = await Cart.findOne({_id: req.session.cart});
  console.log('cart', cart);
  if(cart === null){ 
    console.error('Unhandled error. We should have a cart, but we only have the ID. Well just make a new one (with the id) then...', req.session.cart);
    cart = new Cart({_id: req.session.cart});
  }
  if(!cart.items){
    cart.items = [];
  }
  let found;
  if(cart.items.length > 0){
    // look for duplicate item
    found = cart.items.find(item => item.product == req.body.product);
  }
  if(found){
    // update existing cart item
    found.amount += req.body.amount;
  }else{
    // add new item if no duplicate
    cart.items.push({product: req.body.product, amount: req.body.amount});
  }
  cart.save();
  res.json(cart);
});

app.get('/rest/cart', async(req, res)=>{
  // read the cart (note that the CartMiddleware must already have run), populate the products
  let cart = await Cart.findOne({_id: req.session.cart}).populate("items.product");
  res.json(cart);
});
// User access paths:
app.post('/rest/register', async (req, res)=>{
  // encrypt password
  req.body.password = await bcrypt.hash(req.body.password, saltRounds);
  // create user
  let user = await new User(req.body);
  user.roles = ["user"];
  await user.save();
  res.json({msg:'Registered'});
});

app.post('/rest/login', async (req, res, next)=>{
  // find user
  let user = await User.findOne({email: req.body.email});
  // passwords match?
  if(user && await bcrypt.compare(req.body.password, user.password)){
    req.session.user = user._id;
    req.session.loggedIn = true;
    await req.session.save(); // save the state
    res.json(user);
  }else{
    res.json({msg:'Fel användarnamn eller lösenord'});
  }
});

app.all('/rest/logout', async (req, res)=>{
  req.user = {}; // we clear the user
  // CLEAR THE SESSION CART!!
  if(req.session.cart){
    req.session.cart = null; // Delete a mongoose property object reference by setting it to null.
    req.session.save(); // and save the change
  }
  req.session.loggedIn = false; // but we retain the session with a logged out state, since this is better for tracking, pratical and security reasons
  await req.session.save(); // save the state
  res.json({msg:'Du loggas ut'});
});
// current user data
app.get('/rest/user', (req, res)=>{
  // check if there is a logged-in user and return that user
  let response;
  if(req.user._id){
    response = req.user;
    // never send the password back
     }else{
    response = {message: 'Du är inte inloggad'};
  }
  res.json(response);
});
// Some role tests:
app.get('/rest/admin', async(req, res)=>{
  res.send('Only admin role may access here');
});
app.get('/rest/super', async(req, res)=>{
  res.send('Only super role may access here');
});
// start the express HTTP server
app.listen('3000', ()=>{
  console.log('The magazine store server is running on port 3000');
});