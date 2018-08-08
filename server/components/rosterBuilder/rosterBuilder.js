const MAX_POINTS = 175;
const MAX_PLAYERS = 15;
const MAX_STARTERS = 10;
let roster = [], htmlResponse, names = [];

module.exports.rosterBuilder = new Promise((resolve, reject) => {
  generateNames();
  generateStarters();
  generateBench();
  resolve(generateHTMLResponse());
});

function generateRoster() {
  for (let i = 0; i < MAX_PLAYERS; i++) {
    let playerObject = {};
    playerObject.name = generateName();
    roster.push(playerObject);
  }
}

function generateNames() {
  const name = "kbot" + Math.floor(Math.random()*(999-100+1)+100);
  if(names.length <= MAX_PLAYERS && names.indexOf(name) == -1) {
    names.push(name);
    generateNames();
  } else if (names.length <= MAX_PLAYERS) {
    generateNames();
  }
}

function generateStarters() {
  for (let i = 0; i < MAX_STARTERS; i++) {
    let totalPoints = 19 - i;
    roster.push(createPlayer(totalPoints, i));
  }
}

function generateBench() {
  const numBench = MAX_PLAYERS - MAX_STARTERS;
  for (let i = 0; i < numBench; i++) {
    let totalPoints = 8 - i;
    roster.push(createPlayer(totalPoints, i + 11));
  }
}

function createPlayer(totalPoints, nameIndex) {
  let playerObject = {}
    playerObject.speed = Math.floor(totalPoints/3);
    playerObject.strength = Math.floor(totalPoints/3);    
    playerObject.agility = Math.floor(totalPoints/3);
    playerObject.agility += totalPoints - (playerObject.speed + playerObject.strength + playerObject.agility);
    playerObject.total = playerObject.speed + playerObject.strength + playerObject.agility;
    playerObject.name = names[nameIndex];
    playerObject.starter = nameIndex < 11;
  return playerObject;
}

function generateHTMLResponse() {
  let totalTeamPoints = 0;
  htmlResponse = '<p class="team-label">Team Kevin</p>';
  htmlResponse += '<table class="roster-table">';
  htmlResponse += '<tr><td>Player Name</td><td>Speed</td><td>Strength</td><td>Agility</td><td>Total</td><td>Starter</td></tr>';
  roster.forEach( player => {
    htmlResponse += `
    <tr>
      <td>${player.name}</td>
      <td>${player.speed}</td>
      <td>${player.strength}</td>
      <td>${player.agility}</td>
      <td>${player.total}</td>
      <td>${player.starter}</td>
    </tr>
    `;
    totalTeamPoints += player.total;
  });
  htmlResponse += '</table>';
  htmlResponse += `<p class="team-label">Total Team Points: ${totalTeamPoints}`;
  return htmlResponse;
}
module.exports.roster = roster;