let data;
window.onload = checkUser();
function goToHome() {
  location.href = "../Home/index.html";
}

function goToUser() {
  location.href = "../User/index.html";
}

async function search() {
  user = localStorage.getItem("user");
  if (user == "") {
    alert("User cannot be empty!");
    return goToHome();
  }
  let array = [];
  const response = await fetch("https://api.github.com/users/" + user)
    .then((response) => response.json())
    .then((data) => {
      if (data.message == "Not Found") {
        alert("User not found!");
        return goToHome();
      }
      for (i in data) {
        array[i] = data[i];
      }
    })
    .finally(() => {
      addDataToHTML(array);
    })
    .catch((error) => console.error(error));
  console.log("fechou");
}

function saveUser() {
  let user = document.getElementById("user_search").value;
  localStorage.setItem("user", user);
}

function checkUser() {
  if (window.location.href.indexOf("User") > -1) return search();
  return;
}

function addRow(div_id, data_value) {
  const div = document.createElement("div");
  div.innerHTML =
    `
    <p id=` +
    div_id +
    `> ` +
    data_value +
    `</p>
  `;
  document.getElementById(div_id).appendChild(div);
}
function addImage(data_value) {
  const div = document.createElement("div");
  div.innerHTML =
    `
    <img id="profilePicture" src=` +
    data_value +
    ` alt="user-image"/>
  `;
  document.getElementById("picture-box").appendChild(div);
}

function addDataToHTML(data) {
  for (var i in data) {
    if (document.getElementById(i)) {
      if (data[i] !== null) addRow(i, data[i]);
    }
  }
  addImage(data.avatar_url);
  addRepos();
}

async function addRepos() {
  user = localStorage.getItem("user");
  const response = await fetch(
    "https://api.github.com/users/" + user + "/repos"
  )
    .then((response) => response.json())
    .then((data) => {
      for (var i in data) {
        addSingleRepository(data[i]);
      }
    })
    .finally(() => {})
    .catch((error) => console.error(error));
}

function addSingleRepository(data) {
  console.log(data);

  const div = document.createElement("div");
  div.setAttribute("class", "singleRepo");
  div.innerHTML =
    `
    <div id="repository-name">
          <dt><a href=` +
    data.html_url +
    `>` +
    data.name +
    `</a></dt>
        </div>
        <div id="language">
          <dd>` +
    data.language +
    `</dd>
        </div>
  `;
  document.getElementById("list").appendChild(div);
}
