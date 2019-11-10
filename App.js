/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import GetMenu from './Screens/GetMenu';
import TestScreen2 from './Screens/TestScreen2';
import Splash from './Screens/Splash';
import Register from './Screens/Register';
import QRCodeScanner from './Screens/QRCodeScanner';
import OrderListScreen from './Screens/OrderListScreen';

const App = createStackNavigator({
  Splash: {
    screen: Splash,
  },
  Register: {
    screen: Register,
  },
  QRCodeScanner: {
    screen: QRCodeScanner,
  },
  GetMenu: {
    screen: GetMenu,
  },
  TestScreen2: {
    screen: TestScreen2,
  },
  OrderListScreen: {
    screen:OrderListScreen,
  }
})


export default createAppContainer(App);
