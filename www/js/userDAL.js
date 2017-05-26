var User = {
    Insert: function (options) {
        function txFunction(tx) {

            var sql = "INSERT INTO user(email,password,firstName," +
                "lastName,phone)" +
                " VALUES(?,?,?,?,?);";

            function successInsert() {
                // alert(options[0]);
                console.info("Success: Insert Successful");
            }
            tx.executeSql(sql, options, successInsert, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    Select: function (options, setProfile) {
        function txFunction(tx) {
            var sql = "SELECT * FROM user WHERE email=?;";
            tx.executeSql(sql, options, setProfile, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    SelectAll: function (successSelectAll) {
        function txFunction(tx) {
            var sql = "SELECT * FROM user;";
            var options = [];
            tx.executeSql(sql, options, successSelectAll, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    Update: function (options) {
        function txFunction(tx) {
            var sql = "UPDATE user " +
                "SET password = ?, firstName = ?, lastName = ?, phone = ?" +
                "WHERE email=?;";

            function successUpdate() {
                alert("User updated successfully");
                window.location.href = ("#profilePage");
            }
            tx.executeSql(sql, options, successUpdate, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }


};