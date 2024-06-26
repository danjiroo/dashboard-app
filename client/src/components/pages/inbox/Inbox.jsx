/* eslint-disable react/prop-types */
import InboxLeft from './InboxLeft';
import InboxRight from './InboxRight';

const Inbox = ({hidden, setHidden}) => {
    return (
        <>
            <div className="main_head">
                <h2>Inbox</h2>
            </div>
            <div className="main_con inbox">
                <div className={ hidden ? 'hidden main_left' : 'main_left' }>
                    <InboxLeft hidden={hidden} setHidden={setHidden} />
                </div>
                <div className={ hidden ? 'hidden main_right' : 'main_right' }>
                    <InboxRight/>
                </div>
            </div>
        </>
    )
}

export default Inbox
