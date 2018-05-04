let express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    db = require('./db.js');
    ejs = require('ejs'),
    app = express();

//Setting up ejs and views folder
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//Setting public folder
app.use(express.static(path.join(__dirname, 'public')));

//Using body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Pages

//Home
app.get("/", function(req, res){
    res.render('pages/home');
});

//Edits a recipe
app.post("/recipes/update/:id", function(req,res){
    console.log(req.body);
    db.query('UPDATE recipes SET name=$1, ingredients=$2, directions=$3 WHERE id=$4', [req.body.name, req.body.ingredients, req.body.directions, req.params.id], (err, response) => {
            res.redirect('/recipes');
        }
    );
});

//Deletes a recipe
app.delete("/recipes/:id", function(req,res){
    db.query('DELETE FROM recipes WHERE id = $1', [req.params.id], (err, response) => {
        res.redirect('/recipes');
    });
});
//Creates a new recipe
app.post("/recipes", function(req,res){
    db.query('INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3)', [req.body.name, req.body.ingredients, req.body.directions], (err, response) => {
        if(err) {
            console.log(err);
        }
        res.redirect('/recipes');
    });
});

//Gets a list of all recipes
app.get("/recipes", function(req,res,next){
   db.query('SELECT * FROM recipes', [], (err, response) => {
       if(err) {
           next(err);
       }
        res.render('pages/recipes', {
            recipes: response.rows
        })
   });
});

//Turns on server
app.listen(3001, function(){
    console.log("Server is live and listening on port 3001");
});
