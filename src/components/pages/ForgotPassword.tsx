import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/hooks';
import { sendPasswordResetEmail, setError, setSuccess } from '../../store/actions/authActions';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Message from '../UI/Message';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const {error, success} = useAppSelector(state => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return () => {
            if(error) {
              dispatch(setError(''));
            }
            if(success) {
              dispatch(setSuccess(''));
            }
        }
    }, [error, dispatch, success]);

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        if(success) {
          dispatch(setSuccess(''));
        }
        if(error) {
          dispatch(setError(''));
        }
        setLoading(true);
        await dispatch(sendPasswordResetEmail(email, "Email sent!"));
        setLoading(false);
    }

    return (
        <section className="section">
            <div className="container">
                <h2 className="has-text-centered is-size-2 mb-3">Reset Password</h2>
                <form className="form" onSubmit={submitHandler}>
                    {error && <Message type="danger" msg={error} />}
                    {success && <Message type="success" msg={success} />}
                    <Input
                        type="email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.currentTarget.value)}
                        placeholder="Email address"
                        label="Email address"
                    />
                    <Button text={loading ? "Loading..." : "Send password reset email"} className="is-primary is-fullwidth mt-5" disabled={loading}/>
                </form>
            </div>
        </section>
    );
};

export default ForgotPassword;