/**
 * Created by joshi on 2017-03-11.
 */

function validateSignInCredentials() {
    var form = $("#frmSignIn");

    form.validate({
        rules: {
            txtEmail: {
                required: true
            },
            txtPassword: {
                required: true
            }
        },
        messages: {
            txtEmail: {
                required: "User name is required"
            },
            txtPassword: {
                required: "Password is required"
            }
        }
    });
    return form.valid();
}

function validateSignUpCredentials() {
    var form = $("#frmSignUp");

    form.validate({
        rules: {
            txtNewEmail: {
                required: true,
                emailcheck: true
            },
            txtNewPassword: {
                required: true
            },
            txtPasswordConfirm: {
                required: true,
                equalTo: "#txtNewPassword"
            },
            txtFirstName: {
                required: true,
                rangelength: [2, 20]
            },
            txtLastName: {
                required: true,
                rangelength: [2, 20]
            },
            txtPhone: {
                required: true,
                phoneCheck: true
            }
        },
        messages: {
            txtNewEmail: {
                required: "Email is required",
                emailcheck: "Valid email is required"
            },
            txtNewPassword: {
                required: "Password is required"
            },
            txtPasswordConfirm: {
                required: "Confirm Password is required",
                equalTo: "Passwords do not match"
            },
            txtFirstName: {
                required: "First name is required",
                rangelength: "First name should be between 2-20 letters"
            },
            txtLastName: {
                required: "Last name is required",
                rangelength: "Last name should be between 2-20 letters"
            },
            txtPhone: {
                required: "Phone is required",
                phoneCheck: "Valid phone is required"
            }
        }
    });
    return form.valid();
}

function isFrmUpdateUserValid() {
    var form = $("#frmUpdateUser");

    form.validate({
        rules: {
            txtProfilePassword: {
                required: true
            },
            txtProfilePasswordConfirm: {
                required: true,
                equalTo: "#txtProfilePassword"
            },
            txtProfileFirstName: {
                required: true,
                rangelength: [2, 20]
            },
            txtProfileLastName: {
                required: true,
                rangelength: [2, 20]
            },
            txtProfilePhone: {
                required: true,
                phoneCheck: true
            }
        },
        messages: {
            txtProfilePassword: {
                required: "Password is required"
            },
            txtProfilePasswordConfirm: {
                required: "Confirm Password is required",
                equalTo: "Passwords do not match"
            },
            txtProfileFirstName: {
                required: "First name is required",
                rangelength: "First name should be between 2-20 letters"
            },
            txtProfileLastName: {
                required: "Last name is required",
                rangelength: "Last name should be between 2-20 letters"
            },
            txtProfilePhone: {
                required: "Phone is required",
                phoneCheck: "Valid phone is required"
            }
        }
    });
    return form.valid();
}

function isFrmAddPostingValid() {

    $("#frmAddPosting").validate({
        rules: {
            txtTitle: {
                required: true,
                rangelength: [1, 50]
            },
            txtDescription: {
                required: true,
                rangelength: [1, 255]
            },
            txtAddress: {
                required: true,
                rangelength: [1, 100]
            },
            txtCity: {
                required: true,
                rangelength: [1, 50]
            },
            txtPostalCode: {
                required: true,
                rangelength: [1, 6],
                isValidPostalCode : true
            },
            txtPrice: {
                required: true,
                range: [0.00, 9999.00]
            }
        },
        messages: {
            txtTitle: {
                required: "Title is required.",
                rangelength: "Title must not have more than 100 characters."
            },
            txtDescription: {
                required: "Description is required.",
                rangelength: "Description must not have more than 255 characters."
            },
            txtAddress: {
                required: "Address is required.",
                range: "Address must not have more than 100 characters."
            },
            txtCity: {
                required: "City is required.",
                rangelength: "City must not have more than 50 characters."
            },
            txtPostalCode: {
                required: "Postal Code is required.",
                rangelength: "Postal Code must not have more than 6 characters.",
                isValidPostalCode: "Postal code must be in a valid canadian postal code format."
            },
            txtPrice: {
                required: "Price is required.",
                range: "Price must be between 0.00 and 9999.99"
            }
        }
    });

    return $("#frmAddPosting").valid();
}

jQuery.validator.addMethod("emailcheck", function (value, element) {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return this.optional(element) || regex.test(value);
}, "Valid email is required");

jQuery.validator.addMethod("phoneCheck", function (value, element) {
    var regex = /\D*([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D*/;
    return this.optional(element) || regex.test(value);
}, "Valid phone is required");

jQuery.validator.addMethod("isValidPostalCode", function (value) {
    return /^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[ABCEGHJKLMNPRSTVWXYZ]{1} *\d{1}[ABCEGHJKLMNPRSTVWXYZ]{1}\d{1}$/.test(value);
}, "Postal code must be in a valid canadian postal code format.");