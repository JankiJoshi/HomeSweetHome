function validateSignIn() {
    if (validateSignInCredentials()) {
        User.SelectAll(successSelectAll);
        function successSelectAll(tx, results) {
            var userName = $("#txtEmail").val();
            var password = $("#txtPassword").val();
            for (var i = 0; i < results.rows.length; i++) {
                var tmpEmail = results.rows.item(i).email;
                var tmpPassword = results.rows.item(i).password;
                if (tmpEmail === userName && tmpPassword === password) {

                    localStorage.setItem("user", results.rows.item(i).email);
                    window.location.href = ("#postingsPage");
                    return false;
                }
            }
            alert("Email or password is incorrect");
        }
    }
}

function validateSignUp() {
    if (validateSignUpCredentials()) {
        var email = $("#txtNewEmail").val();
        var password = $("#txtNewPassword").val();
        var fName = $("#txtFirstName").val();
        var lName = $("#txtLastName").val();
        var phone = SanitizePhone($("#txtPhone").val());
        var options = [email, password, fName, lName, phone];
        User.Insert(options);
        window.location.href = ("#signInPage");
    }
}

function getProfile() {
    function setProfile(tx, records) {
        $("#txtProfileEmail").val(records.rows.item(0).email);
        $("#txtProfilePassword").val(records.rows.item(0).password);
        $("#txtProfileFirstName").val(records.rows.item(0).firstName);
        $("#txtProfileLastName").val(records.rows.item(0).lastName);
        $("#txtProfilePhone").val(StringifyPhone(records.rows.item(0).phone));
    }

    User.Select([localStorage.getItem("user")], setProfile);
}

function addPosting() {
    if (isFrmAddPostingValid()) {
        if(!$("#imgPic1").prop("src").includes("img/noImg.jpg")||
            !$("#imgPic2").prop("src").includes("img/noImg.jpg")||
            !$("#imgPic3").prop("src").includes("img/noImg.jpg")){
            var options = [localStorage.getItem("user"),
                $("#txtTitle").val(),
                $("#txtDescription").val(),
                $("#txtAddress").val(),
                $("#txtCity").val(),
                $("#txtPostalCode").val(),
                lat,
                lon,
                $("#txtPrice").val(),
                new Date()
            ];

            function addPicture(tx, records) {
                if (!$("#imgPic1").prop("src").includes("img/noImg.jpg")) {
                    options = [$("#txtPic1Title").val(),
                        $("#txtPic1Desc").val(),
                        $("#imgPic1").prop("src"),
                        records.insertId
                    ];
                    Picture.Insert(options);
                }
                if (!$("#imgPic2").prop("src").includes("img/noImg.jpg")) {
                    options = [$("#txtPic2Title").val(),
                        $("#txtPic2Desc").val(),
                        $("#imgPic2").prop("src"),
                        records.insertId
                    ];
                    Picture.Insert(options);
                }
                if (!$("#imgPic3").prop("src").includes("img/noImg.jpg")) {
                    options = [$("#txtPic3Title").val(),
                        $("#txtPic3Desc").val(),
                        $("#imgPic3").prop("src"),
                        records.insertId
                    ];
                    Picture.Insert(options);
                }
                window.location.href = ("#postingsPage");
            }
            Posting.Insert(options, addPicture);
        }
        else{
            alert("At least one picture must be selected");
        }
    }
}

function updateProfile() {
    if (isFrmUpdateUserValid()) {
        var options = [$("#txtProfilePassword").val(),
            $("#txtProfileFirstName").val(),
            $("#txtProfileLastName").val(),
            SanitizePhone($("#txtProfilePhone").val()),
            localStorage.getItem("user")
        ];
        // alert(options[4]);
        User.Update(options);
    }
}

function getAllPostings() {
    function setPostingList(tx, records) {
        var postingListHTML = "";
        var temp = 0;
        for (var i = 0; i < records.rows.length; i++) {
            if (records.rows.item(i).postingId !== temp) {
                postingListHTML += "<li><a href='#postingDetailsPage' data-row-id=" + records.rows.item(i).postingId +
                    "><img src='" + records.rows.item(i).dataURL + "' alt='Picture'><h6>" + records.rows.item(i).title +
                    "</h6><p>$" + records.rows.item(i).price + "</p>" +
                    "<p>" + StringifyDate(records.rows.item(i).postingDate) + "</p></a></li>";
                temp = records.rows.item(i).postingId;
            }
        }
        $("#postingList").html(postingListHTML).listview("refresh");
        $("#postingList a").on("click", function () {
            localStorage.setItem("id", $(this).attr("data-row-id"));
        });
    }

    Posting.SelectAll(setPostingList);
}

