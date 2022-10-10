if (localStorage.username) {
  document.getElementById("title").innerHTML = "Logged in as " + localStorage.username;
} else {
  window.location = "https://Sociallyy.devkrxspl.repl.co/login";
}