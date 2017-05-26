var isCamReady = false;

// This method will validate the login credentials and show postings Page
function btnSignIn_click() {
    validateSignIn();
}

// This method will show the sign Up Form
function btnShowSignUpPage_click() {
    window.location.href = ("#signUpPage");
}

// This method will validate sign Up form and show Sign In page
function btnSignUp_click() {
    validateSignUp();
}

function addPostingPage_pageshow() {
    window.location.href = ("#addPostingPage");
    addLocation();
}

function btnAdd_click() {
    addPosting();
}

function txtAddress_change() {
    addLocation();
}

function btnTakePic_click() {
    if (isCamReady) {
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA
        };
        if ($(this).prop("id") === "btnTakePic1") {
            navigator.camera.getPicture(function (picURI) {
                $("#imgPic1").prop("src", picURI);
                // alert(picURI);
            }, function (message) {
                alert(message)
            }, options);
        } else if ($(this).prop("id") === "btnTakePic2") {
            navigator.camera.getPicture(function (picURI) {
                $("#imgPic2").prop("src", picURI);
            }, function (message) {
                alert(message)
            }, options);
        } else {
            navigator.camera.getPicture(function (picURI) {
                $("#imgPic3").prop("src", picURI);
            }, function (message) {
                alert(message)
            }, options);
        }
    }
}

function btnFindPic_click() {
    if (isCamReady) {
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        };
        if ($(this).prop("id") === "btnFindPic1") {
            navigator.camera.getPicture(function (picURI) {
                $("#imgPic1").prop("src",picURI);
            }, function (message) {
                alert(message)
            }, options);
        } else if ($(this).prop("id") === "btnFindPic2") {
            navigator.camera.getPicture(function (picURI) {
                $("#imgPic2").prop("src", picURI);
            }, function (message) {
                alert(message)
            }, options);
        } else {
            navigator.camera.getPicture(function (picURI) {
                $("#imgPic3").prop("src", picURI);
            }, function (message) {
                alert(message)
            }, options);
        }
    }
}

function postingsPage_pageshow() {
    getAllPostings();
}

function pagePostingDetails_pageshow() {
    getPosting();
}

function profilePage_pageshow() {
    getProfile();
}

function btnUpdateUser_click() {
    updateProfile();
}

function yourPostingsPage_pageshow() {
    getYourPostings();
}

function init() {
    $("#btnSignIn").on("click", btnSignIn_click);
    $("#btnShowSignUpPage").on("click", btnShowSignUpPage_click);
    $("#btnSignUp").on("click", btnSignUp_click);
    $("#nav-panel").panel();
    // $("#addPostingPage").on("pageshow", addPostingPage_pageshow);
    $("#btnAdd").on("click", btnAdd_click);
    $("#txtAddress").on("change", txtAddress_change);
    $("#txtCity").on("change", txtAddress_change);
    $("#txtPostalCode").on("change", txtAddress_change);
    $(document).on("deviceready", function () {
        isCamReady = !isCamReady;
    });
    $("#yourPostingsPage").on("pageshow", yourPostingsPage_pageshow);
    $("#btnTakePic1").on("click", btnTakePic_click);
    $("#btnFindPic1").on("click", btnFindPic_click);
    $("#btnTakePic2").on("click", btnTakePic_click);
    $("#btnFindPic2").on("click", btnFindPic_click);
    $("#btnTakePic3").on("click", btnTakePic_click);
    $("#btnFindPic3").on("click", btnFindPic_click);
    $("#postingsPage").on("pageshow", postingsPage_pageshow);
    $("#postingDetailsPage").on("pageshow", pagePostingDetails_pageshow);
    $("#profilePage").on("pageshow", profilePage_pageshow);
    $("#btnUpdateUser").on("click", btnUpdateUser_click);
    $("#btnAddPosting").on("click", addPostingPage_pageshow);
}

$(document).ready(function () {
    init();
    initDB();
});

function initDB() {
    // alert("creating database");
    try {
        DB.CreateDatabase();
        // alert("created finally database");
        if (db) {
            // alert("creating tables");
            DB.CreateTables();
            // alert("tables created");
        }
    } catch (e) {
        alert("Error: (Fatal) error in initDB, cannot proceed");
    }
}