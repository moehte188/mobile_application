"use strict";

let currentAudio = null;
let soundStart = new Audio("./sound/start.mp3");
let soundStop1 = new Audio("./sound/stop1.mp3");
let soundStop2 = new Audio("./sound/stop2.mp3");

let soundReset = new Audio("./sound/reset.mp3");
let resultSound = [soundStart, soundStop1, soundStop2, soundReset];
const timer = document.getElementById("timer");
const btn_start = document.getElementById("btn_start");
const btn_stop = document.getElementById("btn_stop");
const btn_reset = document.getElementById("btn_reset");

let startTime; // Startボタンクリック時の時刻
let timeoutId; // ID
let stopTime = 0; // Stopまでの経過時間
let targetSec = 10; // 目標秒数（初期値）
const targetText = document.getElementById("target-text");

// 目標秒数をダイアログで入力
function askTarget() {
  const input = prompt("何秒を目標にしますか", targetSec);
  if (input === null) return; // キャンセルなら今の値のまま

  const n = Number(input);
  if (!isNaN(n) && n > 0) {
    targetSec = n;
  } else {
    alert("0より大きい数字を入力してください");
  }
  targetText.textContent = targetSec;
}

askTarget(); // ページを開いたときに聞く
// ボタンを"初期"状態とする
setButtonStateInitial();

////////////////////////
// Startボタンクリック
////////////////////////
btn_start.addEventListener(
  "click",
  function () {
    // ボタンをタイマー"動作中"状態とする
    soundStart.currentTime = 0;
    soundStart.play();
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  },
  false
);

////////////////////////
// Stopボタンクリック
////////////////////////
btn_stop.addEventListener(
  "click",
  function () {
    setButtonStateStopped();
    clearTimeout(timeoutId);
    stopTime = Date.now() - startTime;

    if (stopTime >= targetSec * 1000 && stopTime < (targetSec + 1) * 1000) {
      soundStop2.currentTime = 0;
      soundStop2.play();
      document.body.style.backgroundImage = "url('img/fireworks.gif')";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center center";
      document.body.style.backgroundColor = "rgba(0,0,0,0)";
    } else {
      soundStop1.currentTime = 0;
      soundStop1.play();
    }
  },
  false
);

////////////////////////
// Resetボタンクリック
////////////////////////
btn_reset.addEventListener("click", function () {
  // ボタンを"初期"状態とする
  document.body.style.backgroundImage = "";
  document.body.style.backgroundColor = "rgba(38, 160, 176, 0.6)";
  soundReset.currentTime = 0;
  soundReset.play();
  setButtonStateInitial();
  timer.textContent = "00:00.000";
  stopTime = 0;
  stopTime = 0;
  askTarget(); // ← この1行を追加
});

function countUp() {
  const d = new Date(Date.now() - startTime + stopTime);
  /* padStart()で２桁固定表示とする */
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  /* 描画 */
  timer.textContent = `${m}:${s}.${ms}`;

  timeoutId = setTimeout(() => {
    //再帰呼び出し
    countUp();
  }, 10);
}

// 初期 または Reset後
function setButtonStateInitial() {
  btn_start.classList.remove("js-inactive");
  btn_stop.classList.add("js-inactive");
  btn_reset.classList.add("js-inactive");
  btn_start.classList.remove("js-unclickable");
  btn_stop.classList.add("js-unclickable");
  btn_reset.classList.add("js-unclickable");
}

// 状態:タイマー動作中
function setButtonStateRunning() {
  timer.classList.add("timer-fontColor_hidden"); //時間を見えなくする
  btn_start.classList.add("js-inactive"); // 非活性
  btn_stop.classList.remove("js-inactive"); // 活性
  btn_reset.classList.add("js-inactive"); // 非活性
  btn_start.classList.add("js-unclickable");
  btn_stop.classList.remove("js-unclickable");
  btn_reset.classList.add("js-unclickable");
}

// 状態:タイマー停止中
function setButtonStateStopped() {
  timer.classList.remove("timer-fontColor_hidden"); //時間を見えるようにする
  timer.classList.add("timer_appear"); //時間をゆっくり表示
  btn_start.classList.add("js-inactive"); // 活性
  btn_stop.classList.add("js-inactive"); // 非活性
  btn_reset.classList.remove("js-inactive"); // 活性
  btn_start.classList.add("js-unclickable");
  btn_stop.classList.add("js-unclickable");
  btn_reset.classList.remove("js-unclickable");
}
