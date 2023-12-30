const express = require("express");

const app = express();

app.use(express.json());

app.post("/health-checkup", function (req, res) {
	const kidney = req.body.kidney;
	const kidneyLength = kidney.length;

	res.send("you have " + kidneyLength + "kidneys");
});

//using global catches
app.use(function (err, req, res, next) {
	res.json({
		msg: "sorry something in wrong with the server",
	});
});

app.listen(3001);
