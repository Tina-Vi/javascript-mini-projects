'use strict';

let text = [
    "Добро пожаловать!",
    "Это бегущая строка с эффектом невидимой руки",
    "Чем-то напоминает дневник Реддла из Гарри Поттера, правда?",
    "Или момент из фильма 'Приведение', когда невидимый главный герой печатает на клавиатуре своего друга-предателя, чтобы напугать его",
    "Надеюсь, Вам понравилась реализация данного эффекта",
    "Спасибо за внимание!"
];

let line = 0;
let letter = 0;
let result = ' ';
let p = document.querySelector('p');

function randomTime(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function typeIn() {
   if (letter < text[line].length) {
    result += text[line][letter];
    p.innerText = result + '|';
    letter++;
    setTimeout(typeIn, randomTime(250));
   } else {
    if (line == text.length - 1) {
        p.innerText = result;
    } else {
        setTimeout(typeOut, 1000);
    }
   }
}

function typeOut() {
    if (letter > 0) {
        result = result.slice(0, -1);
        p.innerText = result + '|';
        letter--;
        setTimeout(typeOut, 30);
    } else {
        line++;
        if (line < text.length) {
            setTimeout(typeIn, randomTime(250));
        }
    }
}

typeIn();