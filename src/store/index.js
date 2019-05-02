import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import reducer from './reducers';

const persistConfig = {
    key: 'training',
    storage,
    blacklist: ['notification'],
    stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));

export default () => {
    // let store = createStore(persistedReducer);
    let persistor = persistStore(store);
    return { store, persistor };
};

// export default store;
