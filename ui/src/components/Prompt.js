import React from "react";
import { isPlayersTurn } from "../utils/stateUtils";

import "./Prompt.scss";

export function humanizeAction(action) {
  switch (action[1]) {
    case "ROLL":
      return `ROLLED A ${action[2][0] + action[2][1]}`;
    case "DISCARD":
      return `DISCARDED ${action[2]}`;
    case "BUY_DEVELOPMENT_CARD":
      return `BOUGHT DEVELOPMENT CARD`;
    case "BUILD_SETTLEMENT":
    case "BUILD_CITY": {
      const parts = action[1].split("_");
      const building = parts[parts.length - 1];
      const tile = action[2];
      return `BUILT ${building} ON ${tile}`;
    }
    case "BUILD_ROAD": {
      const edge = action[2];
      return `BUILT ROAD ON ${edge}`;
    }
    case "PLAY_KNIGHT_CARD": {
      return `PLAYED KNIGHT CARD`;
    }
    case "MOVE_ROBBER": {
      const tile = action[2];
      return `ROBBED ${tile}`;
    }
    case "END_TURN":
      return `ENDED TURN`;
    case "MARITIME_TRADE":
      const trade = action[2];
      const i = 4 - trade.filter((a) => a === null).length;
      const a = trade[0];
      const b = trade[4];
      return `TRADED ${i} ${a} FOR 1 ${b}`;
    default:
      return `${action.slice(1)}`;
  }
}

function humanizePrompt(current_prompt) {
  switch (current_prompt) {
    case "ROLL":
      return `YOUR TURN`;
    case "PLAY_TURN":
      return `YOUR TURN`;
    case "BUILD_INITIAL_SETTLEMENT":
    case "BUILD_INITIAL_ROAD":
    default: {
      const prompt = current_prompt.replaceAll("_", " ");
      return `PLEASE ${prompt}`;
    }
  }
}

export default function Prompt({ gameState, isBotThinking }) {
  let prompt = "";
  if (isBotThinking) {
    // Do nothing, but still render.
  } else if (gameState.winning_color) {
    prompt = `Game Over. Congrats, ${gameState.winning_color}!`;
  } else if (isPlayersTurn(gameState)) {
    prompt = humanizePrompt(gameState.current_prompt);
  } else {
    // prompt = humanizeAction(gameState.actions[gameState.actions.length - 1], gameState.bot_colors);
  }
  return <div className="prompt">{prompt}</div>;
}
