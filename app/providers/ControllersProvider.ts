import Controller from '../controllers/Controller';
import fs from 'fs';
import path from 'path';

const {readdirSync, readFileSync} = fs;

export default class ControllersProvider {
    constructorMap: Map<string, new () => Controller>;

    constructor() {
        this.constructorMap = new Map();
        const controllersDir = path.resolve(__dirname, '../controllers');
        this.addControllersToMapFromFolder(controllersDir);
    }

    private addControllersToMapFromFolder(folder: string) {
        try {
            const fileNames = readdirSync(folder);
            for(const fileName of fileNames) {
                const filePath = path.resolve(folder, fileName);
                if(this.isFile(fileName)) {
                    const controller = require(filePath).default;
                    this.constructorMap.set(controller.name, controller);
                }
                else {
                    this.addControllersToMapFromFolder(filePath);
                }
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    private isFile(fileName: string) {
        return /\.\w+$/.test(fileName);
    }

    getControllerMethod(cls: string, method: string) {
        if(!this.constructorMap.has(cls))
            throw new Error(`Controller ${cls} not found`);
        const controller: Controller = new (this.constructorMap.get(cls) as new () => Controller);
        // @todo Переделать
        // @ts-ignore
        if(typeof controller[method] !== "function")
            throw new Error(`Controller ${cls} has no ${method} method`);
        // @ts-ignore
        return controller[method];
    }
}
