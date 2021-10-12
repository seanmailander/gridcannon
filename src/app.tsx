import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store } from "./app/store";

import "./ui/sharedstyles.scss";
import "./ui/octocorner";
import "./ui/game/grid";
import "./ui/scene.splash";
import "./ui/scene.menu";
import "./ui/scene.gameover";
import GameScene from "./ui/game/game-scene";

const App = () => (
  <>
    <splash-scene></splash-scene>
    <menu-scene></menu-scene>
    <game-scene></game-scene>
    <gameover-scene></gameover-scene>
    <GameScene />
  </>
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
