let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {
  const list = document.getElementById("list");
  const balance = document.getElementById("balance");
  const income = document.getElementById("income");
  const expense = document.getElementById("expense");

  list.innerHTML = "";

  let total = 0;
  let inc = 0;
  let exp = 0;

  transactions.forEach((t, index) => {
    const li = document.createElement("li");
    li.classList.add(t.amount > 0 ? "plus" : "minus");

    li.innerHTML = `
      ${t.text} <span>₹${t.amount}</span>
      <button onclick="deleteTransaction(${index})">❌</button>
    `;

    list.appendChild(li);

    total += t.amount;
    if (t.amount > 0) inc += t.amount;
    else exp += t.amount;
  });

  balance.innerText = total;
  income.innerText = inc;
  expense.innerText = Math.abs(exp);

  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {
  const text = document.getElementById("text").value;
  const amount = +document.getElementById("amount").value;

  if (text === "" || amount === 0) {
    alert("Please enter valid data");
    return;
  }

  transactions.push({ text, amount });

  document.getElementById("text").value = "";
  document.getElementById("amount").value = "";

  updateUI();
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateUI();
}

updateUI();
