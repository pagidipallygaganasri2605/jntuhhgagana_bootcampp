const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("frontend"));

app.use(express.json());


const users=[
    {
        "id":1,
        "name":"john",
        "gender":"male",
        "image":"https://randomuser.me/api/portraits/men/18.jpg",
    },

    {
        "id":2,
        "name":"amber",
        "gender":"female",
        "image":"https://randomuser.me/api/portraits/women/43.jpg",
    },

    {
        "id":3,
        "name":"lily",
        "gender":"female",
        "image":"https://randomuser.me/api/portraits/women/26.jpg",
    },

    {
        "id":4,
        "name":"juan",
        "gender":"male",
        "image":"https://randomuser.me/api/portraits/men/88.jpg",
    },

    {
        "id":5,
        "name":"valtteri rantala",
        "gender":"male",
        "image":"https://randomuser.me/api/portraits/men/5.jpg",
    },

    {
        "id":6,
        "name":"Steffen",
        "gender":"male",
        "image":"https://randomuser.me/api/portraits/men/48.jpg",
    },

    {
        "id":7,
        "name": "Bendavid",
        "gender": "male",
        "image":"https://randomuser.me/api/portraits/men/1.jpg",
    },

    {
        "id":8,
        "name": "Mia",
        "gender": "female",
        "image": "https://randomuser.me/api/portraits/women/29.jpg",
    },

    {
        "id":9,
        "name": "Liam",
        "gender": "female",
        "image": "https://randomuser.me/api/portraits/women/52.jpg",
    },

    {
        "id":10,
        "name": "Noah",
        "gender": "male",
        "image":"https://randomuser.me/api/portraits/women/11.jpg",
    }

]

var nextId = 11;

function findIndex(id){
    for(var i=0; i<users.length; i++){
        if(users[i].id === id){
            return i;
        }
        return -1;
    }
}

app.get("/api/users", function(req, res){
   return res.json(users);
})

app.get("/api/users/:id", function(req, res){
    var id = Number(req.params.id);
    var index = findIndex(id);
    if(index == -1){
       return res.status(404).json({"message": "User not found with id " + id});
    }
    var user = users[index];
    return res.json(user);
})

app.get("/api/random-user",function(req,res){
    if(users.length === 0){
       return res.status(404).json({"message": "No user found"});
    }
    var randomIndex = Math.floor(Math.random() * users.length);
    return res.json(users[randomIndex]);
});

app.post("/api/users", function(req, res){
    var newUser = req.body;
    var tempUser={
        "id": nextId,
        "name": newUser.name,
        "gender": newUser.gender,
        "image": newUser.image
    }
    users.push(tempUser);
    nextId++;
    return res.status(201).json(tempUser);
});




app.listen(port, function(){
    console.log("Server running on http://localhost:" + port);
});
