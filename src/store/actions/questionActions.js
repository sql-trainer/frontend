import * as types from '../../constants';
import { loadDatabaseFromAPI, isLoading as isDatabaseLoading } from './databaseActions';

const setQuestions = payload => {
    const type = types.QUESTIONS_LOADED;
    return { type, payload };
};

const changeCurrQuestion = id => {
    const type = types.CHANGE_QUESTION;
    return { type, id };
};

const isLoading = payload => {
    const type = types.QUESTIONS_LOADING;
    return { type, payload };
};

const loadQuestionsFromAPI = () => {
    return function(dispatch, getState) {
        dispatch(isLoading(true));
        dispatch(isDatabaseLoading(true));

        // API stub
        fetch('https://api.myjson.com/bins/7ax0m')
            .then(res => res.json())
            .then(res => {
                if (res.status === 404) {
                    dispatch(isLoading(false));
                    dispatch(isDatabaseLoading(false));
                    console.log(res);
                } else {
                    dispatch(setQuestions(res));
                    dispatch(loadDatabaseFromAPI(getState().questions.currQuestion));
                }
            })
            .catch(err => {
                dispatch(isLoading(false));
                dispatch(isDatabaseLoading(false));
                console.log(err);
            });
        // TODO: Доделать обработку ошибок
    };
};

export { loadQuestionsFromAPI, changeCurrQuestion };
