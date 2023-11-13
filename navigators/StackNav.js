import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import Splash from '../screens/splashScreen/Splash';
// import Passpurchase from '../screens/home/Passpurchase';
import TabNavigator from './TabNab';
import Landing from '../screens/auth/Landing';
import Signin from '../screens/auth/Signin';
import Signup from '../screens/auth/Signup';
import ForgotPass from '../screens/auth/ForgotPass';
import Enterotp from '../screens/auth/Enterotp';
import ChangePassword from '../screens/auth/ChangePassword';
import Cmspage from '../screens/auth/Cmspage';
// import Addcard from '../screens/home/Addcard';
import {useSelector, useDispatch} from 'react-redux';
import Security from '../screens/home/Changepassword';
import SearchpgbarSearch from '../screens/home/SearchpgbarSearch';
import Passpurchase from '../screens/home/Passpurchase';
import Shop from '../screens/home/Shop';
import Wallet from '../screens/home/Wallet';
import Camerascr from '../screens/home/Camerascr';
import Yourpasses from '../screens/home/Yourpasses';
import CardEdit from '../screens/home/CardEdit';
import InviteFriends from '../screens/home/InviteFriends';
import UpdateName from '../screens/home/UpdateName';
import messaging from '@react-native-firebase/messaging';
import {Platform, PermissionsAndroid} from 'react-native';
import {storeFcmToken} from '../redux/reducer/AuthReducer';
import Signup2 from '../screens/auth/Signup2';
const StackNav = props => {
  const dispatch = useDispatch();
  const Stack = createStackNavigator();
  const AuthReducer = useSelector(state => state.AuthReducer);
  console.log(AuthReducer?.isLoading);
  React.useEffect(() => {
    requestUserPermission();
  }, []);
  async function requestUserPermission() {
    if (Platform.OS == 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      console.log('Authorization status:', authStatus);
      if (enabled) {
        checkToken();
      }
    } else {
      const grant = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (grant) {
        checkToken();
      }
      console.log('grant', grant);
    }
  }

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();

    if (fcmToken) {
      dispatch(storeFcmToken(fcmToken));
    }
  };
  console.log('------ReducerFCM', AuthReducer?.fcmResponse);

  React.useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled', remoteMessage);
    });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log(remoteMessage);
    });
    return unsubscribe;
  }, []);
  const mytheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
    },
  };

  const Screens =
    AuthReducer?.getTokenResponse == null
      ? {
          Landing: Landing,
          Signin: Signin,
          Signup: Signup,
          ChangePassword: ChangePassword,
          Enterotp: Enterotp,
          ForgotPass: ForgotPass,
          Signup2:Signup2
        }
      : {
          TabNavigator: TabNavigator,
          Passpurchase: Passpurchase,
          Wallet: Wallet,
          Security: Security,
          SearchpgbarSearch: SearchpgbarSearch,
          Shop: Shop,
          Cmspage: Cmspage,
          Camerascr: Camerascr,
          Passpurchase: Passpurchase,
          Yourpasses: Yourpasses,
          CardEdit: CardEdit,
          InviteFriends: InviteFriends,
          UpdateName: UpdateName,
        };

  if (AuthReducer.isLoading) {
    return <Splash />;
  } else {
    return (
      <NavigationContainer theme={mytheme}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {Object.entries({
            ...Screens,
          }).map(([name, component]) => {
            return <Stack.Screen name={name} component={component} />;
          })}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default StackNav;
