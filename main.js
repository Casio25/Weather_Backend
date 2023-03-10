const http = require("http");
const fs = require("fs");

http.createServer((req, res) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Methods", "GET, POST, UPDATE");
    res.writeHead(200, { "Content-Type": "application/json" });

    const url = req.url;
    let body ="";

    if (req.method === "POST"){
        if (url === "/data"){
            console.log("post");
            req.on("data", (data) =>{
                body += data.toString();
            });
            req.on("end", () => {
                const newData = JSON.parse(body);
                const dataUpdate = JSON.parse(fs.readFileSync("data.txt"));
                dataUpdate.push(newData);
                fs.writeFileSync("data.txt", JSON.stringify(dataUpdate));
            });
            res.write(JSON.stringify(fs.readFileSync("data.txt")));
            res.end("");
        }
    }else if(req.method === "GET"){
        if (url === "/data"){
            const weatherData = fs.readFileSync("data.txt", "utf-8");
            res.end(weatherData);
        }else if (weatherData.status !== 200){
            res.end("Cannot find weather data")
        }
    }
}).listen(4000);