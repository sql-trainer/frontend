import * as types from '../../constants';
import { loadDatabaseFromAPI, isLoading as isDatabaseLoading } from './databaseActions';
import retryFetch from '../../modules/retry-fetch';

const setQuestions = payload => ({ type: types.QUESTIONS_LOADED, payload });

const changeCurrQuestion = id => ({ type: types.CHANGE_QUESTION, id });

const changeQuestionStatus = status => ({ type: types.CHANGE_QUESTION_STATUS, status });

const changeSolvedQuestionSQL = sql => ({ type: types.CHANGE_SOLVED_QUESTION_SQL, sql });

const isLoading = payload => ({ type: types.QUESTIONS_LOADING, payload });

const loadQuestionsFromAPI = (addNotification, getFromLocalStorage, saveToLocalStorage) => {
    return async function(dispatch) {
        dispatch(isLoading(true));
        dispatch(isDatabaseLoading(true));

        retryFetch(
            async () => {
                const { questions, lastQuestion, testTimestamp } = getFromLocalStorage([
                    { field: 'questions', parseJson: true },
                    'lastQuestion',
                    'testTimestamp',
                ]);

                const testMeta = await fetch('http://localhost:8080/api/v1/tests/open/meta/').then(res => res.json());

                if (questions && testTimestamp === testMeta.date_changed) {
                    const dbId = questions[lastQuestion || 0].database;
                    dispatch(setQuestions(questions));
                    dispatch(changeCurrQuestion(Number(lastQuestion)));
                    dispatch(isLoading(false));
                    dispatch(loadDatabaseFromAPI(dbId));

                    addNotification({ message: 'Последнее состояние восстановлено', level: 'info' });
                } else {
                    const res = await fetch('http://localhost:8080/api/v1/tests/open/').then(res => res.json());

                    if (res.error) {
                        addNotification({ message: res.error.message, level: 'error' });
                    } else {
                        const dbId = res.questions[0].database;
                        dispatch(setQuestions(res.questions));
                        dispatch(isLoading(false));
                        dispatch(loadDatabaseFromAPI(dbId));

                        saveToLocalStorage({
                            questions: JSON.stringify(res.questions),
                            testTimestamp: testMeta.date_changed,
                            lastQuestion: 0,
                        });
                    }
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

export { loadQuestionsFromAPI, changeCurrQuestion, changeQuestionStatus, changeSolvedQuestionSQL };
