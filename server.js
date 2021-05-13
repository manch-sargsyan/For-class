const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.static("public"));

//Google Auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '904831531443-7kr9trv3v651k5amrn1pnmf6f6b0hl86.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);



const PORT = process.env.PORT || 7000; //bind to heroku port or use 7000


// Middleware
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res)=>{
	res.render('index');
})


app.get('/login', (req, res)=>{
	res.render('login');
})

app.post('/login', (req, res)=>{
	let token = req.body.token;
	console.log(token);
	async function verify() {
	const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  console.log(payload);
}
verify()
.then(()=>{
	res.cookie('session-token', token);
    res.send('success');
}).
catch(console.error);
})


app.get('/', checkAuthenticated, (req, res)=>{
	let user = req.user;
	res.render('index', {user});
})


app.get('/protectedroute', (req, res)=>{
	res.render('protectedroute');
})


app.get('/logout', (req, res)=>{
	res.claerCookie('session-token');
	res.redirect('/login');
})


function checkAuthenticated(req, res, next){

    let token = req.cookies['session-token'];

    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
      }
      verify()
      .then(()=>{
          req.user = user;
          next();
      })
      .catch(err=>{
          res.redirect('/login');
      })

}



app.listen(PORT, () =>{
	console.log(`Server running on port ${PORT}`);
	//console.log("Server Started on:" + PORT)
})


app.get("/admin", (req, res) => {
	res.render("admin");
})

app.get("/edit_book", (req, res) => {
	res.render("edit_book");
})

app.get("/edit_hobby", (req, res) => {
	res.render("edit_hobby");
})

app.get("/book_form", (req, res) => {
  res.render("book_form");
})

app.get("/hobby_form", (req, res) => {
  res.render("hobby_form");
})