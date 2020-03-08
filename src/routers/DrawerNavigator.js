import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import SideBar from '../common/components/Layout/SlidebarContainer';
import Home from '../common/components/Demo/HomeContainer';
import Modal from '../common/components/Demo/ModalContainer';

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
