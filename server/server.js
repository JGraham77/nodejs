const path = require('path');
const fs = require('fs');

let chirps = [
    {
        username: "cptredbeard",
        chirp: "Today is the day that I finally finish my project!"
    },
    {
        username: "BarrenNashor",
        chirp: "I think it is time for a nap."
    },
    {
        username: "ATLC",
        chirp: "Someone keep Lunatic away from my computer cords!"
    },
    {
        username: "DMan",
        chirp: "Why heeeeelllloooooo"
    },
    {
        username: "123456",
        chirp: "I am finally learning how to count past 6, I think 8 comes next but I am not sure!"
    }
];

fs.writeFile('chirps.json', JSON.stringify(chirps), (err) => {
    if (err) console.log(err);
});

fs.readFile("chirps.json", (err, data) => {
    if (err) console.log(err);
    console.log(data.toString());
});