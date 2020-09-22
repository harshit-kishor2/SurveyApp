const localtunnel = require('localtunnel');
localtunnel(5000, { subdomain: 'djfbhhbhjboufcj' }, function (err, tunnel) {
    console.log("LT running"+tunnel.url);
});