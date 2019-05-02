import { dic } from 'dic';
import { runApp } from './runApp';

beforeAll(async () => {
  await runApp();
})

afterAll(() => {
  dic.resolve('httpServer').close();
  dic.resolve('database').close();
  dic.resolve('redisProvider').quit();
});
