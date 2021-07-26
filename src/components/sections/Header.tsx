import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { signout } from '../../store/actions/authActions';
import Button from '../UI/Button';

export default function Header() {
    const history = useHistory();
    // const dispatch = useAppDispatch();
    const dispatch = useDispatch();
    const { authenticated } = useAppSelector(state => state.auth);

    const logoutClickHandler = () => dispatch(signout());

    return (
        <nav className="navbar is-spaced has-shadow">
            <div className="container">
                <div className="navbar-brand">
                    <Link className="navbar-item" to={authenticated ? "/dashboard" : "/"}>AppName</Link>
                </div>

                <div className="navbar-end">
                    <div className="navbar-items">
                        {
                            authenticated 
                            ?
                            <Button text="Sign out" onClick={logoutClickHandler}/>
                            :
                            <div className="buttons">
                                <Button text="Sign up" onClick={() => history.push('/signup')} className="is-primary" />
                                <Button text="Sign in" onClick={() => history.push('/signin')} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}
