const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Gifted;;;',
    PREFIXE: process.env.PREFIX || "Gifted;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY08vZHAzS2pickMyUVpValJtU2txaFpWQkVDckpRa2hzTUVKNENLV2pGMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZDFpUGRCRVg3bHdQU0c5MXNaK3BvMWFMQkRHcXhObmlobURTRTZoMm9GST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4RkxhT0h2WnhXOFMyNUZMKzArTkFTTkZjL3B4bjJiWmJObitPenQzVWtzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtdUp6ZVdjeTNHVktaNDhCTmxDS0tzb20xaE8wS3BRSGFyZ0ZRaWRrankwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNFcDlsSkJ1bXl6U3EyeXY5dXFIYzhKaTV1QlY3b1ZpQ1dvelpWQVVpVzg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlRNFM3RG5maDdVb2daVm1rRzRiQ2NYYUxpaThHQm15cEhnRmlNdm43UTg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0RtUUtpa1BIRUV5bzcxblAxa0hsSnVPN1UwcVVISUpkZ3M0cFM1OVhXND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOThuN3VpNzlpUnc4RWp4QUpxWUtHS1E5MHpZQ3BUY2REU2pFRU9ETmFEOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkV6NEplbkh0OWhuR0M3OTZEU0dQZ2xYTGFlNlBMc3F0MVpmK21rTDdpVXVvNnA0NmNRenpHdnhWaVErWmYwYlhZMXYxbzcrUmh2cCtmeUpTSVE3Nml3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTUwLCJhZHZTZWNyZXRLZXkiOiI4Q0syeW14b3ZtZCtPODc2SDJqNWxxazVHbWdudUdtNThob0dQRjhqWGlBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI2dDJQZUF0MVFyLWZ1eGJJUEFBUy13IiwicGhvbmVJZCI6Ijg5MjQ0YWZjLWMzYzMtNDhlNi04NWMxLTFlODdjYTEyMmRkZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmQWlKMXcrWUhXOVdqNVBSRjUwcFFwZEhNTkU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMU5zUnhpWTlvTVl5bC9RQzFLK2FHWEhUOFJrPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjhTNDZTUk1EIiwibWUiOnsiaWQiOiIyMzQ4MTA1NDIzNDIxOjRAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01EcTVzRUJFS3lzc3JNR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Im5pRFpkdCtsaXQrV2JobkNkVjlES2ZYcjVXUGNqUGxMZ2V0bnNQVFNwV3c9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ik1PVml3VVRiVzgzZEQwbENMWlpSbWplMEpMR25GbDJWbXJTdytSRnNPS2dXOVBaMVFWRERwZTFqY2xtaHloNUxUZVVEb0FVVTgyQm5oREpOYlpOckJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJxNUhNU3FEdE1McWZyRjFVWnJDRUVqUVhiY1dsb3lGa0lVMTBjSXROUW1HOXJySDZoRUN5eStacXl4em02ZkorNDF6ZkI0VGZrWjRHRDJYdEprZ1JpQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgxMDU0MjM0MjE6NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaNGcyWGJmcFlyZmxtNFp3blZmUXluMTYrVmozSXo1UzRIclo3RDAwcVZzIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE4MzkyMzc3fQ==",
    OWNER_NAME: process.env.OWNER_NAME || "yungsorex",
    NUMERO_OWNER : process.env.OWNER_NUMBER ||"2348105423421", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
CHATBOT: process.env.CHAT_BOT || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'yungbot',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/a202f454c9532c3f5b7f8.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || 'online',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

