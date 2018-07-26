import koaBody from 'koa-body';


const createCommonMiddlewares = () => [
  koaBody(),
];


export default createCommonMiddlewares;
