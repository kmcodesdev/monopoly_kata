class Player {
    constructor(name) {
      this.name = name;
      this.location = 0;
    }
  
    rollDice() {
      // Roll the dice and return the result (between 1 and 6)
      return Math.floor(Math.random() * 6) + 1;
    }
  
    move() {
      const diceRoll = this.rollDice();
      this.location = (this.location + diceRoll) % 40;
    }
  }
  
  class Game {
    constructor(playerNames) {
      if (playerNames.length < 2 || playerNames.length > 8) {
        throw new Error('Number of players should be between 2 and 8');
      }
      this.players = playerNames.map(name => new Player(name));
      this.playerOrder = playerNames.slice();
      this.round = 0;
    }
  
    shufflePlayers() {
        for (let i = this.playerOrder.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.playerOrder[i], this.playerOrder[j]] = [this.playerOrder[j], this.playerOrder[i]];
        }
      }
      
    playRounds(numRounds) {
      for (let i = 0; i < numRounds; i++) {
        this.playRound();
      }
    }
  
    playRound() {
      this.round++;
      this.playerOrder.forEach(playerName => {
        const player = this.players.find(p => p.name === playerName);
        player.move();
      });
    }
  }
  
  module.exports = { Player, Game };
  