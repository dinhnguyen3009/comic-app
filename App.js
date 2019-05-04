import React from "react";
import { Dimensions, Button } from "react-native";
import {createStackNavigator, createDrawerNavigator, createAppContainer, createMaterialTopTabNavigator } from "react-navigation";
import HomeScreen from './screen/HomeScreen'
import SlideMenu from './screen/SlideMenu'
import DetailScreen from './screen/DetailScreen'
import ListChapterScreen from './screen/ListChapterScreen'
import ReadScreen from './screen/ReadScreen'
import Signin from './screen/SigninScreen'
import Profile from './screen/ProfileScreen'
import Signup from './screen/SignupScreen'
import ResultScreen from './screen/ResultScreen'

const ListComic = createMaterialTopTabNavigator({
  Detail: {screen: DetailScreen},
  ListChapterScreen: {screen:ListChapterScreen}
});
// const User = createStackNavigator({
//   Profile: {screen: Profile},
//   Signin: {screen: Signin},
//   Signup: {screen: Signup},
// });
const Home = createStackNavigator({
  Home:{screen: HomeScreen},
  Read:{screen:ReadScreen},
  Profile:{screen:Profile,
    navigationOptions: ({ navigation }) => ({
      title: 'UserProfile',
      headerLeft: <Button title="Menu" onPress={()=>{navigation.openDrawer()}}/>
    }),
  },
  Signin: {screen: Signin},
  Signup: {screen: Signup},
  Result:{screen:ResultScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.title}`,
    }),
  },
  ListComic:{screen: ListComic,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}`,
    }),
  }
  //ta có thể thấy ở đây ta đã khai báo 1 màn hình hoàn chỉnh với navigation option, và nội dung được render ra là 1 màn hình.
});

const screenWidth = Dimensions.get('window').width;
const AppNavigator = createDrawerNavigator({
  Home:{screen: Home},
},{
  contentOptions: {
    activeTintColor: '#e91e63',
    itemsContainerStyle: {
      marginVertical: 0,
    },
    iconContainerStyle: {
      opacity: 1
    }
  },
  drawerWidth: screenWidth*0.4,
  contentComponent : props => <SlideMenu {...props}/>
});

export default createAppContainer(AppNavigator);