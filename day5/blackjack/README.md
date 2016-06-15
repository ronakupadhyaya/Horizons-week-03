# Pair programming exercise: Blackjack

## Goal

In this exercise we're going to build a multiplayer game of Blackjack.

## Rules of Blackjack

We will be playing with a simplified set of rules.

### Scoring hands

The value of a hand is the sum of the point values of the individual cards.
Except, a "blackjack" is the highest hand, consisting of an ace and any
10-point card, and it outranks all other 21-point hands.

Aces may be counted as 1 or 11 points, 2 to 9 according to face value, and tens
and face cards count as 10 points.

[Source](http://wizardofodds.com/games/blackjack/basics/)

### Game flow

1. Players decide how much they will bet.
1. Dealer gives each player 2 cards face up.
1. Dealer gives herself 1 card face up, 1 card face down.
1. If the dealer has a blackjack (an Ace and any 10 point card) then players
  who don't also have blackjacks lose their bets. Players who also have
  blackjacks get their bets back.
1. If the dealer doesn't have a blackjack, players decide their moves.
  They can:

  1. **Hit:** Take another card. The player can hit as many times as she likes.
  If at any point the total value of the player's hand exceeds 21, the player
  loses their bet.
  1. **Stand:** Player choses to not take a card. This ends the player's turn.

1. After all players have taken their turns, the dealer reveals her face-down
  card. The dealer than keeps drawing more cards until she has more than 16
  points.
1. If the dealer ends up with more than 21 points (i.e. busts), all players who
  have not busted win and get back double their bets.
1. Otherwise:

  1. Players who have less points than the dealer lose.
  1. Players who have the same points as the dealer get their bets back.
  1. Players who have more points than the dealer get back double their bets.


## Part 1: Play against the dealer

First build a Blackjack game where a single person can play against the dealer.

### Models

- Game: a single Blackjack game. Properties:

  - Player bet (`Number`): number of Horizons Dollars the player has bet.
  - Player hand (`Array` of `String`s): cards in the players hand.
  - Dealer hand (`Array` of `String`s): cards in the dealers hand.
  - Is game over (`Boolean`): true if game is over, false otherwise.

### Routes

- `GET /`:
  - Render `List games`
  - Query parameter for filtering games by in-progress/over

- `POST /game`:
  - Create new game
  - Redirect to `/game/:id`

- `GET /game/:id`
  - Render `View game`
  -

### Views

- List games
  - View all games
  - Option to filter games by in-progress/over
- View game
  - View a single game
  - If game is in progress allow

## (Bonus) Part 2: Multiplayer

### Routes

- `GET /login`:
  - Render `Login` view

- `POST /login`:
  - If username does not exist in MongoDb, create user
  - Set cookie for login
  - Redirect to `/`

- `POST /logout`:
  - Delete login cookie
  - Redirect to `/`

### Views

- Login
  - A form for logging into the game

### Models

- Player: the person playing the game. Properties:

  - Money (`Number`): number of Horizons Dollars belonging to player

- Game: additional properties

  - Player 1 id (`ObjectId`): Mongo id of the player in the game
  - Player 2 bet (`Number`): number of Horizons Dollars the 2nd player has bet.
  - Player 2 hand (`Array` of `String`s): cards in the 2nd players hand.
  - Player 2 id (`ObjectId`): Mongo id of the player in the game
