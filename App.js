import React from "react";
import {createAppContainer} from "react-navigation";
import BookTransactionScreen from "./Screens/ScanScreen";
import {createBottomTabNavigator} from "react-navigation-tabs"
import ScanScreen from "./Screens/ScanScreen";

export default class App extends React.Component {

  render(){
    return <AppContainer/>;
  }
}

const TabNavigator = createBottomTabNavigator ({
  Scan : {screen: ScanScreen},
 
});

const AppContainer = createAppContainer(TabNavigator);