function connect(store, selector, ignoreTimeTravel = false) {
    const get = () => selector(ignoreTimeTravel ? store.getState() : store.getState().present);

    return {
        get,
        connect: (host, key, invalidate) =>
            store.subscribe(() => {
                if (host[key] !== get()) invalidate();
            }),
    };
}

export default connect;
