let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monstersHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const monsterLevelText = document.querySelector("#monsterLevel");

const weapons = [
  {
    name: "stick",
    power: 5
  },
  {
    name: "dagger",
    power: 30
  },
  {
    name: "claw hammer",
    power: 50
  },
  {
    name: "sword",
    power: 100
  }
]

const monsters = [
  {
    name: "Slime",
    level: 2,
    health: 15
  },
  {
    name: "Goblin",
    level: 8,
    health: 60
  },
  {
    name: "Dragon",
    level: 20,
    health: 300
  }
]

const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store.\""
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight goblin", "Go to town square"],
    "button functions": [fightSlime, fightGoblin, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "Fight fight fight!"
  },
  {
    name: "killMonster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, goTown],
    text: 'Monster dead. It screams "arg"! Yay xp and gold!'
  },
  {
    name: "lose",
    "button text": ["REPLAY???", "REPLAY???", "REPLAY???"],
    "button functions": [restart, restart, restart],
    text: 'You dead lololol'
  },
  {
    name: "win",
    "button text": ["REPLAY???", "REPLAY???", "REPLAY???"],
    "button functions": [restart, restart, restart],
    text: 'You win! WOW!'
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    text.innerText = "You purchased 10 health. Congrats."
  } else {
    text.innerText = "You're broke."
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a new " + newWeapon + ". Fight them monsters.";
      inventory.push(newWeapon)
      text.innerText += " You have all this now wow: " + inventory.join(", ") + ".";
    } else {
      text.innerText = "You're too broke. Get a job."
    }
  } else {
    text.innerText = "Chill out. You have enough."
    button2.innerText = "Sell weapon for 15 gold"
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
  } else {
    text.innerText = "Bruh you need at least one thing to fight."
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightGoblin() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3])
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  monsterLevelText.innerText = monsters[fighting].level;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " hit you!";
  text.innerText += " You swing your " + weapons[currentWeapon].name + " at it!"
  
  health -= getMonsterAttackValue(monsters[fighting].level);
  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  health > 0 ? healthText.innerText = health : healthText.innerText = 0;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
}

function getMonsterAttackValue(level) {
  let hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit;
}

function dodge() {
  text.innerText = "You dodged the " + monsters[fighting].name + "/'s attack!!"
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level + 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

