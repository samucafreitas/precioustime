class NotImplementedException extends Error {
    constructor() {
        super("Not Implemented Exception");
    }
}

class ICrud {
    read(query) {
        throw new NotImplementedException();
    }

    create(item) {
        throw new NotImplementedException();
    }

    update(id, item) {
        throw new NotImplementedException();
    }

    delete(id) {
        throw new NotImplementedException();
    }
}


class ContextStrategy extends ICrud {
    constructor(strategy) {
        super();
        return this._database = strategy;
    }

    read(query) {
        return this._database.read(query);
    }

    create(item) {
        return this._database.create(item);
    }

    update(id, item) {
        return this._database.update(id, item);
    }

    delete(id) {
        return this._database.delete(id);
    }
}

const ContextFireDB = new ContextStrategy(new FireDB());
ContextFireDB.create("Item 1");