const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (let code in countryList) {
        let newOption = document.createElement("option");

        newOption.innerText = code;
        newOption.value = code;

        if (select.name === "from" && code === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && code === "INR") {
            newOption.selected = true;
        }

        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

const updateExchangeRate = async () => {
    let amountInput = document.querySelector(".amount input");
    let amount = amountInput.value;

    if (amount === "" || amount < 1) {
        amount = 1;
        amountInput.value = "1";
    }

    let fromCurr = document.querySelector("select[name='from']").value;
    let toCurr = document.querySelector("select[name='to']").value;

    const URL = `https://2024-03-06.currency-api.pages.dev/v1/currencies/${fromCurr.toLowerCase()}.json`;

    try {
        let response = await fetch(URL);
        let data = await response.json();

        let rate = data[fromCurr.toLowerCase()][toCurr.toLowerCase()];

        let finalAmount = amount * rate;

        msg.innerText =
            `${amount} ${fromCurr} = ${finalAmount.toFixed(2)} ${toCurr}`;
    } catch (error) {
        console.log(error);
        msg.innerText = "Failed to fetch exchange rate.";
    }
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});