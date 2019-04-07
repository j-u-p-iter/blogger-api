import bodyParser from 'body-parser';

const createMiddlewares = () => [bodyParser.json()];


export default createMiddlewares;
