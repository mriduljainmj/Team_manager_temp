const express = require('express');
const connectDB = require('./config/db')
const app = express();

const usersRoute = require('./routes/api/users')
const profileRoute = require('./routes/api/profile')
const postsRoute = require('./routes/api/posts')
const authRoute = require('./routes/api/auth')


connectDB();

app.use(express.json({extended:false}));

app.get('/',(req,res,next)=>{
    res.send('API Running');
})


app.use('/api/users',usersRoute)
app.use('/api/profile',profileRoute)
app.use('/api/posts',postsRoute)
app.use('/api/auth',authRoute)


const PORT  = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`)
})