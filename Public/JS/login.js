//Splashtext
$.get('../Assets/splashtext.txt', function(txt) {
  var lines = txt.split("\n");
  var randLineNum = Math.floor(Math.random() * lines.length);

  document.getElementById("subtitle").innerHTML = lines[randLineNum];
});

//Main
window.onload = function() {
  $("#login-form").addClass("loaded");
  $("#login-form").removeClass("unloaded");
};

function showPassword() {
  var passwordInput = document.getElementById("pass");
  var passwordButton = document.getElementById("show-password");

  if (passwordInput.type == "password") {
    passwordInput.type = "";
    passwordButton.innerHTML = "HIDE";
  } else {
    passwordInput.type = "password";
    passwordButton.innerHTML = "SHOW";
  }
}

function error(err) {
  var clone = $("#error-template").clone();
  var message = clone.find("h1");

  clone.insertBefore("div.error:first");
  clone.removeAttr("id");
  clone.removeClass("template");

  message.text("Error: " + err);

  //setTimeout(function(){
  clone.css("opacity", "1");
  // }, 100);

  setTimeout(function() {
    clone.css("opacity", "0");

    setTimeout(function() {
      clone.remove();
    }, 500);
  }, 3000);
}

function resetForm() {

  var loginform = document.getElementById("login-form");
  var loginformcontainer = document.getElementById("login-form-container");
  var loading = document.getElementById("loading");
  var title = document.getElementById("title");
  var subtitle = document.getElementById("subtitle");

  loginform.style.height = "364px";
  loginform.style.top = "calc(50% - 200px)";

  loading.style.opacity = "0";
  title.style.opacity = "1";
  subtitle.style.opacity = "1";

  setTimeout(function() {
    loginformcontainer.style.opacity = "1";
  }, 400);
}

function login() {

  var loginform = document.getElementById("login-form");
  var loginformcontainer = document.getElementById("login-form-container");
  var loading = document.getElementById("loading");
  var title = document.getElementById("title");
  var subtitle = document.getElementById("subtitle");

  var usernameInput = document.getElementById("user");
  var passwordInput = document.getElementById("pass");

  loginform.style.height = "140px";
  loginform.style.top = "calc(50% - 70px)";

  loginformcontainer.style.opacity = "0";
  loading.style.opacity = "1";
  title.style.opacity = "0";
  subtitle.style.opacity = "0";

  setTimeout(function() {

    sendMessageWithResponse("login", { "username": usernameInput.value, "password": passwordInput.value }, 5000, function(success, data) {
      if (success) {

        localStorage.username = usernameInput.value;

        window.location = "https://Sociallyy.devkrxspl.repl.co";
      } else {
        error(data);
      }

      resetForm();
    })

  }, 1500);
}

// Main
if (localStorage.username) {
  window.location = "https://Sociallyy.devkrxspl.repl.co";
} 