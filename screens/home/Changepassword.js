import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import Modal from 'react-native-modal';
import Loader from '../../utils/helpers/Loader';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePicker from '../../components/DateTimePicker';
import MyStatusBar from '../../utils/MyStatusBar';
import {
  secureRequest,
  secureSuccess,
  secureFailure,
  secureClear,
} from '../../redux/reducer/ProfileReducer';
import moment from 'moment';

import FastImage from 'react-native-fast-image';
import {useIsFocused} from '@react-navigation/native';
import TextInputItem from '../../components/TextInputItem';

export default function Security(props) {
  let status = '';
  const isFocused = useIsFocused();

  const [password, setpassword] = useState('');
  const [iconvisible, seticonvisible] = useState(true);
  const [newpassword, setnewpassword] = useState('');
  const [newiconvisible, setnewiconvisible] = useState(true);
  const [newconfirmpassword, setnewconfirmpassword] = useState('');
  const [newconfirmiconvisible, setnewconfirmiconvisible] = useState(true);

  useEffect(() => {}, []);
  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  // if (status == '' || ProfileReducer.status != status) {
  //   console.log('Enter---');
  //   switch (ProfileReducer.status) {
  //     case 'Profile/secureRequest':
  //       status = ProfileReducer.status;
  //       break;

  //     case 'Profile/secureSuccess':
  //       status = ProfileReducer.status;
  //       showErrorAlert(ProfileReducer?.secureResponse?.message);
  //       props.navigation.goBack()
  //       setpassword('');
  //       setnewconfirmpassword('');
  //       setnewpassword('');
  //       console.log("---here1");
  //       dispatch(secureClear());
  //       break;
  //     case 'Profile/secureFailure':
  //       status = ProfileReducer.status;
  //   console.log("---here");
  //       showErrorAlert('Check Your Fields');
  //       break;
  //   }
  // }
  function changepasswordfunction() {
    if (password == '') {
      showErrorAlert('Please enter old password');
    } else if (password.length < 8) {
      showErrorAlert('Please enter atleast 8 character old password');
    }
    if (newpassword == '') {
      showErrorAlert('Please enter new password');
    } else if (password == newpassword) {
      showErrorAlert('Old password and new password must be different');
    } else if (newpassword.length < 8) {
      showErrorAlert('Please enter atleast 8 character new password');
    } else if (newpassword != newconfirmpassword) {
      showErrorAlert('New password and confirm password must be same');
    } else {
      let obj = {
        old_password: password,
        new_password: newpassword,
        confirm_password: newconfirmpassword,
        navigation: props.navigation,
      };
      connectionrequest()
        .then(() => {
          console.log(obj);
          dispatch(secureRequest(obj));
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    }
  }

  //   useEffect(() => {
  // //     console.log('State Change', ProfileReducer.status);
  // //  if ( ProfileReducer.status === 'Profile/secureSuccess' ){
  // //   props.navigation.goBack();
  // //  }
  // //  else {
  // //   console.log("Failure");
  // //  }
  //     switch (ProfileReducer.status) {
  //       case 'Profile/secureRequest':
  //         break;
  //       case 'Profile/secureSuccess':
  //         props.navigation.goBack();
  //         break;
  //       case 'Profile/secureFailure':
  //         break;
  //     }
  //   }, [ProfileReducer.status]);
  //  useEffect(()=> {
  //   if (status == '' || ProfileReducer.status != status) {
  //     console.log('Enter---');
  //     switch (ProfileReducer.status) {
  //       case 'Profile/secureRequest':
  //         status = ProfileReducer.status;
  //         break;

  //       case 'Profile/secureSuccess':
  //         status = ProfileReducer.status;
  //         showErrorAlert(ProfileReducer?.secureResponse?.message);
  //         // props.navigation.goBack()
  //         setpassword('');
  //         setnewconfirmpassword('');
  //         setnewpassword('');
  //         console.log("---here1");
  //         dispatch(secureClear());
  //         break;
  //       case 'Profile/secureFailure':
  //         status = ProfileReducer.status;
  //     console.log("---here");
  //         showErrorAlert('Check Your Fields');
  //         break;
  //     }
  //   }
  //  },[ProfileReducer.status,isFocused])
  const STATUSBAR_HEIGHT = StatusBar.currentHeight;
  return (
    <>
      <MyStatusBar backgroundColor={'#060C30'} barStyle={'light-content'} />
      <SafeAreaView style={{backgroundColor: Colors.darkblue, flex: 1}}>
      <Loader visible={ProfileReducer.isLoading} />
      <View
        style={{
          height: normalize(60),
          flexDirection: 'row',
          justifyContent: 'space-between',

          alignItems: 'center',
          paddingHorizontal: normalize(15),
          backgroundColor: Colors.themeblue,
          marginTop: Platform.OS == 'android' ? STATUSBAR_HEIGHT : null,
        }}>
        <View
          style={{
            width: '90%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
             <TouchableOpacity
          style={{
            marginTop: normalize(6),
            height: normalize(30),
            width: normalize(30),
            borderRadius: normalize(6),
            backgroundColor: '#D73F9D',
            // alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: normalize(5),
          }}
          onPress={() => props.navigation.goBack('')}>
          <Image
            source={Icons.Arrow}
            resizeMode={'contain'}
            style={{
              height: normalize(6),
              width: normalize(8),
              transform: [{rotate: '90deg'}],

              marginHorizontal: normalize(15),
              tintColor: 'white',
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: Colors.white,
            fontFamily: Fonts.Poppins_Medium,
            fontSize: normalize(20),
            marginTop: normalize(6),
            marginRight: normalize(15),
          }}>
          Change <Text style={{color: '#D73F9D'}}>Password</Text>
        </Text>
          </View>
       
      </View>
      <ScrollView>
        <View style={{width: '90%', alignSelf: 'center'}}>
          <TextInputItem
            viewbordercolor="red"
            placeholder={'Enter old password'}
            width={'100%'}
            height={normalize(50)}
            borderWidth={1}
            marginTop={normalize(20)}
            value={password}
            onChangeText={val => setpassword(val)}
            textColor={Colors.white}
            placeholderTextColor={Colors.white}
            isRightIconVisible={true}
            fontSize={normalize(11)}
            rightimage={iconvisible ? Icons.hide : Icons.Show}
            onrightimpress={() => seticonvisible(!iconvisible)}
            isSecure={iconvisible}
          />
        </View>
        <View style={{width: '90%', alignSelf: 'center'}}>
          <TextInputItem
            viewbordercolor="red"
            placeholder={'Enter new password'}
            width={'100%'}
            height={normalize(50)}
            borderWidth={1}
            // marginTop={normalize(20)}
            value={newpassword}
            onChangeText={val => setnewpassword(val)}
            textColor={Colors.white}
            placeholderTextColor={Colors.white}
            isRightIconVisible={true}
            fontSize={normalize(11)}
            rightimage={newiconvisible ? Icons.hide : Icons.Show}
            onrightimpress={() => setnewiconvisible(!newiconvisible)}
            isSecure={newiconvisible}
          />
        </View>
        <View style={{width: '90%', alignSelf: 'center'}}>
          <TextInputItem
            viewbordercolor="red"
            placeholder={'Confirm new password'}
            width={'100%'}
            height={normalize(50)}
            borderWidth={1}
            // marginTop={normalize(20)}
            value={newconfirmpassword}
            onChangeText={val => setnewconfirmpassword(val)}
            textColor={Colors.white}
            placeholderTextColor={Colors.white}
            isRightIconVisible={true}
            fontSize={normalize(11)}
            rightimage={newconfirmiconvisible ? Icons.hide : Icons.Show}
            onrightimpress={() =>
              setnewconfirmiconvisible(!newconfirmiconvisible)
            }
            isSecure={newconfirmiconvisible}
          />
        </View>

        <TouchableOpacity
          // onPress={() => changepasswordfunction()}
          onPress={() => changepasswordfunction()}
          style={{
            backgroundColor: Colors.pink,
            width: '90%',
            padding: normalize(15),
            marginTop: normalize(20),
            borderRadius: normalize(10),
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: Colors.white,
              fontSize: normalize(14),
              fontFamily: Fonts.Poppins_Medium,
              textAlign: 'center',
            }}>
            Change Password
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
    </>
   
  );
}
