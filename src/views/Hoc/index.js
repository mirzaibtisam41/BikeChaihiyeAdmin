import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { GlobalContext } from '../../context';

const index = (Component) => {
    function HOC() {
        const { auth } = useContext(GlobalContext);
        return <React.Fragment>
            {(auth === null || auth === 'jwt expired') ? <Component /> : <Redirect to={'/users'} />}
        </React.Fragment>
    }
    return HOC;
}

export default index;