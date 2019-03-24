const retryFetch = (fn, lastAttemptCb, { maxAttempts, timeout } = {}) => {
    const MAX_ATTEMPTS = maxAttempts || 5;
    const TIMEOUT = timeout || 3000;

    let attempts = 0;

    const tryFetch = async () => {
        try {
            await fn();
        } catch (e) {
            attempts++;
            attempts < MAX_ATTEMPTS ? setTimeout(tryFetch, TIMEOUT) : lastAttemptCb();
        }
    };

    tryFetch();
};

export default retryFetch;
