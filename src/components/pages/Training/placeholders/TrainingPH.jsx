import React from 'react';

const TrainingPH = () => (
    <div className="placeholder">
        <div className="ph-left">
            <div className="ph-block">
                <div className="ph ph-title" />
                <div className="ph ph-75" />
                <div className="ph ph-50" />
                <div className="ph-inline">
                    <div className="ph ph-25" />
                    <div className="ph ph-10" />
                </div>
            </div>
            <div className="ph-block">
                <div className="ph ph-title" />
                <div className="ph ph-25" />
                <div className="ph ph-50" />
                <div className="ph ph-25" />
            </div>
        </div>
        <div className="ph-right">
            <div className="ph-block">
                <div className="ph-inline">
                    <div className="ph ph-title" style={{ width: '80px' }} />
                    <div className="ph ph-title" style={{ width: '50px' }} />
                </div>
                <div className="ph" style={{ height: '200px' }}>
                    <div className="ph ph-circle" />
                </div>
            </div>
        </div>
    </div>
);

export default TrainingPH;
