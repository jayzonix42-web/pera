const coinsInput = document.getElementById("coins");
const agree = document.getElementById("agree");
const exchangeBtn = document.getElementById("exchangeBtn");
const coinSummary = document.getElementById("coinSummary");
const usdSummary = document.getElementById("usdSummary");
const modal = document.getElementById("modal");

const RATE = 605 / 50000; // display-only demo conversion rate

function money(value) {
  return "$" + Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
function coins(value) {
  return Number(value || 0).toLocaleString("en-US");
}
function update() {
  const amount = Math.max(0, Number(coinsInput.value || 0));
  coinSummary.textContent = coins(amount);
  usdSummary.textContent = money(amount * RATE);
  exchangeBtn.disabled = !(amount > 0 && agree.checked);
}
document.querySelectorAll(".preset").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".preset").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
    coinsInput.value = btn.dataset.coins;
    update();
  });
});
coinsInput.addEventListener("input", update);
agree.addEventListener("change", update);

exchangeBtn.addEventListener("click", () => {
  const amount = Number(coinsInput.value || 0);
  if (!amount || !agree.checked) return;

  document.getElementById("modalCoins").textContent = coins(amount);
  document.getElementById("modalCoins2").textContent = coins(amount) + " Coins";
  document.getElementById("modalUsd").textContent = money(amount * RATE);
  document.getElementById("modalTime").textContent = new Date().toLocaleString();
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
});
document.getElementById("closeModal").addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
});
modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
  }
});
update();
