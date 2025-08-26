// JavaScript Document

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 🖼️ 画像読み込み
const useImages = true; // ← true にすると画像表示に切り替わる
const bikeImg = new Image();
bikeImg.src = "../img/game_bike.png"; // 自機画像

const itemImages = {
  apple: new Image(),
  banana: new Image(),
  bomb: new Image(),
  star: new Image(),
  medkit: new Image(),
  clock: new Image()
};
itemImages.apple.src = "../img/game_negi.png";
itemImages.banana.src = "../img/game_senbei.png";
itemImages.bomb.src = "../img/game_bomb.png";
itemImages.star.src = "../img/game_bonsai.png";
itemImages.medkit.src = "../img/game_medkit.png";
itemImages.clock.src = "../img/game_hourglass.png";

// 🎯 ゲーム設定
const timeLimit = 30;
let timeLeft = timeLimit;
let timerInterval;
let gameStarted = false;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let bombCount = 0;
const maxBombs = 5;
let life = 5;
let damageFlash = false;
let flashTimer = 0;
let lastTime = performance.now();

// スコアの設定
let useClearScore = false; 
let clearScore = 500;

// 🚲 プレイヤー設定
let bike = {
  x: 180,
  y: canvas.height - 60,
  width: 40,
  height: 40,
  speed: 5,
};

// 🍎 アイテム設定
const itemTypes = {
  apple: { color: "green", score: 10 },
  banana: { color: "yellow", score: 20 },
  bomb: { color: "red", score: -15 },
  star: { color: "gold", score: 50 },
  medkit: { color: "pink", score: 0, heal: 1 },
  clock: { color: "cyan", score: 0, timeBoost: 10 },
};

const itemWeights = {
  apple: 2,
  banana: 2,
  bomb: 17,
  star: 1,
  medkit: 0.8,
  clock: 0.8,
};

