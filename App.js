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

const App = createStackNavigator({

GetMenu:{
  screen:GetMenu,
},
TestScreen:{
  screen:TestScreen,
},
})


export default createAppContainer(App);
