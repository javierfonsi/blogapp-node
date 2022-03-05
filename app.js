const express = require('express')
const { sequelize } = require('./util/database')
const app = express() 
const { blogRouter } = require('./routes/user.route')

app.use(express.json())

app.use('/api/v1/blog', blogRouter )

sequelize
    .authenticate()
    .then(()=> console.log('ConnectionDB'))
    .catch(error => console.log(error))

sequelize
    .sync()
    .then(()=> console.log('DB sync'))
    .catch(error => console.log(error))

app.listen(4000, ()=>{
    console.log('Express app running')
})
