const https = require("https");
const { exec } = require("child_process");

let wasOffline = false;
let id;

function checkInternet() {
    https.get("https://www.google.com", () => {

        if (wasOffline) {
            console.log("Internet is back!");

            exec("brave https://www.youtube.com/watch?v=5EpyN_6dqyk&list=RD5EpyN_6dqyk&start_radio=1");

            clearInterval(id);
            console.log("Program stopped checking.");
            return;
        }

        console.log("Internet is already connected!");

        clearInterval(id);

    }).on("error", () => {
        wasOffline = true;
        console.log("No internet...");
    });
}

id = setInterval(checkInternet, 5000);