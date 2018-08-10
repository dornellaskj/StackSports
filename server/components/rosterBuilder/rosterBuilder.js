const MAX_PLAYERS = 15;
const MAX_STARTERS = 10;
const MAX_POINTS = 175;
const BOT_NAME_ROOT = "kbot";
let teamRoster = [];

module.exports.rosterBuilder = new Promise((resolve, reject) => {  
  generatePlayers();
  resolve(generateHTMLResponse());
});

function generatePlayers() {
  let pointRemainder = MAX_POINTS;
    for (let i = 0; i < MAX_PLAYERS; i++) {
      const botName = BOT_NAME_ROOT + (999 - i);
      //adding 3 to max players to ensure lowest player has at least 4 total points
      const totalPoints = (MAX_PLAYERS + 3) - i;
      const isStarter = i < MAX_STARTERS;
      //add players to the roster
      teamRoster.push(createPlayer(totalPoints, botName, isStarter));
      pointRemainder -= totalPoints;
    }
  //every team needs a super star!
  createSuperStarBot(pointRemainder);
}

function createSuperStarBot(pointRemainder) {
  //upgrade bot #1 to be our superstar.
  teamRoster[0] = createPlayer(teamRoster[0].total + pointRemainder, teamRoster[0].name, true);
}

function createPlayer(totalPoints, playerName, isStarter) {
  let playerObject = {};
    //build well rounded players
    playerObject.speed = Math.floor(totalPoints/3);
    playerObject.strength = Math.floor(totalPoints/3);    
    playerObject.agility = Math.floor(totalPoints/3);
    //agility is key, add remainder of points to make bots more agile.
    playerObject.agility += totalPoints % 3;
    playerObject.total = totalPoints;
    playerObject.name = playerName;
    playerObject.starter = isStarter;
  return playerObject;
}

function generateHTMLResponse() {
  let totalTeamPoints = 0, htmlResponse;
  htmlResponse = '<p class="team-label">Team Kevin</p>';
  htmlResponse += '<table class="roster-table">';
  htmlResponse += '<tr><td>Player Name</td><td>Speed</td><td>Strength</td><td>Agility</td><td>Total</td><td>Starter</td></tr>';
  teamRoster.forEach( player => {
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
module.exports.roster = teamRoster;