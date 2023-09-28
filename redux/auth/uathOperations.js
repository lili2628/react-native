import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { updateUserProfile, authStateChange, authSignOut } from './authReducer';

export const authSignUpUser = ({ login, email, password, photo }) =>
    async (dispatch, state) => {
        console.log(login, email, password, photo);
    try {
        
        await createUserWithEmailAndPassword(auth, email, password);

        const user = auth.currentUser;

        await updateProfile(user, {
            displayName: login,
            photoURL: photo,
        });

        const {
            uid,
            displayName,
            email: emailBase,
            photoURL: photoUrlBase,
        } = auth.currentUser;

        const userProfile = {
            userId: uid,
            login: displayName,
            email: emailBase,
            photoURL: photoUrlBase,
        };

        dispatch(updateUserProfile(userProfile));
        
        return user;

    } catch (error) {
        return error.message;
    }
};

export const authSignInUser = ({ login, email, password }) =>
    async (dispatch, state) => {
        try {
       
            return await signInWithEmailAndPassword(auth, email, password);
    
        } catch (error) {
            return error.message;
        }
    };

export const authUpdateUser = ({ avatarURL }) =>
    async (dispatch, state) => {
        try {
            const user = auth.currentUser;

            await updateProfile(user, {
                photoURL: avatarURL,
            });

            const {
                uid,
                displayName,
                email: emailBase,
                photoURL: photoUrlBase,
            } = auth.currentUser;

            const userProfile = {
                userId: uid,
                login: displayName,
                email: emailBase,
                photoURL: photoUrlBase,
            };

            dispatch(updateUserProfile(userProfile));

        } catch (error) {
            throw error;
        }
    };

export const authStateChangeUser = () =>
    async (dispatch, state) => {
        
        onAuthStateChanged(auth, user => {
    
            if (user) {
                const userProfile = {
                    userId: user.uid,
                    login: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                };

            dispatch(authStateChange({ stateChange: true }));
            dispatch(updateUserProfile(userProfile));
            };
        });
    };

export const authSignOutUser = () => async (dispatch, state) => {
    
    await signOut(auth);

    dispatch(authSignOut());
};