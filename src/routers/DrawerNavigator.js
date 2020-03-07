import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import Sidebar from '../common/components/Layout/Sidebar';
import Home from '../common/components/Demo/Home/Home';
import Modal from '../common/components/Demo/Modal';

export default createDrawerNavigator(
    {
        Home: { screen: Home },
        Modal: { screen: Modal },
    },
    {
        initialRouteName: 'Home',
        contentComponent: props => <Sidebar {...props} />
    }
);