
function connect(store, selector) {
    const get = () => selector(store.getState());

    return {
        get,
        connect: (host, key, invalidate) => {
            return store.subscribe(() => {
                if (host[key] !== get()) invalidate();
            });
        },
    };
}

export default connect;