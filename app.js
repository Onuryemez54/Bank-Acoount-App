const depositForm = document.querySelector("#deposit-form");
const withdrawForm = document.querySelector("#withdraw-form");
const deposit = document.querySelector("#deposit");
const withdraw = document.querySelector("#withdraw");
const historyBtn = document.querySelector(".btn.history");
const balance = document.querySelector("#balance");
const historyContainer = document.querySelector(".history-container");
const container = document.querySelector(".container");

depositForm.addEventListener("submit", addBalance);
withdrawForm.addEventListener("submit", removeBalance);

balance.textContent = 0;
let balanceHistory = [];

function addBalance(e) {
  e.preventDefault();
  const depositInput = Number(deposit.value);

  if (depositInput <= 0) {
    showAlert("Please enter a positive number", "alertDiv");
  } else {
    balance.textContent = Number(balance.textContent) + depositInput;
    const depositHistory = {
      Type: "Deposit",
      Amount: depositInput,
      Date: new Date().toLocaleString(),
    };
    balanceHistory = [...balanceHistory, depositHistory];
  }
  deposit.value = "";
}

function removeBalance(e) {
  e.preventDefault();
  const withdrawInput = Number(withdraw.value);

  if (withdrawInput <= 0) {
    showAlert("Please enter a positive number", "alertDiv");
  } else if (withdrawInput > Number(balance.textContent)) {
    showAlert("insufficient funds", "alertDiv2");
  } else {
    balance.textContent = Number(balance.textContent) - withdrawInput;
    const withdrawHistory = {
      Type: "Withdraw",
      Amount: withdrawInput,
      Date: new Date().toLocaleString(),
    };
    balanceHistory = [...balanceHistory, withdrawHistory];
  }
  withdraw.value = "";
}

function showAlert(message, className) {
  const alertDiv = document.createElement("div");
  alertDiv.classList.add(className);
  const alertText = document.createTextNode(message);

  alertDiv.appendChild(alertText);
  container.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.remove();
  }, 1000);
}

historyBtn.addEventListener("click", showHistory);

function showHistory() {
  historyContainer.classList.toggle("active");

  historyContainer.innerHTML = "";

  const headerHistory = document.createElement("h2");
  headerHistory.textContent = "Account History";
  headerHistory.classList.add("history-header");
  historyContainer.appendChild(headerHistory);

  balanceHistory.map((balanceItem) => {
    const lists = document.createElement("ul");
    for (const key in balanceItem) {
      const listItem = document.createElement("li");
      listItem.textContent = `${key} : ${balanceItem[key]}`;
      lists.appendChild(listItem);
      if (balanceItem[key] === "Deposit") {
        listItem.style.color = "#35ff0c";
      } else if (balanceItem[key] === "Withdraw") {
        listItem.style.color = "#c01a00";
      }
    }
    historyContainer.appendChild(lists);
  });
}
