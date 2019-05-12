import React from 'react';
import Modal from '../../../common/Modal';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';

const StatisticsModal = props => {
    const { visible, onClose, questions, editorTheme } = props;

    const highlightPreviewSQL = sql => ({ __html: Prism.highlight(sql, Prism.languages.sql) });

    const sumW = questions.reduce((acc, q) => acc + Number(q.weight), 0);
    const res = questions.reduce((acc, q) => (q.sql !== undefined ? acc + Number(q.weight) : acc), 0);

    return (
        <Modal title="Статистика" opened={visible} poseKey="info" onClose={onClose} maxHeight={700} maxWidth={800}>
            <div className="test-info">
                <div className="stat-block">
                    <div className="stat-group">
                        <div className="stat-info">{questions.filter(q => q.sql !== undefined).length}/12</div>
                        <div className="stat-title">Дано ответов</div>
                    </div>
                    <div className="stat-group">
                        <div className="stat-info">{Math.round((res / sumW) * 100)}/100</div>
                        <div className="stat-title">Текущий балл</div>
                    </div>
                </div>

                <div className={`settings-group  ${editorTheme}`}>
                    {questions.map(
                        (q, index) =>
                            q.sql && (
                                <div key={index}>
                                    <div className="stat-question-title">
                                        <div className="stat-question-number">#{index + 1}</div>
                                        {q.question}
                                    </div>
                                    <div
                                        className="stat-question-answer"
                                        dangerouslySetInnerHTML={highlightPreviewSQL(q.sql || '')}
                                    />
                                </div>
                            ),
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default StatisticsModal;
