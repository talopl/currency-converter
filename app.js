const options = document.querySelectorAll(".options");
let currencyRates;

const EXCHANGE_RATES_URL = "https://api.exchangeratesapi.io/latest";

fetch(EXCHANGE_RATES_URL)
  .then((res) => res.json())
  .then((data) => {
    currencyRates = data.rates;
    currencyRates[data["base"]] = 1;
    const currencies = Object.keys(currencyRates);
    options.forEach((node) => {
      currencies.forEach((currency) => {
        const option = document.createElement("option");
        option.value = currency;
        option.appendChild(document.createTextNode(currency));
        node.appendChild(option);
      });
    });
  });

document.getElementById("conversionForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const fromCurrencyMoney = parseFloat(
    document.getElementById("from-conversion").value,
  );
  if (isNaN(fromCurrencyMoney) || fromCurrencyMoney == null) return;
  const fromCurrency = document.getElementById("fromOptions").value;
  const toCurrency = document.getElementById("toOptions").value;
  const display = document.getElementById("to-conversion");
  display.value = convertCurrency(fromCurrency, toCurrency, fromCurrencyMoney);
});

const convertCurrency = (from, to, quantity) => {
  if (isNaN(quantity) || quantity == null) return;
  return currencyRates[to] / currencyRates[from] * quantity;
};

