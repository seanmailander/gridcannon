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
}

export interface IMetaState {
    scene: String;
    options: IOptions;
}
