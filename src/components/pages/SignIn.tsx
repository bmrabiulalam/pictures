import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { setError, signin } from '../../store/actions/authActions';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Message from '../UI/Message';
import { useHistory } from "react-router";

const SignIn = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { error } = useAppSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            if(error) dispatch(setError(''));
        }
    }, [error, dispatch]);

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        if(error) {
            dispatch(setError(''));
        }
        setLoading(true);
        dispatch(signin(
            {email, password}, 
            () => {
                history.replace({ pathname: '/dashboard' });
            }, 
            () => {
                setLoading(false);
            }
        ));
    }

    return (
        <div>
            <h2 className="has-text-centered is-size-2 mb-3">SignIn</h2>
            <form className="form" onSubmit={submitHandler}>
                {error && <Message type="danger" msg={error} />}
                <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.currentTarget.value)}
                    placeholder="Email address"
                    label="Email address"
                />
                <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.currentTarget.value)}
                    placeholder="Password"
                    label="Password"
                />
                <p><Link to="/forgot-password">Forgot password ?</Link></p>
                <Button text={loading ? "Loading..." : "Sign In"} className="is-primary is-fullwidth mt-5" disabled={loading} />
            </form>
        </div>
    );
};

export default SignIn;