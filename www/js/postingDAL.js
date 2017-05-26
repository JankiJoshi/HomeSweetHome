var Posting = {
    Insert: function (options, addPicture) {
        function txFunction(tx) {
            tx.executeSql("INSERT INTO posting(email, title, description, address, city, postalCode, latitude, " +
                "longitude, price, postingDate) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", options, addPicture, errorHandler);
        }

        function insertPostingSuccess() {
            // alert("Posting inserted!");
        }

        db.transaction(txFunction, errorHandler, insertPostingSuccess);
    },
    SelectAll: function (setPostingList) {
        function txFunction(tx) {
            tx.executeSql("SELECT picture.dataURL, posting.postingId, posting.title, posting.price, posting.postingDate " +
                "FROM posting JOIN picture WHERE posting.postingId = picture.postingId " +
                "ORDER BY postingDate desc, pictureId;", [], setPostingList, errorHandler);
        }

        function selectAllPostingsSuccess() {
            // alert("Postings selected!");
        }

        db.transaction(txFunction, errorHandler, selectAllPostingsSuccess);
    },
    SelectYours: function (options, setPostingList) {
        function txFunction(tx) {
            tx.executeSql("SELECT picture.dataURL, posting.postingId, posting.title, posting.price, posting.postingDate " +
                "FROM posting JOIN picture WHERE posting.postingId = picture.postingId " +
                "and posting.email = ? ORDER BY postingDate desc, pictureId;", options, setPostingList, errorHandler);
        }

        function selectAllPostingsSuccess() {
            // alert("Postings selected!");
        }

        db.transaction(txFunction, errorHandler, selectAllPostingsSuccess);
    },
    Select: function (options, setPosting) {
        function txFunction(tx) {
            tx.executeSql("SELECT * FROM posting, user WHERE posting.email = user.email and postingId = ?;", options,
                setPosting, errorHandler);
        }

        function selectPostingSuccess() {
            //alert("Posting selected!");
        }

        db.transaction(txFunction, errorHandler, selectPostingSuccess);
    }
};