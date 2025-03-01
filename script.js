document.getElementById("validate").addEventListener("click", function () {
  const emailInput = document.getElementById("input").value.trim(); // Trim input
  const apiKey = "ema_live_UxWKero2YSThdPWjbaFvUk6dyQQZmJPdhvxfL12w"; // API Key
  const apiUrl = `https://api.emailvalidation.io/v1/info?apikey=${apiKey}&email=${emailInput}`;
  const resultBlock = document.getElementById("result");

  if (!emailInput) {
    resultBlock.innerHTML =
      "<p style='color:red;'>Please enter a valid email!</p>";
    return;
  }

  showLoading();

  fetch(apiUrl)
    .then((response) => {
      console.log("API Request Sent");
      return response.json();
    })
    .then((data) => {
      console.log("API Response Received", data);
      resultBlock.innerHTML = ""; // Clear previous results
      addResult(data);
    })
    .catch((error) => {
      console.error("Error fetching API:", error);
      resultBlock.innerHTML = "<p style='color:red;'>Something Went Wrong!</p>";
    });
});

function showLoading() {
  const resultBlock = document.getElementById("result");
  resultBlock.innerHTML = `<img src="images/loading.svg" alt="Loading..." width="50px" />`;
}

function addResult(data) {
  const resultBlock = document.getElementById("result");
  resultBlock.innerHTML = ""; // Clear result block

  // Create table if it doesn't exist
  let table = document.createElement("table");
  table.setAttribute("id", "resultTable");
  table.style.color = "white";

  let thead = document.createElement("thead");
  table.appendChild(thead);

  let tbody = document.createElement("tbody");

  if (typeof data === "string") {
    resultBlock.innerHTML = `<p>${data}</p>`;
    return;
  }

  for (let key in data) {
    let row = document.createElement("tr");

    let keyCell = document.createElement("td");
    keyCell.innerHTML = `<b>${key}</b>`;

    let valueCell = document.createElement("td");
    valueCell.innerText = data[key];

    row.appendChild(keyCell);
    row.appendChild(valueCell);
    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  resultBlock.appendChild(table);
}

const lines = [
  "Welcome To Email Validator !",
  "Enter Your Email Below To Validate",
];
const textElement = document.getElementById("typed_Word");
let speed = 100;
let textIndex = 0;
let charIndex = 0;

function typeWriter() {
  if (charIndex < lines[textIndex].length) {
    textElement.innerHTML += lines[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, speed);
  } else {
    setTimeout(erase, 1000);
  }
}

function erase() {
  if (textElement.innerHTML.length > 0) {
    textElement.innerHTML = textElement.innerHTML.substring(
      0,
      textElement.innerHTML.length - 1
    );
    setTimeout(erase, 50);
  } else {
    textIndex = (textIndex + 1) % lines.length;
    charIndex = 0;
    setTimeout(typeWriter, 500);
  }
}

window.onload = typeWriter;
