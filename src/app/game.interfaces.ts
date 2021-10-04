export interface ICard {
    suit?: string;
    card?: number;
    destroyed?: boolean;
    empty?: boolean;
}

export interface GameState {
    scene: String;
    options: IOptions;
    turn: number;
    deckInHand: Array<ICard>;
    currentCard: ICard;
    skippedRoyalty: Array<ICard>;
    grid: Array<Array<ICard>>;
    bonus: Array<Array<Array<ICard>>>;
}

export interface IOptions {
    timetravel?: boolean;
}