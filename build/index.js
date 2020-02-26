"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Request = require("request");
exports.reportToWeChat = () => {
    return new Promise((resolve, reject) => {
        Request.post("https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=1d93e848-c08e-453b-977a-939221367da8", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "msgtype": "text",
                "text": {
                    "content": `😡😡🎂生日快乐🎂😡😡`
                }
            }),
        }, (err, response, body) => {
            if (err) {
                reject();
                return;
            }
            try {
                const result = JSON.parse(body);
                if (result.errcode == 0) {
                    resolve();
                }
            }
            catch (e) {
                reject();
            }
        });
    });
};
const targetDate = +new Date("2020-02-27 00:00:00");
const tid = setInterval(() => {
    const now = +new Date();
    if (now >= targetDate) {
        exports.reportToWeChat().then(() => {
            clearInterval(tid);
        }).catch(() => {
        });
    }
}, 1000);
