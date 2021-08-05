const express = require('express');
const app = express();
const hbs = require('hbs');

const port = process.env.PORT || 3000;

// Express HBS view engine
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials');


app.get('/', (req,res)=>{
    res.render('home');
});

var json = require("./data/datos.json");

hbs.registerHelper("productos",()=>{
    var pr = JSON.stringify(json);
    var prod = JSON.parse(pr);
    let salida ="";
    for (let i = 0; i < prod.length; i++) {
        salida= salida+'<div class="col"> <figure>'
            +'<img class="img-thumbnail" src="'+prod[i].img+'" alt="">'
            +'<h1>'+prod[i].nombre+'</h1>'
            +'<h2>'+prod[i].precio+'</h2>'
            + '</figure></div>'
    }
    return salida;
})

hbs.registerHelper('getAnio', ()=>{
    return new Date().getFullYear();
});

app.get('/inventario', (req,res)=>{
    res.render('inventario');
});

app.listen(port, ()=>{
    console.log(`Escuchando peticiones en el puerto ${port}`);
});