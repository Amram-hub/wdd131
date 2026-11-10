const character = {
  name: "Snortleblat",
  class: "Swamp Beast Diplomat",
  level: 5,
  health: 100,
  image: "images/snortleblat.webp",

  attacked() {
    this.health = Math.max(0, this.health - 20);
  },

  levelUp() {
    this.level += 1;
  }
};

const level = document.querySelector("#character-level");
const health = document.querySelector("#character-health");
const status = document.querySelector("#status");
const attackButton = document.querySelector("#attack");

document.querySelector("#character-name").textContent = character.name;
document.querySelector("#character-class").textContent = character.class;
document.querySelector("#character-image").src = character.image;

function updateStats() {
  level.textContent = character.level;
  health.textContent = character.health;
}

attackButton.addEventListener("click", () => {
  if (character.health === 0) return;

  character.attacked();
  updateStats();

  if (character.health === 0) {
    attackButton.setAttribute("aria-disabled", "true");
    status.textContent = character.name + " has died.";
  } else {
    status.textContent = "Health is now " + character.health + ".";
  }
});

document.querySelector("#level-up").addEventListener("click", () => {
  character.levelUp();
  updateStats();
  status.textContent = character.name + " reached level " + character.level + ".";
});

updateStats();
