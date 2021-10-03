
function connect(store, selector) {
    const get = () => selector(store.getState());

    return {
        get,
        connect: (host, key, invalidate) => store.subscribe(() => {
                if (host[key] !== get()) invalidate();
            }),
    };
}

export default connect;