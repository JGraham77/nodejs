const path = require("path");
const fs = require("fs");
const rp = require('request-promise');

rp("https://reddit.com/r/programmerhumor.json")
    .then(reddit => {

        let posts = JSON.parse(reddit).data.children;
        let objs = [];

        posts.forEach((item) => {
            if (item.data.url_overridden_by_dest) {
                let obj = {
                    url: item.data.url_overridden_by_dest,
                    id: item.data.preview.images[0].id,
                    type: ""
                }
                let type = obj.url.substring(obj.url.lastIndexOf("."), obj.url.lastIndexOf(".") + 4)
                obj.type = type;
                objs.push(obj);
            }
        });


        objs.forEach((img) => {
            if (img.type === '.gif' || img.type === '.jpg' || img.type === '.jpeg' || img.type == '.png') {
                let options = {
                    url: img.url,
                };
                rp.get(options)
                    .then((res) => {
                        let buffer = Buffer.from(res, 'UTF8');
                        fs.writeFileSync("downloads/" + img.id + img.type, buffer);
                    })
                    .catch(err => {
                        console.log(err.message);
                    })
            }
        });
    })
    .catch(err => {
        console.log(err);
    });