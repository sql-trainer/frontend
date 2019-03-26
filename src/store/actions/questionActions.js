import * as types from '../../constants';
import { loadDatabaseFromAPI, isLoading as isDatabaseLoading } from './databaseActions';
import retryFetch from '../../modules/retry-fetch';

const setQuestions = payload => {
    const type = types.QUESTIONS_LOADED;
    return { type, payload };
};

const changeCurrQuestion = id => {
    const type = types.CHANGE_QUESTION;
    return { type, id };
};

const changeQuestionStatus = status => {
    const type = types.CHANGE_QUESTION_STATUS;
    return { type, status };
};

const isLoading = payload => {
    const type = types.QUESTIONS_LOADING;
    return { type, payload };
};

const loadQuestionsFromAPI = addNotification => {
    return async function(dispatch) {
        dispatch(isLoading(true));
        dispatch(isDatabaseLoading(true));

        retryFetch(
            async () => {
                const res = await fetch('http://localhost:8080/api/v1/tests/open/').then(res => res.json());
                if (res.error) {
                    addNotification({ message: res.error.message, level: 'error' });
                } else {
                    const dbId = res.questions[0].database;
                    dispatch(setQuestions({ ...res }));
                    dispatch(isLoading(false));
                    dispatch(loadDatabaseFromAPI(dbId));
                }
            },
            () => {
                addNotification({ message: 'Ошибка при загрузке вопросов', level: 'error' });
                dispatch(isLoading(false));
                dispatch(isDatabaseLoading(false));
            },
        );
    };
};

export { loadQuestionsFromAPI, changeCurrQuestion, changeQuestionStatus };
