var express = require('express');
var router = express.Router();


const app = express();

var islogin = false;


const db = require('../connection');
const postModel = require('../postModel');

app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse the incoming requests with JSON payloads

const bodyParser = require('body-parser')

app.use(bodyParser)


app.use(express.static('public'));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home', content: 'This is a Home Page' });
});

// // Server setup
// app.listen(PORT, () => {
//   console.log(`Running server on PORT ${PORT}...`);
// })


// // We can also use same file to render
// router.get('/about', function(req, res, next) {
//   res.render('index', { title: 'About Me', content: 'This is about Me page' });
// });


router.get('/about', function (req, res, next) {
  res.render('about', { title: 'About Me', content: 'This is about Me page' });
});

router.get('/projects', function (req, res, next) {
  res.render('projects', { title: 'Projects', content: 'This is projects page' });
});

router.get('/services', function (req, res, next) {
  res.render('services', { title: 'Services', content: 'This is a services page' });
});

router.get('/contact', function (req, res, next) {
  res.render('contact', { title: 'Contact Me', content: 'This is a contact page' });
});


router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login', content: 'This is a Login page' });
});




router.get('/checklogin', async (req, res, next) => {

  try {

    const username = req.query.username;
    const password = req.query.password;


    if(username == 'kshelja' && password == 'canada') {
      
      islogin = true;
      const posts = await postModel.find();
      res.render('business', { title: 'Business Contact List', content: posts });

    } else {

      res.redirect('/login');


    }


   
  } catch (error) {
    res.status(500).send(error)
  }

});



router.get('/business', async (req, res, next) => {
  try {
    if (islogin == true) {
    const posts = await postModel.find();
    res.render('business', { title: 'Business Contact List', content: posts });
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    res.status(500).send(error)
  }
});




router.get('/updatedata', async (req, res, next) => {

  try {
    const id = req.query.id;
    const name = req.query.name;
    const number = req.query.number;
    const email = req.query.email;
    await postModel.findByIdAndUpdate(id, { name , number, email });
    const posts = await postModel.find();
    res.render('business', { title: 'Business Contact List', content: posts });
  } catch (error) {
    res.status(500).send(error)
  }

});

router.get('/update', async (req, res, next) => {
  try {
    var id = req.query.id;
    const post = await postModel.findById(id);
    res.render('update', { title: 'This is a Update page', content: post });
  } catch (error) {
    res.status(500).send(error)
  }
});


router.delete('/delete/:id', async (req, res, next) => {

  try {
    const { id } = req.params;
    const post = await postModel.findById(id);
    await post.remove();
    res.json('Deleted Successfully')
  } catch (error) {
    res.status(500).send(error)
  }
});




module.exports = router;
