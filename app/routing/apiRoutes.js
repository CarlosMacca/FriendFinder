// A GET route with the url /api/friends (this iwll be used to display a JSON of all possible friends)
// A POST route /api/friends (this will be used to handle incoming survey results. THis route will also be used to handle the compatibility logic.)



var friends = require('../data/friends');


module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
      res.json(friends);
    });

// router.get('/api/friends', function(req, res){
//     res.json(friends);
// })

app.post('/api/friends', function(req, res){
    friends.push(req.body)
   


    let matchResults = [];
    let u = friends.length - 1;
    let userData = friends[u];

    console.log(friends);

    for (let i = 0; i < friends.length - 1; i++) {
        let difference = 0;
        let friendScores = friends[i].scores;
        console.log("friend score is " + friendScores);
        for (let j = 0; j < friendScores.length; j++) {
        let matchEquation = userData.scores[i] - friendScores[j];
        if (userData.scores[i] >= friendScores[j] || userData.scores[i] <= friendScores[j]) {
            difference += Math.abs(matchEquation);
        }
        }
        matchResults.push(difference);
    }
    Array.min = function(matchResults) {
        return Math.min.apply(Math, matchResults);
    };

    var minimum = Array.min(matchResults);

    let matchNumber = matchResults.indexOf(minimum);

    console.log(matchNumber);
    console.log(friends[matchNumber].name);
    res.json(friends[matchNumber]);
    });

 
};