const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ehbs = require('express-handlebars');
const todos = require('./router/router');

//const boots = require('bootstrap');
const PORT = process.env.PORT || 3000;
const hbs = ehbs.create({
    defaultlayout : 'main',
    extname : 'hbs'
});


app.engine('hbs', hbs.engine); // регестр-ем ключ(1 параметр(имя)) engine в экспрессе(2 параметр)
app.set('view engine', 'hbs'); // исп-ие hbs
app.set('views' ,'views'); // устанавливаем папку где будут хранится файлы .hbs нашего сайта
app.use(express.urlencoded({extended : true}));
app.use(todos);

async function Start(){
    try{
     await mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false' ,{ useNewUrlParser : true, useFindAndModify : false , useUnifiedTopology: true});
    
      app.listen(PORT , () => console.log('Server has been run'));
    }
    catch(e){
        console.log(e);

    }

    
}

Start();