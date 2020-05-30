import React from 'react';

import Header from './Header';
import ContentArea from './ContentArea';
import Footer from './Footer';

const Main = ({hidden}) => {
    return (
        <div className={ hidden ? 'hidden app_body' : 'app_body' }>
            <Header />
            <ContentArea />
            <Footer />
        </div>
    )
}

export default Main
