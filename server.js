const express = require('express');
const connectDB = require('./config/db')
const app = express();
const path = require('path')

const usersRoute = require('./routes/api/users')
const profileRoute = require('./routes/api/profile')
const postsRoute = require('./routes/api/posts')
const authRoute = require('./routes/api/auth')


connectDB();

app.use(express.json({extended:false}));

app.use('/api/users',usersRoute)
app.use('/api/profile',profileRoute)
app.use('/api/posts',postsRoute)
app.use('/api/auth',authRoute)


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(___dirname,'client','build','index.html'))
    })
}

const PORT  = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`)
})