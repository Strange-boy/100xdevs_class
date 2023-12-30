const express = require("express");
const app = express(); //create an instance of the app

//this acts like mini database where the changes happens globally
let users = [
	{
		name: "John",
		kidney: [
			{
				healthy: true,
			},
			{
				healthy: false,
			},
		],
	},
];

//in order to resolve the issue in the post request , we need to use a middleware
app.use(express.json());

//total kidneys of particular user
//count of total healthy and unhealthy kidney
//it is mainly use to get the data from the user
//query parameter is quite famous here
app.get("/", function (req, res) {
	const johnKidneys = users[0].kidney;
	const totalKidneys = johnKidneys.length;
	let healthyKidneys = johnKidneys.filter((kidney) => kidney.healthy);
	const unHealthyKidneys = totalKidneys - healthyKidneys.length;

	res.json({
		totalKidneys,
		healthyKidneys: healthyKidneys.length,
		unHealthyKidneys,
	});
});

//in order to write a post request for users to post the healthy and non healthy kidney
app.post("/", function (request, response) {
	const isHealthy = request.body.isHealthy;
	users[0].kidney.push({
		healthy: isHealthy,
	});

	response.json({
		msg: "Done!",
	});
});

//in order to write a put request => it would update all the request
app.put("/", function (request, response) {
	const totalKidneys = users[0].kidney.length;
	const unHealthyKidneys = users[0].kidney.filter(
		(Kidney) => Kidney.healthy === false
	);

	console.log("length:", unHealthyKidneys.length);

	if (unHealthyKidneys.length > 0) {
		for (let idx = 0; idx < totalKidneys; idx += 1) {
			users[0].kidney[idx].healthy = true;
		}
		//finally we need a send a empty json object
		response.json({
			msg: "Damaged kidneys replaced with healthy kidneys",
		});
	} else {
		response.status(411).json({
			msg: "you already have healthy kidney!! Go give your money to some poor guy!!",
		});
	}
});

//in order to delete request => it would remove all the unhealthy kidneys
app.delete("/", function (request, response) {
	const totalKidney = users[0].kidney.length;
	const healthyKidney = users[0].kidney.filter(
		(Kidney) => Kidney.healthy === true
	);

	const unHealthyKidneys = totalKidney - healthyKidney.length;

	if (unHealthyKidneys) {
		users[0].kidney = healthyKidney;
		response.json({
			msg: "Removed the infected kidneys!!",
		});
	} else {
		response.status(411).json({
			msg: "You have no unhealthy kidney!! So get the fuck out!!",
		});
	}
});

//in order to listen the app
app.listen(3001, function () {
	console.log("The Server is listening!!");
});
