import * as React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import normalize from '../utils/helpers/dimen';

import Account from '../screens/home/Account';

import Shop from '../screens/home/Shop';

// import Passpurchase from '../screens/home/Passpurchase';
// import Passdetails from '../screens/home/Passdetails';
import {Colors, Fonts, Icons} from '../themes/ImagePath';
// import Paymenthistory from '../screens/home/Paymenthistory';
// import Paymentmethod from '../screens/home/Paymentmethod';
import Settings from '../screens/home/Settings';
import FriendsPge from '../screens/home/FriendsPge';
import BarVisitedPage from '../screens/home/BarVisitedPage';
import Home from '../screens/home/Home';
import Search from '../screens/home/Search';
import SearchBarpassnotAvail from '../screens/home/SearchBarpassnotAvail';
import Favorites from '../screens/home/Favorites';
import Passpurchase from '../screens/home/Passpurchase';
import InviteFriends from '../screens/home/InviteFriends';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const StackHome = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: Colors.black},
      }}>
      <Stack.Screen name="Home" component={Home} />

      <Stack.Screen
        name="SearchBarpassnotAvail"
        component={SearchBarpassnotAvail}
      />
      <Stack.Screen name="Passpurchase" component={Passpurchase} />

      {/* <Stack.Screen name="PassnotAvailable2" component={PassnotAvailable2} /> */}
    </Stack.Navigator>
  );
};

const StackWallet = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: Colors.black},
      }}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen
        name="SearchBarpassnotAvail"
        component={SearchBarpassnotAvail}
      />
      <Stack.Screen name="Passpurchase" component={Passpurchase} />
      {/* <Stack.Screen name="Passdetails" component={Passdetails} /> */}
    </Stack.Navigator>
  );
};
const StackAccount = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: Colors.black},
      }}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="FriendsPge" component={FriendsPge} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="BarVisitedPage" component={BarVisitedPage} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="InviteFriends" component={InviteFriends} />
    </Stack.Navigator>
  );
};
function TabScreen() {
  return (
    <Tab.Navigator
      // headerShown={'none'}
      headerShown={false}
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        // keyboardHidesTabBar: true,
        // keyboardHidesTabBar: true,
        unmountOnBlur: true,
        // activeTintColor: Color.white,
        // inactiveTintColor: Color.yellow,
        showIcon: true,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.themeblue,
          height: normalize(70),
          borderTopRightRadius: normalize(15),
          borderTopLeftRadius: normalize(15),
          position: 'absolute',
        },
        labelStyle: {
          fontSize: normalize(10),
          fontWeight: 'bold',
          // marginTop: 0,
          // padding: 0,
          //   fontFamily: getFont('reg'),
        },
      }}>
      <Tab.Screen
        name="Search"
        component={StackWallet}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return (
              <>
                {/* <View style={{backgroundColor:focused? Colors.bottombutton:Colors.white,width:normalize(6),height:normalize(3),
            position:'absolute',top:0,borderBottomRightRadius:normalize(4),borderBottomLeftRadius:normalize(4),
            }}/> */}
                <View style={{alignItems: 'center'}}>
                  <Image
                    style={{
                      height: normalize(20),
                      width: normalize(20),
                      marginTop: Platform.OS === 'ios' ? normalize(5) : 0,
                      tintColor: focused ? Colors.white : Colors.bottombutton,
                      marginBottom: normalize(4),
                    }}
                    // source={focused ? Icons.homeactive : Icons.home}
                    source={Icons.Search}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: focused ? Colors.white : Colors.bottombutton,
                      fontSize: normalize(10),
                      fontFamily: Fonts.Poppins_Bold,
                    }}>
                    Search
                  </Text>
                </View>
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="Home"
        component={StackHome}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return (
              <>
                {/* <View style={{backgroundColor:focused? Colors.bottombutton:Colors.white,width:normalize(6),height:normalize(3),
            position:'absolute',top:0,borderBottomRightRadius:normalize(4),borderBottomLeftRadius:normalize(4),
            }}/> */}
                <View style={{alignItems: 'center'}}>
                  <Image
                    style={{
                      height: normalize(20),
                      width: normalize(20),
                      marginTop: Platform.OS === 'ios' ? normalize(5) : 0,
                      tintColor: focused ? Colors.white : Colors.bottombutton,
                      marginBottom: normalize(4),
                    }}
                    source={Icons.Home}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: focused ? Colors.white : Colors.bottombutton,
                      fontSize: normalize(10),
                      fontFamily: Fonts.Poppins_Bold,
                    }}>
                    Home
                  </Text>
                </View>
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="Account"
        component={StackAccount}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return (
              <>
                {/* <View style={{backgroundColor:focused? Colors.bottombutton:Colors.white,width:normalize(6),height:normalize(3),
            position:'absolute',top:0,borderBottomRightRadius:normalize(4),borderBottomLeftRadius:normalize(4),
            }}/> */}
                <View style={{alignItems: 'center'}}>
                  <Image
                    style={{
                      height: normalize(20),
                      width: normalize(20),
                      marginTop: Platform.OS === 'ios' ? normalize(5) : 0,
                      tintColor: focused ? Colors.white : Colors.bottombutton,
                      marginBottom: normalize(4),
                    }}
                    source={Icons.user}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: focused ? Colors.white : Colors.bottombutton,
                      fontSize: normalize(10),
                      fontFamily: Fonts.Poppins_Bold,
                    }}>
                  Profile
                  </Text>
                </View>
              </>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default function TabNavigator() {
  return <TabScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  navigator: {
    borderTopWidth: 0,
    // backgroundColor: Color.brown,
    height: Platform.OS === 'ios' ? normalize(50) : normalize(50),
  },
  container1: {
    position: 'relative',
    width: 75,
    alignItems: 'center',
    zIndex: 999,
  },
  background: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#fff',
  },
  tabBackground: {
    height: 90,
    width: 80,
    position: 'absolute',
    top: 0,
  },
  button: {
    top: -22.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 27,
    // backgroundColor: Color.border,
    zIndex: 999,
  },
  text: {
    top: -18,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    zIndex: 999,
    textAlign: 'center',
    // color: Color.text,
  },
});
