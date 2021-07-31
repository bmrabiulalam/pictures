import React, { useState, FormEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import Input from '../UI/Input';
import Button from '../UI/Button';
import Message from '../UI/Message';
import { signup, setError } from '../../store/actions/authActions';
import { useAppSelector } from '../../hooks/hooks';

const SignUp = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { error } = useAppSelector(state => state.auth);

  useEffect(() => {
    return () => {
      if(error) {
        console.log('signup useefect error: ', error);
        dispatch(setError(''));
      }
    }
  }, [error, dispatch]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if(error) {
      console.log('signup submitHandler error: ', error);
      dispatch(setError(''));
    }
    setLoading(true);
    dispatch(signup({ email, password, firstName }, () => {
      setLoading(false);
      history.replace('/');
    }));
  }

  return(
    <section className="section">
      <div className="container">
        <h2 className="has-text-centered is-size-2 mb-3">Sign Up</h2>
        <form className="form" onSubmit={submitHandler}>
          {error && <Message type="danger" msg={error} />}
          <Input 
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
            placeholder="First name"
            label="First name"
          />
          <Input 
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Email address"
            label="Email address"
          />
          <Input 
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="Password"
            label="Password"
          />
          <Button text={loading ? "Loading..." : "Sign Up"} className="is-primary is-fullwidth mt-5" disabled={loading} />
        </form>
      </div>
    </section>
  );
}

export default SignUp;