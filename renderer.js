let currentCard = null;

document.getElementById("uploadJson").addEventListener("change", function () {
  const file = this.files[0];
  const reader = new FileReader();
  reader.onload = function () {
    try {
      const json = JSON.parse(reader.result);
      currentCard = json;
      renderCard(json);
    } catch (e) {
      alert("Invalid JSON format.");
    }
  };
  reader.readAsText(file);
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  if (!currentCard) return;
  const blob = new Blob([JSON.stringify(currentCard, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "card.json";
  a.click();
});

function renderCard(data) {
  const container = document.getElementById("cardDisplay");
  container.innerHTML = "";

  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = data.image;
  card.appendChild(img);

  const stats = document.createElement("div");
  stats.className = "stat-overlay";
  stats.innerHTML = `
    ❤️ HP: ${data.hp} | 🛡️ DEF: ${data.def} | 🗡️ ATK: ${data.atk}<br>
    🔥 Heat: ${data.heat} | 📢 REP: ${data.rep} | 💵 $${data.cash}
  `;
  card.appendChild(stats);

  const flipBtn = document.createElement("button");
  flipBtn.textContent = "Flip Card";
  flipBtn.className = "flip-button";

  flipBtn.onclick = () => {
    img.src = img.src === data.image ? data.backImage : data.image;
    stats.innerHTML = img.src === data.image
      ? `❤️ HP: ${data.hp} | 🛡️ DEF: ${data.def} | 🗡️ ATK: ${data.atk}<br>
         🔥 Heat: ${data.heat} | 📢 REP: ${data.rep} | 💵 $${data.cash}`
      : `🧬 Bio: ${data.bio} <br> 🎒 Perks: ${data.perks.join(", ")}`;
  };

  container.appendChild(card);
  container.appendChild(flipBtn);
}