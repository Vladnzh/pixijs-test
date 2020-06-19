const express = require('express')
const app = express()

const host = process.env.NODE_APP_HOST || 'localhost';
const port = process.env.NODE_APP_PORT || 3002;

app.get('/', function (req, res) {
	res.send('hello world')
})

app.listen(port, err => {
	if (err) {
		console.error(err);
	}
	console.info(
		`==> Open http://${host}:${port} in a browser to view the app.`,
	);
});
