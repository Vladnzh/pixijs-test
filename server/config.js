const host = process.env.NODE_APP_HOST || 'localhost';
const port = process.env.NODE_APP_PORT || 3002;


const network = {
	host,
	port,
};

const development = {
	isProduction: false,
	host: 'localhost',
	port: 3002,
};

const production = {
	isProduction: true,
	// host: '',
	port: 3001,
};

const environment = process.env.NODE_ENV === 'production' ? production : development;

const common = {
	app: {
		title: 'Portal',
	},
};

const config = { ...network, ...common, ...environment };

const temp = {
	...config,
	url: `http://${config.host}:${config.port}`,
};

module.exports = temp;
