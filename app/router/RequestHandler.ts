import express, { IRouterMatcher } from 'express';
import {providerInstancesMap} from '../index';
import ControllersProvider from '../providers/ControllersProvider';

export default class RequestHandler {
    app: express.Application;

    constructor(app: express.Application) {
        this.app = app;
    }

    get(route: string, controller : string) {
        const [controllerClassName, controllerMethodName] = controller.split('@');
        const controllersProvider: ControllersProvider = providerInstancesMap.get('ControllersProvider');
        //@todo разобраться с типом
        const controllerMethod: any = controllersProvider.getControllerMethod(controllerClassName, controllerMethodName);
        this.app.get(route, controllerMethod);
    }
}
