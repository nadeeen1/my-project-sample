var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

var islogged = false;
var userLogged = "";
var passwordLogged = "";
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));




app.get('/', function(req,res){
  islogged=false;
  userLogged="";
  passwordLogged="";
  res.render("login",{error:""});

});

app.get('/home', function(req,res){
  if(islogged)
   res.render('home')
   else
   res.redirect("/");
});

app.get('/dune', function(req,res){
  if(islogged)
  res.render('dune',{message:""})
  else
   res.redirect("/");
});

app.get('/fiction', function(req,res){
  if(islogged)
  res.render('fiction',{message:""})
  else
   res.redirect("/");
});

app.get('/flies', function(req,res){
  if(islogged)
  res.render('flies',{message:""})
  else
   res.redirect("/");
});

app.get('/grapes', function(req,res){
  if(islogged)
  res.render('grapes',{message:""})
  else
   res.redirect("/");
});

app.get('/leaves', function(req,res){
  if(islogged)
  res.render('leaves',{message:""})
  else
   res.redirect("/");
});

app.get('/mockingbird', function(req,res){
  if(islogged)
  res.render('mockingbird',{message:""})
  else
   res.redirect("/");
});

app.get('/novel', function(req,res){
  if(islogged)
  res.render('novel')
  else
   res.redirect("/");
});

app.get('/poetry', function(req,res){
  if(islogged)
  res.render('poetry')
  else
   res.redirect("/");
});

app.get('/readlist', function(req,res){
  if(islogged)
  { 
    var userReadList=[];
    var allUsers = fs.readFileSync("users.json");
  allUsers = JSON.parse(allUsers);
  for(u in allUsers)
  {
    if(userLogged. localeCompare(allUsers[u].username)==0)
    {
     userReadList=allUsers[u].readList;

    }  
  }
    res.render('readlist', {list:userReadList})
  }
  else
   res.redirect("/");
});

app.get('/registration', function(req,res){
  res.render('registration',{error:""})
});

app.get('/searchresults', function(req,res){
  if(islogged)
  res.render('searchresults')
  else
  res.redirect("/");
});

app.get('/sun', function(req,res){
  if(islogged)
  res.render('sun',{message:""})
  else
   res.redirect("/");
});

app.post('',function(req,res){
  islogged=false;
  var user = req.body;
  var allUsers = fs.readFileSync("users.json");
  allUsers = JSON.parse(allUsers);
  var flag = false;
  for(i in allUsers)
  {

    if(user.username==allUsers[i].username && user.password == allUsers[i].password)
    {
      res.redirect("/home");
      flag=true;
      islogged=true;
      userLogged=user.username;
      passwordLogged=user.password;
    }    
  }
  if(!flag)
    res.render("login",{error:"Wrong username or password. Please try again!"});

}
)

app.post('/register',function(req,res){
 
  var newUser = req.body;
  newUser.readList=[];
  var allUsers = fs.readFileSync("users.json");
  if(allUsers.length == 0)
  {
    var s = JSON.stringify(newUser);
    fs.writeFileSync('users.json',s);
    return;
  }
  allUsers = JSON.parse(allUsers);
  var oldUser = alreadyRegistered(allUsers,newUser);
  for(u in allUsers)
  {
    if(newUser.username==allUsers[u].username)
    {
      oldUser= true;
      console.log("This username is already registered");
    }  
  }
  if(oldUser)
  res.render("registration",{error:"Username already in use. Please Enter another one"});
  else
  {
    allUsers.push(newUser);
    var s = JSON.stringify(allUsers);
    fs.writeFileSync('users.json',s);
    res.redirect("/");
  }
}
)

app.post('/search',function(req,res){
  
  res.render("searchresults",{searchValue:req.body.Search});
    }

)

app.post('/flies',function(req,res){

  var alreadyExists = addToList("Lord of the Flies");
  console.log(alreadyExists);
  if(alreadyExists)
    res.render("flies",{message:"The book is already in your readlist!"});
  else
    res.render("flies",{message:"Book Added successfully!"});
    }
)
    


app.post('/grapes',function(req,res){

  var alreadyExists = addToList("The Grapes of Wrath");
  if(alreadyExists)
    res.render("grapes",{message:"The book is already in your readlist!"});
  else
    res.render("grapes",{message:"Book Added successfully!"});
    }

)
app.post('/leaves',function(req,res){

  var alreadyExists = addToList("Leaves of Grass");
 
  if(alreadyExists)
    res.render("leaves",{message:"The book is already in your readlist!"});
  else
    res.render("leaves",{message:"Book Added successfully!"});
    }

)

app.post('/sun',function(req,res){

  var alreadyExists = addToList("The Sun and Her Flowers");
  if(alreadyExists)
    res.render("sun",{message:"The book is already in your readlist!"});
  else
    res.render("sun",{message:"Book Added successfully!"});
    }

)

app.post('/dune',function(req,res){

  var alreadyExists = addToList("Dune");
  if(alreadyExists)
    res.render("dune",{message:"The book is already in your readlist!"});
  else
    res.render("dune",{message:"Book Added successfully!"});
    }

)

app.post('/mockingbird',function(req,res){

  var alreadyExists = addToList("To Kill a Mockingbird");
  if(alreadyExists)
    res.render("mockingbird",{message:"The book is already in your readlist!"});
  else
    res.render("mockingbird",{message:"Book Added successfully!"});
    }

)
function addToList(bookName){
  
  var alreadyExists=false;
  var allUsers = fs.readFileSync("users.json");
  allUsers = JSON.parse(allUsers);
  for(u in allUsers)
  {
    if(userLogged. localeCompare(allUsers[u].username)==0)
    {
    if(!allUsers[u].readList.includes(bookName))
      allUsers[u].readList.push(bookName);
    else
      alreadyExists=true;
     var s = JSON.stringify(allUsers);
     fs.writeFileSync('users.json',s);
     return alreadyExists;
    }  
  }
  

}

function alreadyRegistered(allUsers,newUser)
{
  for(u in allUsers)
  {
    if(newUser.username==allUsers[u].username)
    {
      return true;
    }  
  }
  return false;

}




app.listen(3000);