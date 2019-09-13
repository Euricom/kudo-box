const express = require('express');
const path = require('path');
const fs = require('fs');

const server = express();
const options = {
    index: 'index.html',
    redirect: true,
};
// server.use(express.static('/home/site/wwwroot', options));
const staticPath = path.join(__dirname, '..');
console.log('PATH', staticPath);
server.use(express.static(staticPath, options));
const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg'];

server.get('*', (req, res) => {
    console.log('server.get');
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(path.resolve(req.url));
    } else {
        fs.readFile(path.resolve('index.html'), 'utf8', (err, html) => {
            if (req.path.indexOf('share-kudo')) {
                const pathArray = req.path.split('/');
                console.log('ID', pathArray[pathArray.length - 1]);
                const responseHtml = html.replace(
                    /#IMAGE#/g,
                    `https://kudobox-api-dev.azurewebsites.net/api/kudo/${pathArray[pathArray.length - 1]}/getImage`,
                );
                res.send(responseHtml);
                /* const responseHtml = html.replace(
                    /#IMAGE#/g,
                    'https://kudobox-dev.azurewebsites.net/assets/You_Rock.jpg',
                ); */
            } else {
                res.send(html);
            }
        });
    }
});
server.listen(4200);
