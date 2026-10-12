"use strict";

let question = document.querySelector(".question");
let yesBtn = document.querySelector(".yes-btn");
let noBtn = document.querySelector(".no-btn");
let toShop = document.querySelector(".small");
let firstQ = document.querySelector(".first-question");
let secondQ = document.querySelector(".second-question");

function openFirstModalAndLockScroll() {
  firstQ.showModal();
  document.body.classList.add("scroll-lock");
}

function returnScroll() {
  if (!firstQ.open && !secondQ.open) {
    document.body.classList.remove("scroll-lock");
  }
}

function closeFirstModalAndReturnSctoll() {
  firstQ.close();
  returnScroll();
}

function closeSecondModalAndReturnSctoll() {
  secondQ.close();
  returnScroll();
}

firstQ.addEventListener("close", returnScroll);
secondQ.addEventListener("close", returnScroll);

firstQ.addEventListener("click", function (event) {
  if (event.target === firstQ) {
    closeFirstModalAndReturnSctoll();
  }
});

secondQ.addEventListener("click", function (event) {
  if (event.target === secondQ) {
    closeSecondModalAndReturnSctoll();
  }
});

question.addEventListener("click", openFirstModalAndLockScroll);
noBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  closeFirstModalAndReturnSctoll();
});
yesBtn.addEventListener("click", function () {
  firstQ.close();
  secondQ.showModal();
});
toShop.addEventListener("click", (event) => {
  event.stopPropagation();
  closeSecondModalAndReturnSctoll();
});
