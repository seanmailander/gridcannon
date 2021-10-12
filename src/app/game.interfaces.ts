export interface ICard {
  suit?: string;
  card?: number;
  destroyed?: boolean;
  empty?: boolean;
}

export interface IGameState {
  deckInHand: Array<ICard>;
  currentCard?: ICard;
  skippedRoyalty: Array<ICard>;
  grid: Array<Array<ICard>>;
  bonus: Array<Array<Array<ICard>>>;
  turn?: number;
}

export interface IOptions {
  timetravel?: boolean;
  kidding?: boolean;
  harder?: boolean;
  better?: boolean;
  stronger?: boolean;
}

export interface IMetaState {
  scene: String;
  options: IOptions;
}

export interface ITriggerSpot {
  [spot: number]: Array<{
    payload: number[];
    target: number;
  }>;
}

export interface IGamePhase {
  isWon: boolean;
  isLost: boolean;
  noCardsRemaining: boolean;
  noLegalMoves: boolean;
  unwinnableArmor: boolean;
  playingRoyalty: boolean;
  playingPips: boolean;
  playingAce: boolean;
  playingJoker: boolean;
  addingArmor: boolean;
  canTrigger: boolean;
}
