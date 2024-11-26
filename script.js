"use strict";

const account1 = {
  owner: "Joey Sayadi",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 111,
  alternatePin: [],
};

const account2 = {
  owner: "Sponge Bob",
  movements: [3800, 4300, -280, -690, -3800, -900, 8500, -30],
  interestRate: 1.5,
  pin: 222,
};

const account3 = {
  owner: "Donald The Duck",
  movements: [200, -150, 640, 800, -20, 50, 500, 480],
  interestRate: 0.7,
  pin: 333,
};

const account4 = {
  owner: "Yvelisse Joy Sayadi",
  movements: [500, 1200, 700, 602, -97],
  interestRate: 1.3,
  pin: 444,
};

const accounts = [account1, account2, account3, account4];

const welcomePara = document.querySelector(".welcome");
const navOutput = document.querySelector(".output");
const loginBtn = document.querySelector(".login__btn");
const mainApp = document.querySelector(".main__app");
const transferMoneyApp = document.querySelector(".operation--transfer");
const btnTransfer = document.querySelector(".transfer");
const requestLoanApp = document.querySelector(".operation--loan");
const btnLoan = document.querySelector(".request__loan");
const changePinApp = document.querySelector(".operation--pin");
const btnChangePin = document.querySelector(".change__pin");
const withdrawMoneyApp = document.querySelector(".operation--withdrawal");
const btnWithdrawMoney = document.querySelector(".cash__withdrawal");
const balanceApp = document.querySelector(".operation--balance");
const btnbalance = document.querySelector(".balance__inquiry");
const balanceLabel = document.querySelector(".balance__label");
const miniHistoryApp = document.querySelector(".miniHistory");
const btnMiniHistory = document.querySelector(".mini__history__transaction");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interet");
const inputLoginUserName = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const containerMovements = document.querySelector(".miniHistory");
const welcomeScreen = document.querySelector(".operation--welcome");
const btnAppTransfer = document.querySelector(".form__btn--transfer");
//const inputTransferTo = document.querySelector(".form__input--to");
//const inputTransferAmount = document.querySelector(".form__input--amount");
const clearInput = document.querySelector(".form__input");
const btnAppLoan = document.querySelector(".form__btn--loan");
const amountRequestLoan = document.querySelector(".form__input--loan-amount");
const changePinAppOperation = document.querySelector(".form__btn--close");
const moneyWithDrawal = document.querySelector(".form__input--withdraw-amount");
const btnWithDrawal = document.querySelector(".form__btn--withdraw");
const logInScreen = document.querySelector(".bigScreen");
const childBigScreen = document.querySelector(".output");
const operation = document.querySelector(".operation");
const clickEnable1 = document.querySelector(".rightPanel");
const clickEnable2 = document.querySelector(".leftPanel");
const sampleWithdraw = document.querySelector("#sample");
const dropDownContent = document.querySelector(".dropdown-content");

welcomeScreen.visibility = "hidden";
navOutput.style.visibility = "visible";
const d8 = document.querySelector(".date");
d8.style.color = "black";
d8.innerHTML = Date();

function activeClick() {
  clickEnable1.style.pointerEvents = "auto";
  clickEnable2.style.pointerEvents = "auto";
}