function getRandomItemType() {
  const pool = [];
  for (let type in itemWeights) {
    const count = Math.floor(itemWeights[type] * 10); // 10倍して整数化
    for (let i = 0; i < count; i++) {
      pool.push(type);
    }
  }
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

let items = Array.from({ length: 5 }, () => ({
  x: Math.random() * 360,
  y: Math.random() * -600,
  type: getRandomItemType()
}));

let keys = {};

// 🎮 ゲーム開始
document.getElementById("startButton").addEventListener("click", () => {
  startGame();
});

// 🔁 ゲーム再開
document.getElementById("restartButton").addEventListener("click", () => {
  resetGame();
  startGame();
});

// 📱 タッチ操作
canvas.addEventListener("touchstart", handleTouch);
canvas.addEventListener("touchmove", handleTouch);

function handleTouch(e) {
  if (!gameStarted) return;
  const touchX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
  let newX = touchX - bike.width / 2;
  bike.x = Math.max(0, Math.min(canvas.width - bike.width, newX));
  e.preventDefault();
}

// ⌨️ キーボード操作
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// HUD描画
function drawHUD() {
  // タイマー表示
  ctx.fillStyle = "black";
  ctx.font = "20px sans-serif";
  ctx.fillText("Time: " + timeLeft + "s", canvas.width - 120, 30);

  // スコア表示
  ctx.fillText("Score: " + score, 10, 30);
  ctx.font = "16px sans-serif";
  ctx.fillText("High Score: " + highScore, 10, 60);

  // ライフ表示（ハートアイコン）
  for (let i = 0; i < life; i++) {
    const x = canvas.width - 140 + i * 30;
    const y = 50;
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(x, y + 10);
    ctx.arc(x - 5, y, 5, Math.PI, 0, false);
    ctx.arc(x + 5, y, 5, Math.PI, 0, false);
    ctx.closePath();
    ctx.fill();
  }
}

// 🕹️ ゲームループ
function gameLoop(currentTime) {
  if (!gameStarted) return;

  const deltaTime = (currentTime - lastTime) / 1000; // 秒単位
  lastTime = currentTime;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 自機描画（ダメージ時は赤く点滅）
  if (useImages) {
    ctx.drawImage(bikeImg, bike.x, bike.y, bike.width, bike.height);
  } else {
    if (damageFlash && flashTimer > 0) {
      ctx.fillStyle = "red";
      flashTimer--;
      if (flashTimer === 0) damageFlash = false;
    } else {
      ctx.fillStyle = "blue";
    }
    ctx.fillRect(bike.x, bike.y, bike.width, bike.height);
  }

  // 🚲 自転車移動
  const moveSpeed = bike.speed * 60; // bike.speed は「フレームベース」なので60FPS換算
  if (keys["ArrowLeft"]) bike.x = Math.max(0, bike.x - moveSpeed * deltaTime);
  if (keys["ArrowRight"]) bike.x = Math.min(canvas.width - bike.width, bike.x + moveSpeed * deltaTime);

  // 🍎 アイテム処理
  const itemSpeed = 550; // ピクセル/秒（調整可能）
  items.forEach(item => {
    item.y += itemSpeed * deltaTime;

    if (useImages) {
      const img = itemImages[item.type];
      if (img.complete) {
        ctx.drawImage(img, item.x, item.y, 30, 30);
      } else {
        // 読み込み前は色で代用
        ctx.fillStyle = itemTypes[item.type].color;
        ctx.fillRect(item.x, item.y, 30, 30);
      }
    } else {
      ctx.fillStyle = itemTypes[item.type].color;
      ctx.fillRect(item.x, item.y, 30, 30);
    }

    // 衝突判定
    if (
      bike.x < item.x + 30 &&
      bike.x + bike.width > item.x &&
      bike.y < item.y + 30 &&
      bike.y + bike.height > item.y
    ) {
      score += itemTypes[item.type].score;

      // スコア保持
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
      }

      // 💣爆弾処理
      if (item.type === "bomb") {
        bombCount++;
        life--;
        damageFlash = true;
        flashTimer = 10;
        if (life <= 0) {
          endGame("Game Over !");
          return;
        }
      }

      // 🛡️回復処理
      if (item.type === "medkit") {
        if (life < 5) life++; // 最大5まで回復
      }

      // ⏳ 時間追加処理
      if (item.type === "clock") {
        timeLeft += itemTypes[item.type].timeBoost;
      }

      // アイテム再生成
      const newType = getRandomItemType();
      item.y = -40;
      item.x = Math.random() * (canvas.width - 30);
      item.type = newType;
    }

    // 画面外に出たら再生成
    if (item.y > canvas.height) {
      resetItem(item);
    }
  });

   // 🎯 最後にHUDを描画（最前面に表示される）
  drawHUD();

  // 🎉 クリア判定
  if (useClearScore && score >= clearScore) {
    endGame("Congratulations!");
    return;
  }

  requestAnimationFrame(gameLoop);
}

// 🔄 アイテム再生成
function resetItem(item) {
  item.y = -40;
  item.x = Math.random() * (canvas.width - 30);
  item.type = getRandomItemType();
}

// 🧠 ゲーム開始処理
function startGame() {
  gameStarted = true;
  score = 0;
  bombCount = 0;
  timeLeft = timeLimit;
  lastTime = performance.now();
  document.getElementById("startButton").style.display = "none";
  document.getElementById("restartButton").style.display = "none";
  resizeCanvas();
  timerInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame("Time's up !");
    }
  }, 1000);
  requestAnimationFrame(gameLoop);
}

// 🔁 ゲームリセット処理
function resetGame() {
  score = 0;
  bombCount = 0;
  bike.x = 180;
  life = 5;
  items = Array.from({ length: 5 }, () => ({
    x: Math.random() * (canvas.width - 30),
    y: Math.random() * -600,
    type: getRandomItemType()
  }));
}

// 🛑 ゲーム終了処理
function endGame(message) {
  gameStarted = false;
  clearInterval(timerInterval);
  ctx.fillStyle = "black";
  ctx.font = "bold 30px sans-serif";
  const textWidth = ctx.measureText(message).width;
  const x = (canvas.width - textWidth) / 2;
  const y = canvas.height / 2;
  ctx.fillText(message, x, y);
  document.getElementById("restartButton").style.display = "block";
}

// 📐 キャンバスサイズ調整
function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  bike.x = (canvas.width - bike.width) / 2;
  bike.y = canvas.height - bike.height - 20;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();