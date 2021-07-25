import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Homepage from './components/pages/Homepage';
import ForgotPassword from "./components/pages/ForgotPassword";
import PrivateRoute from "./components/auth/PrivateRoute";
import Dashboard from "./components/pages/Dashboard";
import Header from "./components/sections/Header";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./hooks/hooks";
import { getUserById, setLoading, setNeedVerification } from "./store/actions/authActions";
import firebase from './firebase/config';
import Loader from "./components/UI/Loader";

function App() {
  const dispatch = useDispatch();
  const { loading } = useAppSelector(state => state.auth);
 
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setLoading(true));
        await dispatch(getUserById(user.uid));
        if(!user.emailVerified) {
          dispatch(setNeedVerification());
        }
      }
      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    }
  }, [dispatch]);

  if(loading) {
    return <Loader />;
  }

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
