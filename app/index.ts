import express from 'express';
import apiRouter from "./router/api";
import ControllersProvider from './providers/ControllersProvider';
import DependencyLoader from './kernel/DependencyLoader';
// Create a new express app instance
const app: express.Application = express();

const providersToLoad = [
  ControllersProvider,
];

export const providerInstancesMap: Map<string, any> = new Map;

for(const provider of providersToLoad) {
  const providerInstance = DependencyLoader.load(ControllersProvider);
  providerInstancesMap.set(provider.name, providerInstance);
}

apiRouter(app);
export default app;
