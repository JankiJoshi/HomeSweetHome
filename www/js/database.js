var db;

function errorHandler(tx, error) {
    // alert("SQL error: " + tx + " (" + error.code + ") -- " + error.message);
}

function successTransaction() {
    console.info("Success: Transaction is successful");
}

var DB = {
    CreateDatabase: function () {
        var shortName = "HomeSweetHome";
        var version = "";
        var displayName = "DB for HomeSweetHome App";
        var dbSize = 2 * 1024 * 1024;

        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);

        function dbCreateSuccess() {
            console.info("Success: Database creation successful");
        }
    },
    CreateTables: function () {
        function txFunction(tx) {
            var options = [];

            var sql;

            // sql = "DROP TABLE IF EXISTS User";
            // tx.executeSql(sql, options, successCreation, errorHandler);

            sql = "CREATE TABLE IF NOT EXISTS user("
            + "email VARCHAR(50) NOT NULL PRIMARY KEY,"
            + "password VARCHAR(64) NOT NULL,"
            + "firstName VARCHAR(30) NOT NULL,"
            + "lastName VARCHAR(30) NOT NULL,"
            + "phone VARCHAR(10) NOT NULL);";

            tx.executeSql(sql, options, successCreation, errorHandler);

            var sql = "CREATE TABLE IF NOT EXISTS posting(postingId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                "email VARCHAR(50) NOT NULL, title VARCHAR(100) NOT NULL, description VARCHAR(255) NOT NULL, " +
                "address VARCHAR(100) NOT NULL, city VARCHAR(50) NOT NULL, postalCode VARCHAR(6) NOT NULL, " +
                "latitude DECIMAL(17,14) NOT NULL, longitude DECIMAL(17,14) NOT NULL, price DECIMAL(6,2) NOT NULL, " +
                "postingDate DATE NOT NULL, FOREIGN KEY(email) REFERENCES user(email));";
            tx.executeSql(sql, [], createPostingSuccess, errorHandler);

            sql = "CREATE TABLE IF NOT EXISTS picture(pictureId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                "title VARCHAR(100) NOT NULL," +
                "description VARCHAR(255) NOT NULL," +
                "dataURL VARCHAR(64) NOT NULL," +
                "postingId INTEGER NOT NULL," +
                "FOREIGN KEY(postingId) REFERENCES posting(postingId));";
            tx.executeSql(sql, [], createPictureSuccess, errorHandler);

            function createPostingSuccess() {
                // alert("Table posting created successfully.");
            }

            function createPictureSuccess() {
                // alert("Table picture created successfully.");
            }

            var i = 1;
            function successCreation() {
                console.info("Success:" + i);
                i++;
            }
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    DropTables: function () {

        function txFunction(tx) {
            var sql = "DROP TABLE user;";
            //tx.executeSql(sql, [], dropTableSuccess, databaseError);
            sql = "DROP TABLE posting;";
            tx.executeSql(sql, [], dropTableSuccess, errorHandler);
            sql = "DROP TABLE picture;";
            tx.executeSql(sql, [], dropTableSuccess, errorHandler);

            function dropTableSuccess() {
                // alert("Table in database successfully dropped.");
            }
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }

};