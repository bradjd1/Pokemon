const express = require("express");
const router = express.Router();

//const players = require("../players");
const Player = require("../models").Player;

router.get('/', (req, res) => {
    res.render('players/index.ejs');
})

router.get('/signup', (req, res) => {
    res.render('players/signup.ejs');
})

router.get('/login', (req, res) => {
    res.render('players/login.ejs');
})

router.put('/profile/:id', (req, res) => {
    Player.update(req.body, {
        where: { id: req.params.id },
        returning: true,
    }).then((player) => {
        // console.log('in put update player', req.body, req.params.id)
        res.redirect(`/players/profile/${req.params.id}`);
    });
})

//login
router.post('/login', (req, res) => {
    Player.findOne({ where: { username: req.body.username, password: req.body.password } }).then((players) => {
        // console.log('login user is ', players);
        res.redirect(`profile/${players.id}/`)
    });
    //let userId = User.findAll({ where: {username: req.body.username, password: req.body.password}});
})

// edit page
router.get('/profile/:id/edit', (req, res) => {
    // console.log('in profile id edit1', req.params.id);
    Player.findByPk(req.params.id).then((player) => {
        // console.log('in profile id edit2', player)
        res.render('players/editProfile.ejs', {
            player: player,
            id: req.params.id
        });
    })
})

//display page after login
router.get('/profile/:id', (req, res) => {
    // console.log('**** in get proflie id');
    Player.findByPk(req.params.id).then((player) => {
        // console.log('********  in get profiles id', req.params.id)
        res.render('players/profile.ejs', {
            player: player,
            id: req.params.id
        });
    });
});

router.post("/", (req, res) => {
    // console.log('in create',req.body,req.params.id);
    Player.create(req.body).then ((newPlayer) => {
        res.redirect(`/players/profile/${newPlayer.id}`);
    });
});

router.delete('/profile/:id', (req, res) => {
    // console.log('in delete',)
    Player.destroy({ where: { id: req.params.id } });    //splice(place in array to start deleting, how many to remove)
    res.redirect('/players');     //redirect back to players homepage
});


module.exports = router;