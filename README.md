# Swap Game

[![](./static/swap.cf2739c8.png)](https://isqua.github.io/swap-game/)

I created this little game to experiment with [Svelte](https://svelte.dev). Now you can play with the balls!

Swap the colored balls in their places. Each ball can only move in one direction, either to an adjacent cell or through one.

## App Overview

1. The logic of the game does not depend on the framework. It is concentrated in the [game/game.ts](./src/game/game.ts) file as pure functions.
    1. Each ball is represented by the value `1` or `-1` depending on its color.
    1. Since each ball can only move in one direction, knowing the position of the ball is sufficient for a move — we derive the rest from its color and neighboring balls.
    1. When the balls reach their final positions, it is a win. If there are no possible moves left, it's a loss.
    1. To better understand the game's logic, take a look at the [tests](./src/game/game.test.ts).
1. For the convenience of players, moves can be undone. This is implemented in the [game/history.ts](./src/game/history.ts) file, also as pure functions.

    1. Since the state of the game depends only on the moves made, it is sufficient to store the moves in history.
    1. We store the executed moves in a stack. With undo, we reproduce the state by applying all the moves except the last one to the initial state.
    1. When we redo, we need to move forward in the stack.
    1. Check out the [tests](./src/game/history.test.ts) to understand this better.

1. The [routes/+page.svelte](./src/routes/+page.svelte) file renders the app. It also stores the game state and connects the state, UI components, and event handlers.

1. The [lib/Board.svelte](./src/lib/Board.svelte) component has an interesting trick for animating balls:
    1. As mentioned above, the game is created with pure functions, ensuring that the game state is immutable.
    1. When the state changes, the ball components in the DOM disappear from one position and appear in another.
    1. To animate the movement of the ball using [crossfade](https://svelte.dev/docs/svelte-transition#crossfade), we need to know where a particular ball has moved. In Svelte, this information can be described using the `key` property.
    1. According to the rules of the game, all balls of the same color can only move in one direction and cannot jump over balls of their own color. Thus, balls of the same color always move in the same order.
    1. Using this principle, we label all balls of the same color with numbers from `1` to `4`, and all balls of the other color with numbers from `-4` to `-1`.
    1. Therefore, when moving one ball, we know its original position, allowing Svelte to animate it.

## Developing

Start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version:

```bash
npm run build
```

You can preview the production build with:

```bash
npm run preview
```
