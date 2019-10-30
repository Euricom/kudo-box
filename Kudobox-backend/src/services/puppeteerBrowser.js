const pptr = require("puppeteer");
let instance = null;
module.exports.getBrowserInstance = async function() {
  if (!instance)
    instance = await pptr.launch({
      args: [
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
        "--no-first-run",
        "--deterministic-fetch",
        '--proxy-server="direct://"',
        "--proxy-bypass-list=*",
        "--disable-gpu"
      ]
    });
  return instance;
};
