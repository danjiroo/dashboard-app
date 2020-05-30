import React from 'react';

import MetricsLeft from './MetricsLeft';
import MetricsRight from './MetricsRight';

const Metrics = ({hidden, setHidden}) => {
    return (
        <>
            <h2>Metrics</h2>
            <div className="main_con metrics">
                <div className={ hidden ? 'hidden main_left' : 'main_left' }>
                    <MetricsLeft hidden={hidden} setHidden={setHidden} />
                </div>
                <div className={ hidden ? 'hidden main_right' : 'main_right' }>
                    <MetricsRight/>
                </div>
            </div>
        </>
    )
}

export default Metrics
