const passwordCharacters = [
  "~",
  1,
  "!",
  2,
  "@",
  3,
  "#",
  ">",
  4,
  "$",
  5,
  "%",
  "^",
  6,
  7,
  "&",
  8,
  "*",
  9,
  0,
  "+",
  "?",
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "<",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  "M",
  "N",
  "B",
  "V",
  "C",
  "X",
  "Z",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "P",
  "O",
  "I",
  "U",
  "Y",
  "T",
  "R",
  "E",
  "W",
  "Q",
];

const passwordForm = document.querySelector(".password-form");
const passwordsContainer = document.querySelector(".passwords__container");
let passwords = [];
const modeToggle = document.getElementById("mode-toggle");

const randomNumber = () => {
  return Math.floor(Math.random() * passwordCharacters.length);
};

const generatePassword = (length) => {
  if (!length) length = 12;
  console.log(length, "length");
  let password = "";
  for (let i = 0; i < length; i++) {
    const n = randomNumber();
    password += passwordCharacters[n];
  }

  if (passwords.length === 4) {
    passwords = [];
  }

  passwords.push(password);
};

const runPasswordFunction = (length) => {
  for (let i = 0; i < 4; i++) {
    generatePassword(length);
  }
};

const renderPasswords = () => {
  let html = "";
  for (let p of passwords) {
    html += `
      <div class="password__wrapper">
        <input class="password password-text-input" type="text" value="${p}">
        <span class="btn btn-copy">copy</span>
      </div>
    `;
  }
  passwordsContainer.innerHTML = html;
};
const form = document.querySelector("form");
const input = document.querySelector('input[type="number"]');

form.addEventListener("submit", (e) => {
  e.preventDefault();
  runPasswordFunction(Number(input.value));
  renderPasswords(passwords);
});

passwordsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-copy")) {
    const input = e.target.previousElementSibling;
    navigator.clipboard.writeText(input.value);
    const copyBtns = document.querySelectorAll(".btn-copy");
    for (let b of copyBtns) {
      b.textContent = "copy";
    }
    e.target.textContent = "copied!";
  }
});

modeToggle.addEventListener("click", (e) => {
  const toggle = e.target.closest("div");
  const body = document.querySelector("body");
  if (toggle.id === "mode-toggle") {
    if (toggle.classList.contains("page-dark")) {
      body.setAttribute("id", "light-mode");
      toggle.classList.remove("page-dark");
      toggle.classList.add("page-light");
    } else if (toggle.classList.contains("page-light")) {
      body.setAttribute("id", "dark-mode");
      toggle.classList.add("page-dark");
      toggle.classList.remove("page-light");
    }
  }
});
