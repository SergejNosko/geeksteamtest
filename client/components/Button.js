import React, {Component} from 'react';
import propTypes from 'prop-types';

import arrow from '../images/arrow.png';
import gear from '../images/gear.png';

function Button(props) {
    return(
        <button className="btn submit" onClick={props.onClick}>
            {props.loading === false && <span>Login <img src={arrow} alt=""/></span>}
            {props.loading === true && <span><img className="gear" src={gear} alt=""/></span>}
        </button>
    )
}
Button.propTypes = {
    loading: propTypes.bool.isRequired,
    onClick: propTypes.func.isRequired
};

export default Button;