/*------------------- Display Movements-----------------------*/

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = " ";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
<div class="miniHistory__row">
<div class="miniHistory__type miniHistory__type--${type}">${i + 1} ${type}</div>
<div class="miniHistory__value"> ${mov} </div>
</div>
`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const addSomething = function (acc) {
  acc.school = "ama computer college";
};

let str = "\u20B1";
// displayMovements(account.movements);
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements
    .reduce((acc, mov) => acc + mov, 0)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  labelBalance.textContent = str + ` ${acc.balance} `;
};

const withdrawAmount = function (acc) {
  acc.withdraw = acc.movements.reduce((act, mov) => act + mov, 0);
};

//calcDisplayBalance(account.movements)
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = str + ` ${incomes.toFixed(2)} `;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = str + ` ${Math.abs(out).toFixed(2)} `;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = str + ` ${interest.toFixed(2)} `;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUsernames(accounts);

const updateUI = function (acc) {
  addSomething(acc);
  // Display movements
  displayMovements(acc.movements);

  //Display balance
  calcDisplayBalance(acc);

  //Display summary
  calcDisplaySummary(acc);

  //withdraw money
  withdrawAmount(acc);
};

//event handler
let currentAccount;
/*-------------------------------------------------------------------------*/
/*-------------------------LOGIN Area--------------------*/

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUserName.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //click event will be enabled
    clickEnable1.style.pointerEvents = "auto";
    clickEnable2.style.pointerEvents = "auto";
    welcomeScreen.style.visibility = "visible";
    dropDownContent.style.visibility = "visible";

    // display UI and welcome messages
    welcomePara.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;

    mainApp.style.visibility = "visible";

    // clear input fields
    inputLoginUserName.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    //update UI
    updateUI(currentAccount);
    //date
    d8.innerHTML = Date();
    d8.toString();
  }
});

/*----------------------------- Withdraw Money--------------------------------*/

const resultWithdraw = document.querySelector("#inputData__withdrawal");
const myWithdrawApp = document.querySelectorAll("#withdrawOne, #withdrawTwo");

for (let i = 0; i < myWithdrawApp.length; i++) {
  myWithdrawApp[i].addEventListener("click", function (e) {
    e.preventDefault();

    withdrawMoneyApp.style.visibility = "visible";
    requestLoanApp.style.visibility = "hidden";
    containerMovements.style.visibility = "hidden";
    transferMoneyApp.style.visibility = "hidden";
    balanceApp.style.visibility = "hidden";
    changePinApp.style.visibility = "hidden";
  });
}

function withDrawFunction() {
  const amount = Number(resultWithdraw.value);

  if (amount > 0) {
    currentAccount.movements.push(-amount);
    console.log("You had withdrawn" + amount);

    updateUI(currentAccount);
  }
  moneyWithDrawal.value = "";
}

/*-----------------------------------Loan------------------------------------*/

let myLoanApp = document.querySelectorAll("#loanOne, #loanTwo");
for (let i = 0; i < myLoanApp.length; i++) {
  //btnApploan
  myLoanApp[i].addEventListener("click", function (e) {
    e.preventDefault();

    requestLoanApp.style.visibility = "visible";
    withdrawMoneyApp.style.visibility = "hidden";
    containerMovements.style.visibility = "hidden";
    transferMoneyApp.style.visibility = "hidden";
    balanceApp.style.visibility = "hidden";
    changePinApp.style.visibility = "hidden";
  });
}

function loanFunction() {
  const amount = Number(amountRequestLoan.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // add movement
    currentAccount.movements.push(amount);

    //update UI
    updateUI(currentAccount);
  }
  //clear loan box
  amountRequestLoan.value = "";
}

/*---------------------------------Mini History-------------------------------*/
let myMiniHistoryApp = document.querySelectorAll("#historyOne, #historyTwo");

for (let i = 0; i < myMiniHistoryApp.length; i++) {
  myMiniHistoryApp[i].addEventListener("click", function (e) {
    e.preventDefault();

    containerMovements.style.visibility = "visible";
    withdrawMoneyApp.style.visibility = "hidden";
    requestLoanApp.style.visibility = "hidden";
    transferMoneyApp.style.visibility = "hidden";
    balanceApp.style.visibility = "hidden";
    changePinApp.style.visibility = "hidden";
  });
}

/*----------------------------------Transfer Money-----------------------------*/

const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");

const myTransferApp = document.querySelectorAll("#transferOne, #transferTwo");
for (let i = 0; i < myTransferApp.length; i++) {
  myTransferApp[i].addEventListener("click", function (e) {
    e.preventDefault();
    transferMoneyApp.style.visibility = "visible";
    withdrawMoneyApp.style.visibility = "hidden";
    requestLoanApp.style.visibility = "hidden";
    containerMovements.style.visibility = "hidden";
    balanceApp.style.visibility = "hidden";
    changePinApp.style.visibility = "hidden";
  });
}

function transferFunction() {
  //   const amount = Number(inputTransferAmount.value);
  //   const receiverAcc = accounts.find(
  //     (acc) => acc.username === inputTransferTo.value
  //   );
  //   inputTransferAmount.value = inputTransferTo.value = "";
  //  // shows the amount and the receiver account
  //   console.log( amount , receiverAcc);
  //   if (
  //     amount > 0 &&
  //     receiverAcc &&
  //     currentAccount.balance >= amount &&
  //     receiverAcc?.username !== currentAccount.username
  //   )
  //   {
  //     console.log("valid transfer");
  //     //Doing the transfer
  //     currentAccount.movements.push(-amount);
  //     receiverAcc.movements.push(amount);
  //     //update UI
  //     updateUI(currentAccount);
  //      }
  const amount = +inputTransferAmount.value;
  const receiverPerson = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    receiverPerson &&
    receiverPerson?.username !== currentAccount.username
  ) {
    alert("Welcome!!!");
    console.log(receiverPerson);
    currentAccount.movements.push(-amount);
    receiverPerson.movements.push(amount);
    updateUI(currentAccount);
  } else {
    console.log("please check IF condition");
  }
  inputTransferAmount.value = inputTransferTo.value = "";
}

/*-----------------------------Balance Inquiry------------------------------*/

const newDate = document.querySelector(".dateBalance");
newDate.innerHTML = Date();

const myBalanceApp = document.querySelectorAll("#balanceOne, #balanceTwo");
for (let i = 0; i < myBalanceApp.length; i++) {
  myBalanceApp[i].addEventListener("click", function (e) {
    e.preventDefault();

    balanceApp.style.visibility = "visible";
    withdrawMoneyApp.style.visibility = "hidden";
    requestLoanApp.style.visibility = "hidden";
    containerMovements.style.visibility = "hidden";
    transferMoneyApp.style.visibility = "visible";
    changePinApp.style.visibility = "hidden";

    updateUI(currentAccount);

    newDate.style.color = "greenyellow";
  });
}

/*----------------------------------------PIN Change-------------------------------*/

const inputOldPin = document.querySelector(".form__input--user");
const inputNewPin = document.querySelector(".form__input--pin");

const myPinApp = document.querySelectorAll("#pinOne, #pinTwo");
for (let i = 0; i < myPinApp.length; i++) {
  myPinApp[i].addEventListener("click", function (e) {
    e.preventDefault();

    changePinApp.style.visibility = "visible";
    withdrawMoneyApp.style.visibility = "hidden";
    requestLoanApp.style.visibility = "hidden";
    containerMovements.style.visibility = "hidden";
    transferMoneyApp.style.visibility = "visible";
    balanceApp.style.visibility = "hidden";
  });
}

let newPINCODE;
const changePinFunction = function (acc) {
  acc.newPinCode = newPINCODE;
};

function changePin() {
  const newPin = Number(inputNewPin.value);

  if (currentAccount.pin === Number(inputOldPin.value)) {
    console.log("current owner is " + currentAccount.owner);
    console.log("current PIN number of the owner " + currentAccount.pin);
    console.log("checking username is " + currentAccount.username);
    console.log("the new pin number is " + newPin);

    currentAccount.alternatePin.push(newPin);
    newPINCODE = Number(inputNewPin.value);
  } else {
    alert("Opps wrong input");
  }
  updateUI(currentAccount);
  changePinFunction(currentAccount);
  console.log(currentAccount);
  inputOldPin.value = inputNewPin.value = "";
}

/*-------------------------Login-----------------------*/

logInScreen.addEventListener("click", function (e) {
  e.preventDefault();

  childBigScreen.innerHTML = "Please Login First!";
  childBigScreen.style.fontSize = "45px";
  childBigScreen.style.fontWeight = "bolder";
  childBigScreen.style.color = "red";
});

///////////////////////////////////////////////////////////////
/*--------------in this area is for exercise purpose only----------------------*/

// $('#withdraw').add('#withdraw2').on('click', ()=> {alert ('Hello Joey')})

// let num = 123456789;
// console.log(num.toLocaleString());

// const one = document.getElementById('withdrawOne');
// const two = document.getElementById('withdraw1');

// $('#withdrawOne').add('#withdraw1').on('click', function(e){
//   alert('Hello joey');
// })

// if('#withdrawOne' && '#withdrawTwo'){
//   addEventListener('click', function(e){
//     this.alert("hello withdrawal")
//   })
// }

// let elements = document.querySelectorAll(".a, .b");
// for (let i = 0; i < elements.length; i++){
//   elements[i].addEventListener('click', function(e){
//     alert("hello joey");
//   })
// }
