import React, { useCallback, useContext } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import { Hidden } from "@material-ui/core";

import PlayerStateBox from "../components/PlayerStateBox";
import { humanizeAction } from "../components/Prompt";
import { store } from "../store";
import ACTIONS from "../actions";
import { playerKey } from "../utils/stateUtils";

import "./LeftDrawer.scss";

function DrawerContent({ gameState }) {
  const playerSections = gameState.colors.map((color) => {
    const key = playerKey(gameState, color);
    return (
      <>
        <PlayerStateBox playerState={gameState.player_state} playerKey={key} />
        <Divider />
      </>
    );
  });

  return (
    <>
      {playerSections}
      <div className="log">
        {gameState.actions
          .slice()
          .reverse()
          .map((action, i) => {
            const player = gameState.bot_colors.includes(action[0])
              ? "BOT"
              : "YOU";
            return (
              <div key={i} className="action">
                <span className={action[0] + "-color"}>{player}</span>{" "}
                {humanizeAction(action)}
              </div>
            );
          })}
      </div>
    </>
  );
}

export default function LeftDrawer() {
  const { state, dispatch } = useContext(store);
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const openLeftDrawer = useCallback(
    (event) => {
      if (
        event &&
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      dispatch({ type: ACTIONS.SET_LEFT_DRAWER_OPENED, data: true });
    },
    [dispatch]
  );
  const closeLeftDrawer = useCallback(
    (event) => {
      if (
        event &&
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      dispatch({ type: ACTIONS.SET_LEFT_DRAWER_OPENED, data: false });
    },
    [dispatch]
  );

  return (
    <>
      <Hidden mdUp implementation="js">
        <SwipeableDrawer
          className="left-drawer"
          anchor="left"
          open={state.isLeftDrawerOpen}
          onClose={closeLeftDrawer}
          onOpen={openLeftDrawer}
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          onKeyDown={closeLeftDrawer}
        >
          <DrawerContent gameState={state.gameState} />
        </SwipeableDrawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          className="left-drawer"
          anchor="left"
          variant="permanent"
          open
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
        >
          <DrawerContent gameState={state.gameState} />
        </Drawer>
      </Hidden>
    </>
  );
}
