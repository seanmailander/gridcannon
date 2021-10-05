import { configureStore } from "@reduxjs/toolkit";
import undoable from "redux-undo";
import { gameReducer } from "./game.reducer";
import { metaReducer } from "./meta.reducer";

export const store = configureStore({
    reducer: {
        game: undoable(gameReducer, {
            limit: 4, // set a limit for the size of the history
            groupBy: (action, currentState, previousHistory) => currentState.turn
        }),
        meta: metaReducer
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
