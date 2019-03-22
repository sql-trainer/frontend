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

const questionsLoadingError = error => {
    const type = types.QUESTIONS_LOADING_ERROR;
    return { type, error };
};

const loadQuestionsFromAPI = () => {
    return function(dispatch, getState) {
        dispatch(isLoading(true));
        dispatch(isDatabaseLoading(true));

        // API stub
        // fetch('https://api.myjson.com/bins/7ax0m')
        fetch('http://localhost:8080/api/v1/tests/open/')
            .then(res => res.json())
            .then(res => {
                const dbId = res.questions[0].database;
                dispatch(setQuestions({ ...res }));
                dispatch(questionsLoadingError(false));
                dispatch(loadDatabaseFromAPI(dbId));
            })
            .catch(err => {
                dispatch(questionsLoadingError(true));
                dispatch(isDatabaseLoading(false));
                console.log(err);
            })
            .finally(() => {
                dispatch(isLoading(false));
            });
        // TODO: Доделать обработку ошибок
    };
};

export { loadQuestionsFromAPI, changeCurrQuestion };
