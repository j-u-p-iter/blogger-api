import { dic } from 'dic';
import { runApp } from './runApp';

beforeAll(async () => {
  await runApp();
})


afterEach(() => {
  dic.resolve('database').clearDB();
});

afterAll(async () => {
  await Promise.all([
    dic.resolve('httpServer').close(),
    dic.resolve('database').close(),
    dic.resolve('redisProvider').quit(),
  ]);
});
