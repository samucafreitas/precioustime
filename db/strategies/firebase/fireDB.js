const firebase = require("firebase");
const ICrud = require("../interfaces/InterfaceCrud");

class FireDB extends ICrud {
    constructor(connection) {
        super();
        this._connection = connection;
    }

    connect() {
        const config = {
            apiKey: "AIzaSyBlXpKwtYx6g915UGHZnhcwaw_lmANRaww",
            authDomain: "precioustime.firebaseapp.com",
            databaseURL: "https://precioustime.firebaseio.com",
            projectId: "precioustime",
            storageBucket: "precioustime.appspot.com",
            messagingSenderId: "293403936313"
        };

        firebase.initializeApp(config);
        return firebase;
    }

    create(item) {
        return item + " criado!";
    }
}

exports.module = FireDB;