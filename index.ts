import ngrok from 'ngrok';
import express, { Locals, RequestHandler } from 'express';
import { ErrorRequestHandler } from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const port = 3000;

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	console.error(err.mesage);
	res.status(500).send('Something broke!');
};

const connect = async () => {
	try {
		const listener = await ngrok.connect({
			addr: port,
			authtoken_from_env: true,
		});

		console.log(`Ingress established at ${listener}`);
	} catch (err) {
		console.error(err);
	}
};

const startServer = async () => { 
	try {
		// await connect();

		app.use(express.static(path.join(__dirname, "dist")));
		app.use(bodyParser.json());
		app.use(errorHandler);

		app.get("/", (req, res) => {
			res.sendFile(path.join(__dirname, "./index.html"));
		});
		app.get("/basic", (req, res) => {
			res.sendFile(path.join(__dirname, "./analyze-this.gif"));
		});
		app.get("/oauth", (req, res) => {
			res.sendFile(path.join(__dirname, "./have-a-good-day.gif"));
		});

		app.listen(port, () => console.log(`Listening on port ${port}!`));
	} catch (err) {
		console.error(err);
		throw new Error("Issue starting server");
	}
}

startServer();
