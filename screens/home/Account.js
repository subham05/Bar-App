import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  PermissionsAndroid,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {Camera} from 'react-native-camera-kit';
import {
  InviteInfoRequest,
  addFriendRequest,
  friendSendRequest,
} from '../../redux/reducer/ProfileReducer';
import Loader from '../../utils/helpers/Loader';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Modal from 'react-native-modal';
import React, {useEffect, useState} from 'react';
import connectionrequest from '../../utils/helpers/NetInfo';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import showErrorAlert from '../../utils/helpers/Toast';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import QRCode from 'react-native-qrcode-svg';
import Tags from 'react-native-tags';
import CameraPicker from '../../components/CameraPicker';
import moment from 'moment';
import ButtonItems from '../../components/ButtonItems';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
// import ButtonItems from '../../components/ButtonItems';
import {useDispatch, useSelector} from 'react-redux';
import {storeFcmToken} from '../../redux/reducer/AuthReducer';
import {
  profileRequest,
  barVisitRequest,
  totalFriendRequest,
  profilePicUpdateRequest,
} from '../../redux/reducer/ProfileReducer';
import constants from '../../utils/helpers/constants';
import messaging from '@react-native-firebase/messaging';
export default function Account(props) {
  const [qrvalue1, setQrvalue] = useState('');
  const [opneScanner, setOpneScanner] = useState(false);

  const [cameraPicker, setCameraPicker] = useState(false);
  const [ProfilePicObj1, setProfilePicObj1] = useState('');
  const [ProfilePicUri1, setProfilePicUri1] = useState('');
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible20, setModalVisible20] = useState(false);
  const [press, setpress] = useState(false);
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  useEffect(() => {
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
  const UploadProfile = () => {
    let obj = new FormData();
    obj.append('image', ProfilePicObj1);
    console.log('----objUpload', obj);
    connectionrequest()
      .then(() => {
        dispatch(profilePicUpdateRequest(obj));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  };
  useEffect(() => {
    if (ProfilePicObj1 != '') {
      UploadProfile();
    }
  }, [ProfilePicObj1]);
  useEffect(() => {
    connectionrequest()
      .then(() => {
        dispatch(profileRequest());
        dispatch(barVisitRequest());
        dispatch(InviteInfoRequest());
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
    console.log('----', ProfileReducer?.profileResponse.full_name);
    onOpneScanner();
  }, []);
  useEffect(() => {
    if (ProfileReducer.status == 'Profile/addFriendSuccess') {
      console.log('Getting ID', ProfileReducer.addFriendResponse);
      setModalVisible20(true);
    } else if (ProfileReducer.status == 'Profile/profilePicUpdateSuccess') {
      dispatch(profileRequest());
    } else if (ProfileReducer.status == 'Profile/friendSendSuccess') {
      connectionrequest()
        .then(() => {
          dispatch(profileRequest());
          dispatch(barVisitRequest());
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    }
  }, [ProfileReducer.status]);
  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          paddingVertical: normalize(10),
          width: normalize(290),
          backgroundColor: '#0E1648',
          marginTop: normalize(10),
          borderRadius: normalize(10),
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: normalize(10),
          }}>
          <View
            style={{
              width: '60%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: normalize(48),
                width: normalize(48),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
                backgroundColor: '#262D5A',
              }}>
              {item.user_image ? (
                <Image
                  source={{uri: `${constants.IMAGE_URL}${item.user_image}`}}
                  resizeMode="cover"
                  style={{
                    borderColor: '#D73F9D',
                    borderWidth: 1,
                    height: normalize(42),
                    width: normalize(42),
                    borderRadius: 30,
                  }}
                />
              ) : (
                <Image
                  source={Icons.DefaultProfile}
                  resizeMode="cover"
                  style={{
                    borderColor: '#D73F9D',
                    borderWidth: 1,
                    borderRadius: 30,
                    height: normalize(42),
                    width: normalize(42),
                  }}
                />
              )}
            </View>

            <Text
              style={{
                fontSize: normalize(14),
                color: '#2AE8AB',

                fontWeight: '600',
                marginLeft: normalize(10),
              }}>
              {item?.user_first_name} {item?.user_last_name}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              width: '40%',
              paddingLeft: normalize(6),
            }}>
            <Text
              style={{
                fontSize: normalize(11),
                color: '#fff',

                marginBottom: normalize(5),
                textAlign: 'right',
                // fontWeight: '700',
                fontFamily: Fonts.Poppins_SemiBold,
              }}>
              {item?.bar_owner_first_name} {item?.bar_owner_last_name}
            </Text>
            <Text
              style={{
                fontSize: normalize(10),
                color: '#2AE8AB',
                fontWeight: '600',
                marginLeft: normalize(20),
              }}>
              {moment(new Date(item?.last_visit_time)).fromNow()}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  // const onSwipe = (gestureName, gestureState) => {
  //   const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
  //   console.log('gesture name', gestureName);
  //   console.log('gesture gestureState', gestureState);
  //   if (gestureName == 'SWIPE_RIGHT') {
  //     setpress(false);
  //   }
  //   if (gestureName == 'SWIPE_LEFT') {
  //     setpress(true);
  //   }
  //   // setState({gestureName: gestureName});
  //   // switch (gestureName) {
  //   //   case SWIPE_UP:
  //   //     this.setState({backgroundColor: 'red'});
  //   //     break;
  //   //   case SWIPE_DOWN:
  //   //     this.setState({backgroundColor: 'green'});
  //   //     break;
  //   //   case SWIPE_LEFT:
  //   //     this.setState({backgroundColor: 'blue'});
  //   //     break;
  //   //   case SWIPE_RIGHT:
  //   //     this.setState({backgroundColor: 'yellow'});
  //   //     break;
  //   // }
  // };
  // const config = {
  //   velocityThreshold: 0.1,
  //   directionalOffsetThreshold: 80,
  // };
  const STATUSBAR_HEIGHT = StatusBar.currentHeight;

  const onBarcodeScan = qrvalue => {
    setModalVisible2(false);
    let obj = new FormData();
    obj.append('user_id', qrvalue);
    connectionrequest()
      .then(() => {
        dispatch(addFriendRequest(obj));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });

    // Called after te successful scanning of QRCode/Barcode
  };

  const onOpneScanner = () => {
    // To Start Scanning

    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs permission for camera access',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            setQrvalue('');
            setOpneScanner(true);
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission err', err);
          console.warn(err);
        }
      }
      // Calling the camera permission function
      requestCameraPermission();
    } else {
      setQrvalue('');
      setOpneScanner(true);
    }
  };
  function sendFriendRequest() {
    let obj = new FormData();
    obj.append('friend_id', ProfileReducer?.addFriendResponse?.id);
    obj.append('device_token', AuthReducer?.fcmResponse);
    obj.append('device_type', Platform.OS);
    connectionrequest()
      .then(() => {
        dispatch(friendSendRequest(obj));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
    setTimeout(() => {
      setModalVisible20(false);
    }, 1500);
  }
  return (
    <>
      <MyStatusBar backgroundColor={'#060C30'} barStyle={'light-content'} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#030721'}}>
        <Loader
          visible={
            ProfileReducer.status == 'Profile/profileRequest' ||
            ProfileReducer.status == 'Profile/totalFriendRequest' ||
            ProfileReducer.status == 'Profile/barVisitRequest'
          }
        />

        <View
          style={{
            flexDirection: 'row',
            height: normalize(55),
            width: '100%',
            backgroundColor: '#060C30',
            marginTop: Platform.OS == 'android' ? STATUSBAR_HEIGHT : null,
            // alignItems: 'center',

            // justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: normalize(22),
                fontWeight: '500',
                alignSelf: 'center',
                fontFamily: Fonts.Poppins_Medium,
                marginLeft: normalize(125),
              }}>
              Profile
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Settings')}>
              <Image
                source={Icons.Settings}
                style={{
                  height: normalize(22),
                  width: normalize(22),
                  marginLeft: normalize(85),
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: normalize(15),
            }}>
            <View style={{alignItems: 'center', width: '33.33%'}}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('FriendsPge')}
                style={{
                  height: normalize(72),
                  width: normalize(72),
                  borderRadius: normalize(36),
                  backgroundColor: '#0E1648',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={Icons.friends}
                  style={{height: normalize(26), width: normalize(30)}}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#B9A4F4',
                  fontSize: normalize(16),
                  fontWeight: '500',
                  fontFamily: Fonts.Poppins_Medium,
                  marginVertical: normalize(5),
                }}>
                Friends
              </Text>
              <Text
                style={{
                  color: '#FF58BF',
                  fontSize: normalize(22),
                  fontWeight: '500',
                  fontFamily: Fonts.Poppins_Medium,
                }}>
                {ProfileReducer?.profileResponse?.friend_count}
              </Text>
            </View>
            <View style={{alignItems: 'center', width: '33.33%'}}>
              {ProfileReducer?.profileResponse.user?.profile_photo_path ? (
                <Image
                  source={{
                    uri:
                      constants.IMAGE_URL +
                      ProfileReducer?.profileResponse.user?.profile_photo_path,
                  }}
                  style={{
                    borderColor: '#1D2660',
                    borderWidth: 5,
                    height: normalize(100),
                    width: normalize(100),
                    resizeMode: 'cover',
                    borderRadius: normalize(60),
                  }}
                />
              ) : (
                <Image
                  source={Icons.DefaultProfile}
                  style={{
                    borderColor: '#1D2660',
                    borderWidth: 5,
                    height: normalize(100),
                    width: normalize(100),
                    resizeMode: 'cover',
                    borderRadius: normalize(60),
                  }}
                />
              )}
              <TouchableOpacity
                onPress={() => setCameraPicker(true)}
                style={{
                  marginTop: normalize(-15),
                  backgroundColor: '#1D2660',
                  height: normalize(26),
                  width: normalize(26),
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{height: normalize(14), width: normalize(14)}}
                  source={Icons.EditIcon}
                />
              </TouchableOpacity>

              <Text
                style={{
                  color: '#B9A4F4',
                  fontSize: normalize(16),
                  fontWeight: '500',
                  textAlign: 'center',
                  fontFamily: Fonts.Poppins_Medium,
                  marginTop: normalize(10),
                }}>
                {ProfileReducer?.profileResponse?.user?.full_name}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible2(!isModalVisible2)}>
                <Image
                  source={Icons.QR}
                  resizeMode="contain"
                  style={{
                    height: normalize(40),
                    width: normalize(40),
                    marginVertical: normalize(10),
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#B9A4F4',
                  fontSize: normalize(14),
                  fontWeight: '500',
                  fontFamily: Fonts.Poppins_Medium,
                  textAlign: 'center',
                }}>
                Profile ID: {ProfileReducer?.profileResponse?.user?.user_name}
              </Text>
            </View>

            <View style={{alignItems: 'center', width: '33.33%'}}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('BarVisitedPage')}
                style={{
                  height: normalize(72),
                  width: normalize(72),
                  borderRadius: normalize(36),
                  backgroundColor: '#0E1648',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={Icons.BARV}
                  style={{height: normalize(27), width: normalize(13)}}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#B9A4F4',
                  fontSize: normalize(16),
                  fontWeight: '500',
                  fontFamily: Fonts.Poppins_Medium,
                  marginVertical: normalize(5),
                }}>
                Bars Visited
              </Text>
              <Text
                style={{
                  color: '#FF58BF',
                  fontSize: normalize(22),
                  fontWeight: '500',
                  fontFamily: Fonts.Poppins_Medium,
                }}>
                {ProfileReducer?.profileResponse?.bar_visit}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: normalize(22),
                fontWeight: '500',
                fontFamily: Fonts.Poppins_Bold,
                textAlign: 'center',
                marginVertical: normalize(18),
              }}>
              Feed
            </Text>
          </View>
          <Text
            style={{
              color: '#fff',
              // flex: 1,

              alignSelf: 'flex-end',
              marginRight: normalize(40),
              fontFamily: Fonts.Poppins_Medium,
            }}>
            Checked into:
          </Text>
          <Modal
            isVisible={isModalVisible2}
            onBackdropPress={() => setModalVisible2(false)}>
            <View
              style={{
                height: normalize(410),
                width: normalize(255),
                backgroundColor: '#08103A',
                alignSelf: 'center',
                overflow: 'hidden',
                zIndex: 9999,
                borderRadius: normalize(10),
              }}>
              <View
                style={{
                  height: normalize(50),
                  width: normalize(255),
                  backgroundColor: '#D73F9D',
                  alignSelf: 'center',
                  borderTopRightRadius: normalize(10),
                  borderTopLeftRadius: normalize(10),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => setModalVisible2(!isModalVisible2)}
                  style={{
                    height: normalize(30),
                    width: normalize(30),
                    borderRadius: normalize(5),
                    backgroundColor: '#E95AB2',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: normalize(15),
                  }}>
                  <Image
                    source={Icons.Arrow}
                    resizeMode="contain"
                    style={{
                      height: normalize(6),
                      width: normalize(10),
                      transform: [{rotate: '90deg'}],
                      tintColor: 'white',
                    }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: normalize(18),
                    fontWeight: '600',
                    paddingHorizontal: normalize(40),
                  }}>
                  Add A Friend
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setpress(!press)}
                style={{
                  width: normalize(150),
                  paddingHorizontal: normalize(2),
                  height: normalize(30),
                  backgroundColor: '#161F5C',
                  borderRadius: normalize(10),
                  // paddingHorizontal: normalize(6),
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'center',
                  // justifyContent: 'space-between',
                  marginTop: normalize(20),
                }}>
                <TouchableOpacity
                  onPress={() => setpress(false)}
                  style={{
                    height: '80%',
                    width: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: press == false ? '#495080' : '#161F5C',
                    borderBottomLeftRadius: normalize(7),
                    borderTopStartRadius: normalize(7),
                    borderTopRightRadius: normalize(7),
                    borderBottomRightRadius: normalize(7),
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: normalize(14),
                      fontWeight: '600',
                      fontFamily: Fonts.Poppins_Medium,
                    }}>
                    Code
                  </Text>
                </TouchableOpacity>
                {/* <View
                  style={{
                    height: normalize(25),
                    width: normalize(70),
                    backgroundColor: '#495080',
                    borderRadius: normalize(8),
                    marginLeft: press == true ? normalize(125) : normalize(60),
                    alignItems: 'center',
                    justifyContent: 'center',
                    // position: 'absolute',
                    // top: Platform.OS == 'ios' ? 94 : 89,
                  }}>
                  {press == false && (
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: normalize(14),
                        fontWeight: '600',
                        fontFamily: Fonts.Poppins_Medium,
                      }}>
                      Code
                    </Text>
                  )}
                  {press == true && (
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: normalize(14),
                        fontWeight: '600',
                        fontFamily: Fonts.Poppins_Medium,
                      }}>
                      Scan
                    </Text>
                  )}
                </View> */}
                <TouchableOpacity
                  onPress={() => setpress(true)}
                  style={{
                    height: '80%',
                    width: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: press ? '#495080' : '#161F5C',
                    borderBottomLeftRadius: normalize(7),
                    borderTopStartRadius: normalize(7),
                    borderTopRightRadius: normalize(7),
                    borderBottomRightRadius: normalize(7),
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: normalize(14),
                      fontWeight: '600',
                      fontFamily: Fonts.Poppins_Medium,
                    }}>
                    Scan
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>

              {press == false && (
                <Swipeable onSwipeableOpen={'right'}>
                  {/* <Image
                    source={Icons.frndqr}
                    resizeMode="contain"
                    style={{
                      height: normalize(180),
                      width: normalize(180),
                      // marginVertical: normalize(40),
                      // backgroundColor: 'red',
                    }}
                  /> */}
                  <View
                    style={{
                      height: normalize(270),
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: normalize(20),
                    }}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        padding: 20,
                        borderRadius: normalize(10),
                      }}>
                      <QRCode
                        logo={{
                          uri:
                            constants.IMAGE_URL +
                            ProfileReducer?.profileResponse.user
                              ?.profile_photo_path,
                        }}
                        logoBorderRadius={60}
                        logoBackgroundColor={'#161F5C'}
                        logoSize={60}
                        size={normalize(170)}
                        value={ProfileReducer?.profileResponse?.qr_id}
                      />
                    </View>
                  </View>
                </Swipeable>
              )}
              {/* {press == true && (
                <Text
                  style={{
                    fontSize: normalize(18),
                    color: '#fff',
                    alignSelf: 'center',
                    marginVertical: normalize(30),
                  }}>
                  Scan here to add friends
                </Text>
              )} */}

              {/* <Image
                source={Icons.arrow2}
                resizeMode="contain"
                style={{
                  height: normalize(20),
                  width: normalize(80),
                  marginVertical: normalize(10),
                  alignSelf: 'center',
                  tintColor: '#fff',
                }}
              /> */}
              {press == true && (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View
                    style={{
                      width: normalize(230),
                      height:
                        Platform.OS == 'android'
                          ? normalize(210)
                          : normalize(270),
                      borderRadius: normalize(10),
                      backgroundColor: '#333F8F',
                      alignItems: 'center',

                      zIndex: 9999,
                      overflow: 'hidden',
                      marginTop: normalize(15),
                      borderWidth: normalize(2),
                      borderColor: '#161F5C',
                      marginBottom: normalize(15),
                    }}>
                    {opneScanner ? (
                      <Camera
                        style={
                          Platform.OS == 'android'
                            ? {
                                position: 'absolute',
                                width: '100%',
                                height: normalize(250),
                                left: 0,
                                top: normalize(-40),
                                bottom: 0,
                                zIndex: 9999,
                              }
                            : {width: '100%', height: '100%'}
                        }
                        ratioOverlay={'1:1'}
                        cameraRatioOverlay={undefined}
                        captureButtonImage={undefined}
                        captureButtonImageStyle={{}}
                        cameraFlipImage={undefined}
                        cameraFlipImageStyle={{}}
                        // Show/hide scan frame
                        scanBarcode={true}
                        // Can restrict for the QR Code only
                        laserColor={'blue'}
                        // Color can be of your choice
                        frameColor={'yellow'}
                        // If frame is visible then frame color
                        colorForScannerFrame={'black'}
                        // Scanner Frame color
                        onReadCode={event => {
                          onBarcodeScan(event.nativeEvent.codeStringValue);
                          console.log(
                            '----',
                            event.nativeEvent.codeStringValue,
                          );
                        }}
                      />
                    ) : (
                      <Text
                        style={{
                          color: Colors.white,
                          fontFamily: Fonts.Poppins_Regular,
                          marginTop: normalize(80),
                        }}>
                        Please Allow Permission
                      </Text>
                    )}
                  </View>
                </View>
              )}
              {/* </GestureRecognizer> */}
            </View>
          </Modal>
          {ProfileReducer?.profileResponse?.feed?.length > 0 ? (
            <FlatList
              data={ProfileReducer?.profileResponse?.feed}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{paddingBottom: normalize(80)}}
            />
          ) : (
            <Text
              style={{
                color: '#fff',
                alignSelf: 'center',
                fontFamily: Fonts.Poppins_Medium,
                fontSize: normalize(14),
                marginTop: normalize(20),
              }}>
              No friends have checked into a bar
            </Text>
          )}
          <Modal
            isVisible={isModalVisible20}
            onBackdropPress={() => setModalVisible20(false)}>
            <KeyboardAvoidingView
              style={{flexGrow: 1}}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
              <ScrollView
                keyboardShouldPersistTaps="always"
                style={{flexGrow: 1}}
                contentContainerStyle={{
                  justifyContent: 'center',
                  flexGrow: 1,
                  paddingVertical: normalize(40),
                }}>
                <View
                  style={{
                    width: normalize(280),
                    backgroundColor: '#08103A',
                    alignSelf: 'center',
                    paddingBottom: normalize(15),
                    borderRadius: normalize(10),
                  }}>
                  <View
                    style={{
                      height: normalize(50),
                      width: normalize(280),
                      backgroundColor: '#D73F9D',
                      alignSelf: 'center',
                      borderTopRightRadius: normalize(10),
                      borderTopLeftRadius: normalize(10),
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => setModalVisible20(!isModalVisible20)}
                      style={{
                        height: normalize(30),
                        width: normalize(30),
                        borderRadius: normalize(5),
                        backgroundColor: '#E95AB2',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: normalize(15),
                      }}>
                      <Image
                        source={Icons.Arrow}
                        resizeMode={'contain'}
                        style={{
                          height: normalize(8),
                          width: normalize(8),
                          transform: [{rotate: '90deg'}],
                          tintColor: '#fff',
                        }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: normalize(18),
                        fontWeight: '600',
                        paddingHorizontal: normalize(20),
                      }}>
                      Searched Account
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: normalize(10),
                      justifyContent: 'space-between',
                    }}>
                    <View style={{alignItems: 'center', width: '30%'}}>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(12),
                          fontFamily: Fonts.Poppins_SemiBold,
                        }}>
                        Friends :
                      </Text>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(22),
                          fontFamily: Fonts.Poppins_SemiBold,
                          textAlign: 'center',
                        }}>
                        {ProfileReducer?.addFriendResponse?.total_friend}
                      </Text>
                    </View>
                    <View style={{alignItems: 'center', width: '40%'}}>
                      <View
                        style={{
                          width: normalize(86),
                          height: normalize(86),
                          backgroundColor: '#21284E',
                          borderRadius: 80,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {ProfileReducer?.addFriendResponse
                          ?.profile_photo_path != null ? (
                          <Image
                            style={{
                              height: normalize(75),
                              width: normalize(75),
                              borderColor: '#E95AB2',
                              borderWidth: 1,
                              borderRadius: 80,
                              resizeMode: 'cover',
                            }}
                            source={{
                              uri: `${constants.IMAGE_URL}${ProfileReducer?.addFriendResponse?.profile_photo_path}`,
                            }}
                          />
                        ) : (
                          <Image
                            style={{
                              height: normalize(75),
                              width: normalize(75),
                              borderColor: '#E95AB2',
                              borderWidth: 1,
                              borderRadius: 80,
                              resizeMode: 'cover',
                            }}
                            source={Icons.DefaultProfile}
                          />
                        )}
                      </View>
                      <Text
                        style={{
                          fontFamily: Fonts.Poppins_SemiBold,
                          color: '#B9A4F4',
                          fontSize: normalize(16),
                          textAlign: 'center',
                          marginTop: normalize(3),
                        }}>
                        {ProfileReducer?.addFriendResponse?.full_name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: Fonts.Poppins_Regular,
                          color: '#B9A4F4',
                          fontSize: normalize(10),
                          textAlign: 'center',
                          marginTop: normalize(3),
                        }}>
                        {ProfileReducer?.addFriendResponse?.user_name ||
                          'Not Available'}
                      </Text>
                    </View>
                    <View style={{alignItems: 'center', width: '30%'}}>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(12),
                          fontFamily: Fonts.Poppins_SemiBold,
                          textAlign: 'center',
                        }}>
                        Bars Visited :
                      </Text>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(22),
                          fontFamily: Fonts.Poppins_SemiBold,
                        }}>
                        {ProfileReducer?.addFriendResponse?.user_visits_count}
                        {/* {modalData?.friends_count} */}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontFamily: Fonts.Poppins_SemiBold,
                      color: Colors.white,
                      fontSize: normalize(15),
                      textAlign: 'center',
                      marginVertical: normalize(6),
                    }}>
                    Do you want to send a friend request?
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: normalize(15),
                      marginTop: normalize(10),
                    }}>
                    <TouchableOpacity
                      onPress={() => setModalVisible20(!isModalVisible20)}
                      style={{
                        height: normalize(42),
                        borderRadius: normalize(10),
                        backgroundColor: '#EC41AB',
                        width: '48%',
                        borderColor: '#241453',
                        borderWidth: 2,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          height: normalize(11),
                          width: normalize(20),
                          resizeMode: 'contain',
                        }}
                        source={Icons.uncheckWhite}
                      />
                      <Text
                        style={{
                          fontFamily: Fonts.Poppins_SemiBold,
                          color: Colors.white,
                          fontSize: normalize(16),
                        }}>
                        Ignore
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => sendFriendRequest()}
                      style={{
                        height: normalize(42),
                        borderRadius: normalize(10),
                        backgroundColor: '#2AE8AB',
                        marginLeft: normalize(10),
                        width: '48%',
                        borderColor: '#241453',
                        borderWidth: 2,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          height: normalize(11),
                          width: normalize(20),
                          resizeMode: 'contain',
                        }}
                        source={Icons.checkWhite}
                      />
                      <Text
                        style={{
                          fontFamily: Fonts.Poppins_SemiBold,
                          color: Colors.white,
                          fontSize: normalize(16),
                        }}>
                        Confirm
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </Modal>
        </ScrollView>
        <CameraPicker
          pickerVisible={cameraPicker}
          onBackdropPress={() => setCameraPicker(false)}
          btnClick_cameraUpload={imgObj => {
            console.log(imgObj);
            setProfilePicObj1(imgObj);
            setProfilePicUri1(imgObj.uri);
            setCameraPicker(false);
          }}
          btnClick_galeryUpload={imgObj => {
            console.log(imgObj);
            setProfilePicObj1(imgObj);
            setProfilePicUri1(imgObj.uri);
            setCameraPicker(false);
          }}
        />
      </SafeAreaView>
    </>
  );
}
