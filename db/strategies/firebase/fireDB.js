const firebase = require("firebase");
const ICrud = require("../interfaces/InterfaceCrud");

const mapTodos = (items) => {
    return items.map(item => item);
}

class FireDB extends ICrud {
    constructor(connection) {
        super();
        this._connection = connection;
    }

    static connect() {
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
    
    read() {
        var todos = this._connection.database()
                    .ref('todos')
                    .once('value')
                    .then((snap) => snap.val());
        return todos;
    }

    create(items) {
        var todosRef = this._connection.database().ref();
        var now = new Date();
        var actualDate = ('0' + (now.getDate())).slice(-2) + ('0' + (now.getMonth() + 1)).slice(-2) + now.getFullYear();

        // Computed property names (ES2015)
        var tree = {
            [actualDate] : {
                todos: {
                    ...mapTodos(items)
                }
            }
        };

        todosRef.update(tree);

        return items;
    }
}

module.exports = FireDB;