import express from "express";

const router = express.Router();
const request = require('request');

// Achievements.
router.get('/csgo-achievements', (req, res) => {
    request("http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=730&format=json", function(error, response, body){
        if(!error && response.statusCode==200){
            res.json(JSON.parse(body));
        }
    });
})

export default router;