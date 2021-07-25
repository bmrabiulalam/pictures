import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/hooks';
import { setSuccess } from '../../store/actions/authActions';
import Message from '../UI/Message';

const Dashboard = () => {
    const {user, needVerification, success} = useAppSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if(success){
            dispatch(setSuccess(''));
        }
    }, [success, dispatch])

    return (
        <section className="section">
            <div className="container">
                {needVerification && <Message type="success" msg="Please verify your email address"/>}
                <h1 className="is-size-1">Welcome {user?.firstName}</h1>
            </div>
        </section>
    );
};

export default Dashboard;