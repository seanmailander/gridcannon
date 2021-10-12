import * as React from 'react';
import { useAppSelector } from '../../app/hooks';

import {
  getHintForCardInHand, getIsThisScene,
} from "../../app/game.selectors";
import { scenes } from "../../app/game.consts";

import "./game.scss";
import Instructions from './instructions';
import Controls from './controls';
import Grid from './grid';


const Hint = () => {
  const hint = useAppSelector(getHintForCardInHand);
  return <p id="hint">{hint}</p>;
};

export default function GameScene() {
  const isGameScene = useAppSelector(getIsThisScene(scenes.GAME));

  if (!isGameScene) {
    return null;
  }

  return <>
    <section id="game">
      <section className="heading">
        <h1>GridCannon</h1>
      </section>
      <section id="main">
        <section className="left-bar">
          <Controls />
        </section>
        <section className="grid-holder">
          <section id="grid" className="grid">
            <Grid />
          </section>
        </section>
        <section className="right-bar">
          <Instructions />
        </section>
      </section>

      <section className="hint-footer">
        <Hint />
      </section>
    </section>
  </>
}

