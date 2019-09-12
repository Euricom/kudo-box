const express = require('express');
const path = require('path');
const fs = require('fs');

const server = express();
const options = {
    index: 'index.html',
    redirect: true,
};
server.use(express.static('/home/site/wwwroot', options));
const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg'];

server.get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(path.resolve(req.url));
    } else {
        fs.readFile(path.resolve('index.html'), 'utf8', (err, html) => {
            const responseHtml = html.replace(/#IMAGE#/g, 'https://kudobox-dev.azurewebsites.net/assets/You_Rock.jpg');
            res.send(responseHtml);
        });
    }
});
server.listen(4200);
