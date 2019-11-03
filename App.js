/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import GetMenu from './Screens/GetMenu';
import TestScreen from './Screens/TestScreen';
import Splash from './Screens/Splash';
import Register from './Screens/Register';

const App = createStackNavigator({
  Splash:{
    screen:Splash,
  },
  Register:{
    screen:Register,
  },

GetMenu:{
  screen:GetMenu,
},
TestScreen:{
  screen:TestScreen,
},
})


export default createAppContainer(App);