function getYourPostings() {
    function setPostingList(tx, records) {
        var postingListHTML = "";
        var temp = 0;
        for (var i = 0; i < records.rows.length; i++) {
            if (records.rows.item(i).postingId !== temp) {
                postingListHTML += "<li><a href='#postingDetailsPage' data-row-id=" + records.rows.item(i).postingId +
                    "><img src='" + records.rows.item(i).dataURL + "' alt='Picture'><h6>" + records.rows.item(i).title +
                    "</h6><p>$" + records.rows.item(i).price + "</p>" +
                    "<p>" + StringifyDate(records.rows.item(i).postingDate) + "</p></a></li>";
                temp = records.rows.item(i).postingId;
            }
        }
        $("#youPostingList").html(postingListHTML).listview("refresh");
        $("#youPostingList a").on("click", function () {
            localStorage.setItem("id", $(this).attr("data-row-id"));
        });
    }

    Posting.SelectYours([localStorage.getItem("user")], setPostingList);
}

function getPosting() {
    function setPosting(tx, records) {
        function setPosting(tx, results) {
            $("#h1Title").html(records.rows.item(0).title);
            var divPicturesHTML = "";
            if (results.rows.length === 1) {
                divPicturesHTML = "<img src='" + results.rows.item(0).dataURL + "' alt='" +
                    results.rows.item(0).title + "' width='10%' height='10%'>";
            } else if (results.rows.length === 2) {
                $("#divPictures").prop("class", "ui-grid-a");
                divPicturesHTML = "<div class='ui-block-a'><img src='" + results.rows.item(0).dataURL + "' alt='" +
                    results.rows.item(0).title + "' width='5%' height='50%'></div>";
                divPicturesHTML += "<div class='ui-block-b'><img src='" + results.rows.item(1).dataURL + "' alt='" +
                    results.rows.item(1).title + "' width='50%' height='50%'></div>";
            } else if (results.rows.length === 3) {
                $("#divPictures").prop("class", "ui-grid-b");
                divPicturesHTML = "<div class='ui-block-a'><img src='" + results.rows.item(0).dataURL + "' alt='" +
                    results.rows.item(0).title + "' width='50%' height='50%'></div>";
                divPicturesHTML += "<div class='ui-block-b'><img src='" + results.rows.item(1).dataURL + "' alt='" +
                    results.rows.item(1).title + "' width='50%' height='50%'></div>";
                divPicturesHTML += "<div class='ui-block-c'><img src='" + results.rows.item(2).dataURL + "' alt='" +
                    results.rows.item(2).title + "' width='50%' height='50%'></div>";
            }
            $("#divPictures").html(divPicturesHTML);
            $("#h3Email").html(records.rows.item(0).email);
            $("#h3Email").prop("href", "mailto:" + records.rows.item(0).email);
            $("#h3Phone").html(StringifyPhone(records.rows.item(0).phone));
            $("#h3Phone").prop("href", "tel:+1" + records.rows.item(0).phone);
            $("#tdDate").html(StringifyDate(records.rows.item(0).postingDate));
            $("#tdPrice").html("$" + records.rows.item(0).price);
            $("#tdAddress").html(records.rows.item(0).address + ", " + records.rows.item(0).city + ", " +
                records.rows.item(0).postalCode);
            showPosition(records.rows.item(0).latitude, records.rows.item(0).longitude);
            $("#pDescription").html(records.rows.item(0).description);
        }

        Picture.SelectAll([records.rows.item(0).postingId], setPosting);
    }

    Posting.Select([localStorage.getItem("id")], setPosting);
}

function SanitizePhone(value) {
    var result = "";
    for (var i = 0; i < value.length; i++) {
        if (!isNaN(parseInt(value.charAt(i)))) {
            result += value.charAt(i);
        }
    }
    return result;
}

function StringifyDate(value) {
    var date = new Date(value);
    return ("0" + date.getDate()).slice(-2) + "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
        date.getFullYear();
}

function StringifyPhone(value) {
    return "(" + value.substr(0, 3) + ") " + value.substring(3, 6) + "-" + value.substring(6);
}