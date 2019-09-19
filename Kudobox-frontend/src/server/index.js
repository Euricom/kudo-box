const express = require('express');
const path = require('path');
const fs = require('fs');
const compression = require('compression');

const server = express();
server.use(compression);

const options = {
    index: 'index.html',
    redirect: true,
};
// server.use(express.static('/home/site/wwwroot', options));
const staticPath = path.join(__dirname, '..');
server.use(express.static(staticPath, options));
const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg'];

server.get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(path.resolve(req.url));
    } else {
        fs.readFile(path.resolve('index.html'), 'utf8', (err, html) => {
            if (req.path.indexOf('share-kudo') !== -1 || req.path.indexOf('public-kudo') !== -1) {
                const pathArray = req.path.split('/');
                let responseHtml = html.replace(
                    /#IMAGE#/g,
                    `https://kudobox-api-dev.azurewebsites.net/api/kudo/${pathArray[pathArray.length - 1]}/getImage`,
                );
                responseHtml = responseHtml.replace(
                    /#URL#/g,
                    `https://kudobox-dev.azurewebsites.net/public-kudo/${pathArray[pathArray.length - 1]}`,
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
server.listen(process.env.PORT);
