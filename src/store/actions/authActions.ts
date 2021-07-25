import { ThunkAction } from 'redux-thunk';
import { 
    SignUpData, 
    AuthAction, 
    SET_USER, 
    User, 
    SET_LOADING, 
    SIGN_OUT, 
    SignInData, 
    SET_ERROR, 
    NEED_VERIFICATION, 
    SET_SUCCESS 
} from '../types';
import { RootState } from '..';
import firebase from '../../firebase/config';

export type AuthThunk = ThunkAction<void, RootState, unknown, AuthAction>;
const dbUserCollection = firebase.firestore().collection("users");

// Create user
export const signup = (data: SignUpData, onError: () => void): AuthThunk => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            const res = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
            if(res.user){
                const userData: User = {
                    email: data.email,
                    firstName: data.firstName,
                    id: res.user.uid,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                }
                await dbUserCollection.doc(res.user.uid).set(userData);
                await res.user.sendEmailVerification();
                dispatch({type: NEED_VERIFICATION});
                dispatch({type: SET_USER, payload: userData});
            }
        } catch (err) {
            console.log(err);
            onError();
            dispatch(setError(err.message));
        }
    }
}

// Set need verification
export const setNeedVerification = (): AuthThunk => {
    return dispatch => dispatch({type: NEED_VERIFICATION});
}

// Log in
export const signin = (data: SignInData, onError: () => void): AuthThunk => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
        } catch (err) {
            console.log(err);
            dispatch(setError(err.message));
        }
    }
}

// Sing out
export const signout = (): AuthThunk => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            await firebase.auth().signOut();
            dispatch({type: SIGN_OUT});
        } catch (err) {
            console.log(err);
            dispatch(setError(err.message));
        }
    }
}

// Send password reset email
export const sendPasswordResetEmail = (email: string, successMsg: string): AuthThunk => {
    return async dispatch => {
        try {
            await firebase.auth().sendPasswordResetEmail(email);
            dispatch(setSuccess(successMsg));
        } catch (err) {
            console.log(err);
            dispatch(setError(err.message));
        }
    }
}

// Get user by id
export const getUserById = (id: string): AuthThunk => {
    return async dispatch => {
        try{
            dispatch(setLoading(true));
            const user = await dbUserCollection.doc(id).get();
            if(user.exists){
                const userData = user.data() as User;
                dispatch({type: SET_USER, payload: userData});
            }
        } catch (err) {
            console.log(err);
            dispatch(setError(err.message));
        }
    }
}

// Set loading
export const setLoading = (value: boolean): AuthThunk => {
    return dispatch => dispatch({type: SET_LOADING, payload: value});
}

// Set error
export const setError = (msg: string): AuthThunk => {
    return dispatch => {
        dispatch({type: SET_ERROR, payload: msg});
    }
}

// Set success
export const setSuccess = (msg: string): AuthThunk => {
    return dispatch => {
        dispatch({type: SET_SUCCESS, payload: msg});
    }
}