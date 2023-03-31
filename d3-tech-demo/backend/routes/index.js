import express from "express";

const router = express.Router();
const request = require('request');

// A dummy route which will simply return the text "Hello, World".
router.get('/csgo', (req, res) => {
    request("http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=730&format=json", function(error, response, body){
        if(!error && response.statusCode==200){
            res.json(JSON.parse(body));
        }
    });
})


export default router;