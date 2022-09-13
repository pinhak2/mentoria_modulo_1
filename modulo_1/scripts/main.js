let data;
function goToHome() {
  location.href = "../Home/index.html";
}

function goToUser() {
  location.href = "../User/index.html";
}

async function search() {
  let inputElement = document.querySelector(`input`);

  await fetch("https://api.github.com/users/" + inputElement.value)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.login);
    })
    .catch((error) => console.error(error));

  console.log("fechou");
}
