const express = require("express");
const app = express();
const port = 3000;

app.get("/", function (req, res) {
	res.send("<b>Johan bambozlled</b>");
});

//create a todo app that lets users store todo on the server
//try to create an http server from scratch
app.listen(port, function () {
	console.log(`Example app listening on port ${port}`);
});
