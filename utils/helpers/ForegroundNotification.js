import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
// import {useDispatch} from 'react-redux';
// import {badgeRequest} from '../../../redux/reducer/ProfileReducer';
// import Store from '../../../redux/Store';

const notificationArr = [];

export const notificationListner = navigation => {
  try {
    messaging().onNotificationOpenedApp(remoteMessage => {
      navigation.navigate('Account',{ screen: 'FriendsPge' });
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          navigation.navigate('Account',{ screen: 'FriendsPge' });
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
        }
        if (remoteMessage !== null) {
          console.log('remoteMessage................', remoteMessage);
        }
      });
    messaging().onMessage(async remoteMessage => {
      // Store.dispatch(badgeRequest(true));
      console.log('notification when app open.....', remoteMessage);
    });
  } catch (error) {
    console.log('notificationListner.....', error);
  }
};

export default notificationArr;
