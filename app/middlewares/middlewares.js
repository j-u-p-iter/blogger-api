import createCommonMiddlewares from './commonMiddlewares';


const createMiddlewares = () => [
  ...createCommonMiddlewares(),
];


export default createMiddlewares;
