const path=require('path');

const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const session=require('express-session');
const MongoDBStore=require('connect-mongodb-session')(session);

const User=require('./models/user');
const landlordreg=require('./models/landlordreg')

const app=express();
const store=new MongoDBStore(
    {
        uri:'mongodb+srv://Ayush:aA123456789ayush@home.bwnef.mongodb.net/HouseRent',
        collection: 'sessions'
    }
)

app.set('view engine','ejs');
app.set('views','views');

const adminRoutes=require('./routes/admin');
const authRoutes=require('./routes/auth');
const userRoutes=require('./routes/User');
const landlordRoutes=require('./routes/landlord');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({secret:'my secret',resave:false, saveUninitialized:false, store: store}));

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    landlordreg.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use(adminRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(landlordRoutes);

mongoose.connect('mongodb+srv://Ayush:aA123456789ayush@home.bwnef.mongodb.net/HouseRent?retryWrites=true')
    .then(result=>{

    app.listen(3000)
})
    .catch(err=>{
        console.log(err)
    })

