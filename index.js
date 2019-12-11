const speakeasy = require("speakeasy");
const crypto = require("crypto");
const b32 = require("thirty-two");
const notp = require("notp");


const TwoFactor = {
    verifyToken: (secret, token, window) => {
        if (!window) window = 6;
        let tokenValidates = speakeasy.totp.verify({
        secret: secret,
        encoding: "base32",
        token: token,
        window: window
        });
        return tokenValidates;
    },
    generateToken: secret => {
        if (!secret || !secret.length) return null;
        let unformatted = secret.replace(/\W+/g, "").toUpperCase();
        let bin = b32.decode(unformatted);
        return {
          token: notp.totp.gen(bin)
        };
      },
    generateSecret: (data) => {
        if (!data) data = {};
        let bin = crypto.randomBytes(20);
        let base32 = b32
        .encode(bin)
        .toString("utf8")
        .replace(/=/g, "");
        let secret = base32
        .toLowerCase()
        .replace(/(\w{4})/g, "$1 ")
        .trim()
        .split(" ")
        .join("")
        .toUpperCase();
        let uri =
        "otpauth://totp/" +
        encodeURIComponent(data.username|| data.title) +
        "%3Fsecret=" +
        secret +
        encodeURIComponent("&issuer="+data.url);
        return {
        secret: secret,
        uri: uri,
        qr:
            "https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=" +
            uri
        };
    }    
};

module.exports = TwoFactor;

