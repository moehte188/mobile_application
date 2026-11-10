"use strict";

let currentAudio = null;
let omikuji_sound1 = new Audio("./sound/omikuji_sound1.mp3");
let omikuji_sound2 = new Audio("./sound/omikuji_sound2.mp3");
let omikuji_sound3 = new Audio("./sound/omikuji_sound3.mp3");
let omikuji_sound4 = new Audio("./sound/omikuji_sound4.mp3");
let omikuji_sound5 = new Audio("./sound/omikuji_sound5.mp3");
let omikuji_sound6 = new Audio("./sound/omikuji_sound6.mp3");
let resultSound = [
  omikuji_sound1,
  omikuji_sound2,
  omikuji_sound3,
  omikuji_sound4,
  omikuji_sound5,
  omikuji_sound6,
];
window.addEventListener(
  "DOMContentLoaded",
  function () {
    //
    $("header").textillate({
      loop: false,
      minDisplayTime: 9000,
      initialDelay: 1000,
      autoStart: true,
      in: {
        effect: "fadeInLeftBig",
        delayScale: 1.5,
        delay: 50,
        sync: false,
        shuffle: true,
      },
    });

    $(function () {
      ScrollReveal().reveal("#btn1", { duration: 9000 });
    });

    this.setTimeout(function () {
      let popMessage = "こんにちは！おみくじゲームやる?";
      this.window.alert(popMessage);
    }, "3000");
  },
  false
);

const btn1 = document.getElementById("btn1");
const omikujiText = document.getElementById("omikujiText");
btn1.addEventListener(
  "click",
  function () {
    let resultText = [
      "happiest!!!",
      "very very happy!!",
      "very happy!!",
      "happy",
      "unhappy",
      "sad",
    ];

    let resultColor = [
      "#ff0000",
      "#c71585",
      "#ff1493",
      "#ff69ba",
      "#ff8c00",
      "#1e90ff",
    ];
    let resultFontSize = ["80px", "70px", "60px", "50px", "40px", "30px"];
    let resultMaxSpeed = [20, 15, 10, 5, 5, 5];
    let resultMinSpeed = [2, 3, 1, 1, 2, 1];
    let resultMaxSize = [35, 30, 20, 10, 20, 30];
    let resultMinSize = [20, 15, 10, 8, 10, 15];
    let resultImage = [
      "./img/happy-face.png",
      "./img/hearts.png",
      "./img/smiling-face.png",
      "./img/star.png",
      "./img/emoji.png",
      "./img/sad-face.png",
    ];
    let n = Math.floor(Math.random() * resultText.length);
    omikujiText.textContent = resultText[n];
    omikujiText.style.color = resultColor[n];
    omikujiText.style.fontSize = resultFontSize[n];
    soundCountrol(resultSound[n]);
    // switch (n) {
    //   case 0:
    //     omikujiText.textContent = "Very Happy!!!";
    //     omikujiText.style.color = "red";
    //     omikujiText.style.fontSize = "38px";
    //     break;
    //   case 1:
    //     omikujiText.textContent = "Happy!!!";
    //     omikujiText.style.color = "yellow";
    //     omikujiText.style.fontSize = "30px";
    //     break;
    //   case 2:
    //     omikujiText.textContent = "Unhappy!!!";
    //     omikujiText.style.color = "black";
    //     omikujiText.style.fontSize = "20px";
    //     break;
    //}

    $(document).snowfall("clear");

    $(document).ready(function () {
      $(document).snowfall({
        maxSpeed: resultMaxSpeed[n],
        minSpeed: resultMinSpeed[n],
        maxSize: resultMaxSize[n],
        minSize: resultMinSize[n],
        image: resultImage[n],
      });
    });
  },
  false
);
function soundCountrol(w_sound) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  w_sound.play();
  currentAudio = w_sound;
}
