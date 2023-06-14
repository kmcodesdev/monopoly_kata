const { Game, Player } = require('./kata');

describe('Player', () => {
    it('should move the player to the correct location when rolling dice', () => {
        const player = new Player('Test Player');
        player.location = 0;
        player.rollDice = () => 6; // Fixed dice roll value to 6
        player.move();
        expect(player.location).toBe(6); // Updated expected location to 6
      });
      

  it('should move the player to location 7 when starting at location 0 and rolling 7', () => {
    const player = new Player('Test Player');
    player.location = 0;
    player.rollDice = () => 7;
    player.move();
    expect(player.location).toBe(7);
  });

  it('should move the player to location 5 when starting at location 39 and rolling 6', () => {
    const player = new Player('Test Player');
    player.location = 39;
    player.rollDice = () => 6;
    player.move();
    expect(player.location).toBe(5);
  });
});

describe('Game', () => {
  it('should throw an error when the number of players is less than 2 or greater than 8', () => {
    expect(() => new Game(['Player 1'])).toThrow('Number of players should be between 2 and 8');
    expect(() => new Game(['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6', 'Player 7', 'Player 8', 'Player 9'])).toThrow('Number of players should be between 2 and 8');
  });

  it('should play 20 rounds and maintain the player order', () => {
    const players = ['Horse', 'Car'];
    const game = new Game(players);
    game.playRounds(20);
    expect(game.round).toBe(20);
    expect(game.playerOrder).toEqual(players);
  });

  it('should create a game with two players named Horse and Car', () => {
    const players = ['Horse', 'Car'];
    const game = new Game(players);
    expect(game.players.length).toBe(2);
    expect(game.playerOrder).toEqual(players);
  });

  it('should fail to create a game with less than 2 or more than 8 players', () => {
    expect(() => new Game(['Player 1'])).toThrow('Number of players should be between 2 and 8');
    expect(() => new Game(['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6', 'Player 7', 'Player 8', 'Player 9'])).toThrow('Number of players should be between 2 and 8');
  });

  it('should create 100 games and verify random player order occurrences', () => {
    const playerOrderOccurrences = new Map();
    const players = ['Horse', 'Car'];
  
    for (let i = 0; i < 100; i++) {
      const game = new Game(players);
      game.shufflePlayers(); // Shuffle the player order before each game
      const order = game.playerOrder.join(', ');
      playerOrderOccurrences.set(order, (playerOrderOccurrences.get(order) || 0) + 1);
    }
  
    expect(playerOrderOccurrences.size).toBe(2);
    expect([...playerOrderOccurrences.values()]).toEqual(expect.arrayContaining([expect.any(Number), expect.any(Number)]));
});
  
  
  

  it('should play a game with 2-8 players in random order and play 20 rounds', () => {
    const players = ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6', 'Player 7', 'Player 8'];
    const game = new Game(players);
    game.playRounds(20);
    expect(game.round).toBe(20);
    expect(game.playerOrder.length).toBe(players.length);
    expect(game.players.every(player => players.includes(player.name))).toBe(true);
    });
    
    it('should maintain the same player order in every round', () => {
    const players = ['Player 1', 'Player 2', 'Player 3'];
    const game = new Game(players);
    const initialOrder = game.playerOrder;
    game.playRounds(10);
    expect(game.round).toBe(10);
    expect(game.playerOrder).toEqual(initialOrder);
    });
    });
