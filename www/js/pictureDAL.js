var Picture = {
    Insert: function (options) {
        function txFunction(tx) {
            tx.executeSql("INSERT INTO picture(title, description, dataURL, postingId) " +
                "VALUES(?, ?, ?, ?);", options, null, errorHandler);
        }

        function insertPostingSuccess() {
            // alert("Picture inserted!");
        }

        db.transaction(txFunction, errorHandler, insertPostingSuccess);
    },
    SelectAll: function (options, setPictureList) {
        function txFunction(tx) {
            tx.executeSql("SELECT * FROM picture WHERE postingId = ?;", options, setPictureList, errorHandler);
        }

        function selectAllPostingsSuccess() {
            //alert("Pictures selected!");
        }

        db.transaction(txFunction, errorHandler, selectAllPostingsSuccess);
    },
    Select: function (options, setPictureList) {
        function txFunction(tx) {
            tx.executeSql("SELECT * FROM picture where pictureId = ?;", options, setPictureList, errorHandler);
        }

        function selectAllPostingsSuccess() {
            //alert("Pictures selected!");
        }

        db.transaction(txFunction, errorHandler, selectAllPostingsSuccess);
    }
};