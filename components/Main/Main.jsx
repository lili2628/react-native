
import React from "react";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from "@react-navigation/native";

import { selectStateChange } from '../../redux/selectors.js';
import { authStateChangeUser } from '../../redux/auth/uathOperations';
import  useRoute  from '../../Screens/Home';

const Main = () => {

    const stateChange = useSelector(selectStateChange);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authStateChangeUser());
    }, []);

    const routing = useRoute(stateChange);
 
    return (
        <NavigationContainer independent={true}>{routing}</NavigationContainer>
    );
};


export default Main;