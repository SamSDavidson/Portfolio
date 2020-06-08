class User {
  constructor(username, level, email, password) {
    this.username = username;
    this.level = level;
    this.email = email;
    this.password = password;
  }
}
let articles;

let PsArticles;
let XbArticles;
let PCArticles;
let MobArticles;

let users = [];
let loggedIn;
let currentUser = new User;

function AppendArticle(imgLink, cardTitle, cardText, cardLink, device) {
  let cardTemplate = [
    `<div class="card">
    <img class="card-img-top" src=${imgLink} alt="Card image cap" />
    <div class="card-body">
      <h5 class="card-title">${cardTitle}</h5>
      <p class="card-text">
        ${cardText}
      </p>
      <a href="./articles/${device}/${cardLink}.html"<button type="button" class="btn btn-info">Read More</button></a>
    </div>
  </div>`
  ];
  $(".card-columns").append(cardTemplate);
}

let url = "https://api.myjson.com/bins/lu97c";

fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
})
  .then(response => response.json())
  .then(resp => {
    PsArticles = resp.playstation;
    XbArticles = resp.xbox;
    PCArticles = resp.pc;
    MobArticles = resp.mobile;

    if (deviceType == "playstation")
      return PsArticles.map(function (article) {
        AppendArticle(article.articleImg, article.title, article.content, article.url, "playstation");
      });
    else if (deviceType == "xbox")
      return XbArticles.map(function (article) {
        AppendArticle(article.articleImg, article.title, article.content, article.url, "xbox");
      });
    else if (deviceType == "mobile")
      return MobArticles.map(function (article) {
        AppendArticle(article.articleImg, article.title, article.content, article.url, "mobile");
      });
    else if (deviceType == "pc")
      return PCArticles.map(function (article) {
        AppendArticle(article.articleImg, article.title, article.content, article.url, "pc");
      });
  })
  .catch(error => {
    alert(error);
  });

// LOGIN PAGE
if (deviceType == "login") {
  //Handle login

  let loginBtn = document.getElementById("login-Btn");
  users = JSON.parse(localStorage.getItem("userList"));
  userList = [];
  console.log(users);

  let inputPw;
  let inputUname;

  function getValues() {
    inputUname = document.getElementById("inputUsername").value;
    inputPw = document.getElementById("inputPassword").value;
  }

  function checkLogin(username, password) {
    for (let i = 0; i <= users.length; i++) {
      if (users[i].username == inputUname) {
        console.log("username found");
        index = i;
        if (users[i].password == inputPw) {
          console.log("password correct")
          currentUser = users[i];
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
          console.log(currentUser);
          return true;
        } else {
          console.log("incorrect password");
        }
      } else {
        console.log("Username does not exist");
      }
    }
  }


  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let index = -1;
    getValues();
    loggedIn = checkLogin(inputUname, inputPw);
  });
  console.log(loggedIn);
}

// PROFILE PAGE
if (deviceType == "profile") {
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  function createNode(element) {
    return document.createElement(element);
  }

  function append(parent, el) {
    return parent.appendChild(el);
  }
  console.log(currentUser);

  if (currentUser != null) {
    document.getElementById("username").innerHTML = currentUser.username;
    document.getElementById("current-level").innerHTML = "Level: " + currentUser.level;
    document.getElementById("currently-playing").innerHTML = currentUser.currentGame;

  }
  //retrieve game data
  fetch("https://api.rawg.io/api/games", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(resp => {
      let games = resp.results;
      return games.map(function (game) {
        let li = createNode("li");
        li.className = "dropdown-item";
        li.innerHTML = game.name;
        li.addEventListener("click", function (e) {
          document.getElementById("currently-playing").innerHTML = li.innerHTML;
          currentUser.currentGame = li.innerHTML;
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
        })
        append(document.querySelector(".dropdown-menu"), li);
      });
    })
    .catch(err => {
      console.log("Error: " + err);
    });
}
// SIGN UP FORM//
if (deviceType == "signUp") {
  users = JSON.parse(localStorage.getItem("userList"));
  //handle sign up
  let signupBtn = document.getElementById("signup-btn");

  signupBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let newUser = new User();
    let password = document.getElementById("inputPassword").value;
    let passwordCheck = document.getElementById("passwordConfirm").value;
    let username = document.getElementById("inputUsername").value;
    let email = document.getElementById("inputEmail").value;
    if (password != passwordCheck) {
      alert("Passwords do not match");
    } else if (password.length == "") {
      alert("No password entered");
    } else if (email.length == "") {
      alert("No Email entered");
    } else if (username.length == "") {
      alert("No Username entered");
    } else {
      newUser.email = email;
      newUser.username = username;
      newUser.password = passwordCheck;
      newUser.level = Math.floor(Math.random() * 100)
      users.push(newUser);
      localStorage.setItem("userList", JSON.stringify(users));
      console.log(users);
    }
  });
}