import { createSwitchNavigator } from 'react-navigation';
import App from './AppNavigator';
import Loading from '../common/components/Layout/LoadingContainer';
import Login from '../common/components/Layout/LoginContainer';

export default createSwitchNavigator(
	{
		Loading: Loading,
		App: App,
		Login: Login
	},
	{
		initialRouteName: 'Loading'
	}
);
