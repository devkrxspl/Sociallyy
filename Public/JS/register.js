//Functions
function error(err) {
  var clone = $("#error-template").clone();
  var message = clone.find("h1");

  clone.insertBefore("div.error:first");
  clone.removeAttr("id");
  clone.removeClass("template");

  message.text(err);
  clone.css("opacity", "1");

  setTimeout(function() {
    clone.css("opacity", "0");

    setTimeout(function() {
      clone.remove();
    }, 500);
  }, 3000);
}

function resetForm() {

  var registerform = document.getElementById("register-form");
  var registerformcontainer = document.getElementById("register-form-container");
  var loading = document.getElementById("loading");
  var title = document.getElementById("title");
  var subtitle = document.getElementById("subtitle");

  registerform.style.height = "420";
  registerform.style.top = "calc(50% - 210px)";

  loading.style.opacity = "0";
  title.style.opacity = "1";
  subtitle.style.opacity = "1";

  setTimeout(function() {
    registerformcontainer.style.opacity = "1";
  }, 400);
}

function register() {

  var registerform = document.getElementById("register-form");
  var registerformcontainer = document.getElementById("register-form-container");
  var loading = document.getElementById("loading");
  var title = document.getElementById("title");
  var subtitle = document.getElementById("subtitle");

  var user = document.getElementById("user").value;
  var pass = document.getElementById("pass").value;
  var confpass = document.getElementById("conf-pass").value;

  var valid = true;
  var errMessage = "";

  registerform.style.height = "140px";
  registerform.style.top = "calc(50% - 70px)";

  registerformcontainer.style.opacity = "0";
  loading.style.opacity = "1";
  title.style.opacity = "0";
  subtitle.style.opacity = "0";

  if (user == "" || pass == "" || confpass == "") {
    valid = false;
    errMessage = "Error: Please fill out all fields.";
  } else if (pass != confpass) {
    valid = false;
    errMessage = "Error: Passwords do not match."
  }

  setTimeout(function() {

    if (!valid) {
      error(errMessage);
    }

    if (valid) {
      sendMessageWithResponse("register", { "username": user, "password": pass }, 5000, function(success, data) {
        if (success) {
          localStorage.username = user;

          window.location = "https://Sociallyy.devkrxspl.repl.co";
        } else {
          error(data);
        }

        resetForm();
      })
    } else {
      resetForm();
    }

  }, 1500);
}

// Main
if (localStorage.username) {
  window.location = "https://Sociallyy.devkrxspl.repl.co";
} 