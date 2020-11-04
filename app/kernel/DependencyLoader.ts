export default class DependencyLoader {

    static load<T extends Object>(cls: new () => T) {
        // @todo make dependency injection
        return new cls();
    }
}
