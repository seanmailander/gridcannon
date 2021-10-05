import { IStore } from "../app/store";

function connect(store: IStore, selector, ignoreTimeTravel = false) {
  const get = () =>
    selector(
      ignoreTimeTravel ? store.getState() : store.getState().game.present
    );

  return {
    get,
    connect: (host, key, invalidate) =>
      store.subscribe(() => {
        if (host[key] !== get()) invalidate();
      }),
  };
}

export default connect;
