"use strict";

let frames = document.querySelectorAll("iframe");
let buttons = document.getElementsByClassName("add");
let removeBtn = document.getElementById("remove");

let dialog = document.querySelector("dialog");
let closeX = document.querySelector(".closeX");

function addFrame(frameNumber) {
  let url = prompt("Введите URL-адрес сайта для фрейма " + frameNumber);

  if (url) {
    for (let frame of frames) {
      if (frame.dataset.frameNumber === String(frameNumber)) {
        frame.src = url;
      }
    }
  }
}

for (let btn of buttons) {
  let frameNumber = btn.dataset.frameNumber;
  btn.addEventListener("click", function () {
    addFrame(frameNumber);
  });
}

removeBtn.addEventListener("click", function () {
  for (let frame of frames) {
    frame.src = "about:blank";
  }
});

function modalOpen() {
  dialog.showModal();
  document.body.classList.add("scroll-lock");
}

function closeModal() {
  dialog.close();
  document.body.classList.remove("scroll-lock");
}

dialog.addEventListener("click", function (event) {
  if (event.target === dialog) {
    dialog.close();
  }
});

dialog.addEventListener("close", function () {
  document.body.classList.remove("scroll-lock");
});

closeX.addEventListener("click", closeModal);

setTimeout(modalOpen, 2000);
