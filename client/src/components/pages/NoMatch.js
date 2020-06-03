import React from 'react';
import cat from '../../assets/images/cart.gif';

const NoMatch = () => {
    return (
        <>
            <div className="main_head">
                <h2>404</h2>
            </div>
            <div className="nomatch">
                <h2>404</h2>
                <p>Oops! Page not Found!</p>
                <figure>
                    <img className="catnomatch" src={cat} alt="cat" />
                </figure>
            </div>
                
        </>
    )
}

export default NoMatch