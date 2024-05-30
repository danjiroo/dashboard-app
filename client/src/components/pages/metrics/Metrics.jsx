/* eslint-disable react/prop-types */
import MetricsLeft from './MetricsLeft';
import MetricsRight from './MetricsRight';

const Metrics = ({hidden, setHidden}) => {
    return (
        <>
            <div className="main_head">
                <h2>Metrics</h2>
            </div>
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
