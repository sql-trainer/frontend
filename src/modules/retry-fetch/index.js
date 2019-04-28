const retryFetch = (fn, lastAttemptCb, onException = () => {}, { maxAttempts, timeout } = {}) => {
    const MAX_ATTEMPTS = maxAttempts || 5;
    const TIMEOUT = timeout || 3000;

    let attempts = 0;

    const tryFetch = async () => {
        try {
            await fn();
        } catch (e) {
            attempts++;
            if (attempts < MAX_ATTEMPTS) {
                setTimeout(tryFetch, TIMEOUT);
                onException(attempts);
            } else lastAttemptCb();
        }
    };

    tryFetch();
};

export default retryFetch;
