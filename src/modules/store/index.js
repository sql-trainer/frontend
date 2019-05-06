import store from 'store';

const multipleValuesPlugin = function() {
    return {
        setItems: function(super_fn, entries = {}) {
            for (let key in entries) {
                this.set(key, entries[key]);
            }
        },
        getItems: function(super_fn, keys = []) {
            if (Array.isArray(keys)) {
                const map = {};
                return (keys.forEach(key => (map[key] = this.get(key))), map); //prettier-ignore
            } else {
                throw new Error('Expected Array of strings');
            }
        },
        removeItems: function(super_fn, keys = []) {
            if (Array.isArray(keys)) {
                keys.forEach(key => this.remove(key));
            } else {
                throw new Error('Expected Array of strings');
            }
        },
    };
};

store.addPlugin(multipleValuesPlugin);

export default store;
