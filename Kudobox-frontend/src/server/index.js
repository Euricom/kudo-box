const express = require('express');
const path = require('path');
const fs = require('fs');
const compression = require('compression');
const config = require('./settings.json');

const server = express();
server.use(
    compression({
        filter(req, res) {
            return true;
        },
    }),
);

const options = {
    index: 'index.html',
    redirect: true,
};
// server.use(express.static('/home/site/wwwroot', options));
const staticPath = path.join(__dirname, '..');
server.use(express.static(staticPath, options));
const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg'];

server.get('*', (req, res) => {
    console.log('getting:', req.url);
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        console.log('wut 1');

        res.sendFile(path.resolve(req.url));
    } else {
        console.log('wut 2');
        fs.readFile(path.resolve('index.html'), 'utf8', (err, html) => {
            console.log('share-kudo:', req.path.indexOf('share-kudo'));
            console.log('public-kudo:', req.path.indexOf('public-kudo'));

            if (req.path.indexOf('share-kudo') !== -1 || req.path.indexOf('public-kudo') !== -1) {
                console.log(`${config.apiUrl}/${pathArray[pathArray.length - 1]}/getImage`);
                const pathArray = req.path.split('/');
                let responseHtml = html.replace(
                    /#IMAGE#/g,
                    `${config.apiUrl}/${pathArray[pathArray.length - 1]}/getImage`,
                    // `http://localhost:4200/api/kudo/${pathArray[pathArray.length - 1]}/getImage`,
                );
                responseHtml = responseHtml.replace(
                    /#URL#/g,
                    `${config.oidc.post_logout_redirect_uri}/${pathArray[pathArray.length - 1]}`,
                    // `http://localhost:4200/public-kudo/${pathArray[pathArray.length - 1]}`,
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
server.listen(process.env.PORT || 4200, () => {
    console.log('port', process.env.PORT || 4200);
});
