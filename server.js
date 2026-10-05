const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/api/classdata", (req, res) => {

    const data =
        JSON.parse(
            fs.readFileSync(
                "./public/classdata.json",
                "utf8"
            )
        );

    res.json(data);
});

app.post("/api/save", (req, res) => {

    fs.writeFileSync(
        "./public/classdata.json",
        JSON.stringify(req.body,null,2)
    );

    res.json({
        success:true
    });

});

app.listen(
    process.env.PORT || 3000
);
