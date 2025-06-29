




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0UvUWNQMXpRWUx5aWVCaVY4TFQrd0FZZHZ2N3liZXJkcFJpRmZSS01tQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNWZxL3k4ejE0enlqNzRWZk5QekJ0KzRyMDRWQjN5Q3RjRkJjNWJjT1gwRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrSjFXaTFBL0VzT2JvYllXZU1OcTF5d0ozRkhZdkxjUGFlTGJYNW1rNlhVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDcW1JSTYvZUlta0x1WlFraTJkaStleEJiRTRqZnFoMGNuRDMzYnB1RzBzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndMaFp5QXNqaU5zYU1OWURzS3ZrSkJHaEpzMXZXbkltTG5IRW1Qc1NxM0U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBiRkdDQ0ZFQjZrTlQxZFNPcjNxa1dTUklKY3dld25DR3pIU3pDZmNSQlU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUpYUVhVWkUxbmlTQjJnRGpWN1YvZnBEdS9oU3lVNUhtL3J2RWZCN21Hcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWlNyeWoyZmsvQnBhUVFsWlJNbXdrOXFmYjliTnFFRDRncGc1TGJvRTh4Yz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxzNWJRRkhxYTYrbm5aUWQrdDdXa1VlRTZkampVeFN0dzBQc0Rqcm8wczdjVW1rVW16ZHJoQUFERWhscTMwMEhvUEtyMkg2TVlpelQ1RjYvMmoxZmhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc4LCJhZHZTZWNyZXRLZXkiOiJMZ1NEc3hLaUxqb3EzNmtSNE5NNVhhRE9SdEZlMGtCK1RRbU5LRWtKTVU0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTYxNjk2ODM4NkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBMTgwOUE0NDMwNjNEMEM3REQ2NEJBOTlGOTFDNzQzNyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxMTg4OTQ0fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTU2MTY5NjgzODZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOEQ5NEVBQjM4NUE2Njg3MzEyNkY5NDcwOTZFQTlGQzYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MTE4ODk0NH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjU1NjE2OTY4Mzg2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjAzMkJEMTI5OTAyMjUxQkFGNzQ4RjY0QTU0NTlBNERBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTExODg5NTl9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkhKUk5QMzczIiwibWUiOnsiaWQiOiIyNTU2MTY5NjgzODY6MjBAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiSmF5bG92ZWhhY2tlciIsImxpZCI6IjE4OTUyMDMxNDEzODcxMDoyMEBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xydnRKOEhFTDZMaE1NR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjJSN3hFNDJWOWx5NUpjblhhVy91WjBJQ3RCRnFkVlJ0d3dGbnhhYkxsRWc9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ii8zSEhzR2hyenhqV2JITThqWUtNNytoY2pRZGlDb3ZjTWJibXJGbE1YWTRqd3BYelQ4NjRIR21uMEphQjI3bGNmNEx3b2F3eFNtL2s2dFppQUt4WEJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJBNjh3a21zbFJnZ2ZjUkpVTWJjTDNIL0ZOQ2dXNmtxYWdDdzQrWU52dXdFSTNRRzJCdHZYTFRkVjVXMWJ6bVo2YzhzSEhtUXFaOFpiRFRBUnNkK05pQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTYxNjk2ODM4NjoyMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJka2U4Uk9ObGZaY3VTWEoxMmx2N21kQ0FyUVJhblZVYmNNQlo4V215NVJJIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQklJQ0E9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTExODg5NDAsImxhc3RQcm9wSGFzaCI6IjJHNEFtdSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSlpOIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "225616968386",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Pkdriller01",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'NEXUS-AI',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/g86c1n.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
