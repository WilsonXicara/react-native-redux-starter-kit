import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import SideBar from '../containers/SlidebarContainer';
import Home from '../common/components/Demo/Home/Home';
import Modal from '../common/components/Demo/Modal';

export default createDrawerNavigator(
    {
        Home: { screen: Home },
        Modal: { screen: Modal },
    },
    {
        initialRouteName: 'Home',
        contentComponent: props => <SideBar {...props} />
    }
);