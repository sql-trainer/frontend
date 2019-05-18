import React from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';

const StatisticsBlock = React.memo(({ questions, editorTheme, style, markLabel }) => {
    const highlightPreviewSQL = sql => ({ __html: Prism.highlight(sql, Prism.languages.sql) });

    const sumW = questions.reduce((acc, q) => acc + Number(q.weight), 0);
    const res = questions.reduce((acc, q) => (q.sql !== undefined ? acc + Number(q.weight) : acc), 0);

    return (
        <div className="test-info" style={style}>
            <div className="stat-block">
                <div className="stat-group">
                    <div className="stat-info">
                        {questions.filter(q => q.sql !== undefined).length}/{questions.length}
                    </div>
                    <div className="stat-title">Дано ответов</div>
                </div>
                <div className="stat-group">
                    <div className="stat-info">{Math.round((res / sumW) * 100)}/100</div>
                    <div className="stat-title">{markLabel ? markLabel : 'Текущий балл'}</div>
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
                                <pre
                                    className="stat-question-answer"
                                    dangerouslySetInnerHTML={highlightPreviewSQL(q.sql || '')}
                                />
                            </div>
                        ),
                )}
            </div>
        </div>
    );
});

export default StatisticsBlock;
