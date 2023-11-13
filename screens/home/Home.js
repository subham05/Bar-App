import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  ImageBackground,
  FlatList,
  Platform,
  TextInput,
  Linking,
  StyleSheet,
  AppState,
  PanResponder,
  Animated,
} from 'react-native';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {Slider} from '@miblanchard/react-native-slider';
import {Colors} from '../../themes/ImagePath';
import Loader from '../../utils/helpers/Loader';
import Geolocation from 'react-native-geolocation-service';
import {useIsFocused} from '@react-navigation/native';
import MapView, {Polygon, PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker, Callout} from 'react-native-maps';
import React, {useEffect, useState, useCallback, useMemo, useRef} from 'react';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import moment from 'moment';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import ButtonItems from '../../components/ButtonItems';
import {notificationListner} from '../../utils/helpers/ForegroundNotification';
import {Fonts} from '../../themes/ImagePath';
import {Icons} from '../../themes/ImagePath';
import Modal from 'react-native-modal';
import ColorText from '../../components/ColorText';
import {useDispatch, useSelector} from 'react-redux';
import LineHead from '../../components/LineHead';
import MapViewDirections from 'react-native-maps-directions';
import {
  userHomeRequest,
  currentBarRequest,
  checkInRequest,
  favouriteRequest,
  yourPassesRequest,
  passRedeemRequest,
  passRefundRequest,
  permissionData,
  shortDistanceRequest,
  appEnterRequest,
  trendReq,
  requestPass,
  enterBarRequest,
} from '../../redux/reducer/HomeReducer';
import constants from '../../utils/helpers/constants';
import {profileRequest} from '../../redux/reducer/ProfileReducer';
import {hasLocationPermission} from '../../utils/helpers/Common';
import {getDistance} from 'geolib';
import {SafeAreaView} from 'react-native-safe-area-context';
import {logoutRequest} from '../../redux/reducer/AuthReducer';
export default function Home(props) {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [grant, setGrant] = useState(false);
  const [currentID, setcurrentID] = useState();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const HomeReducer = useSelector(state => state.HomeReducer);
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const STATUSBAR_HEIGHT = StatusBar.currentHeight;
  const [percentage, setPercentage] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(undefined);
  const [currentLatitude, setCurrentLatitude] = useState(undefined);
  const [locdata, setLockData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisiblecurr, setModalVisibleCurr] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);
  const [isModalVisible4, setModalVisible4] = useState(false);
  const [isModalVisible5, setModalVisible5] = useState(false);
  const [isModalVisible6, setModalVisible6] = useState(false);

  const [pop, setPopup] = useState(false);
  const [modalData, setModalData] = useState();
  const [barIds, setBarIds] = useState([]);
  const [line, setLine] = useState(1);
  const [reason, setReason] = useState('');
  const [logoutModal, setLogoutModal] = useState(false);
  console.log(
    'logout======>',
    ProfileReducer?.profileResponse?.user?.is_previous_user,
  );
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (Platform.OS == 'ios') {
          locationPop();
          requestLocationPermission();
        }

        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);
  function handleFavourite(id, status) {
    console.log('---favourite tap=====>', id, status);
    if (status == 1) {
      var newStatus = 0;
    } else {
      var newStatus = 1;
    }
    let obj = new FormData();
    obj.append('bar_owner_id', id);
    obj.append('is_fav', newStatus);
    console.log('appended', obj);
    dispatch(favouriteRequest(obj));
  }
  useEffect(() => {
    if (HomeReducer.status == 'Home/favouriteSuccess') {
      enterHome();
    } else if (HomeReducer.status == 'Home/enterBarSuccess') {
      showErrorAlert('Thank you for checking in');
      let obj1 = new FormData();
      obj1.append('bar_owner_id', currentID);
      connectionrequest()
        .then(() => {
          dispatch(currentBarRequest(obj1));
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    }
  }, [HomeReducer.status]);
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
      // subscribeLocationLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        console.log('grante', granted);
        dispatch(permissionData(granted));
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('entering');
          //To Check, If Permission is granted
          getOneTimeLocation();
          // subscribeLocationLocation();
        } else {
          setLocationStatus('Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  const getOneTimeLocation = () => {
    console.log('geo enter');
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      position => {
        setLocationStatus('You are Here');
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setLockData([currentLatitude, currentLongitude]);
        setCurrentLatitude(currentLatitude);
        setCurrentLongitude(currentLongitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
    try {
      request(
        Platform.select({
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
        }),
      ).then(res => {
        console.log('granted', res);
        if (res == 'granted') {
          setGrant(true);
        } else {
          setGrant(false);
          // console.log("Location is not enabled");
        }
      });
    } catch (error) {
      console.log('location set error:', error);
    }
  };
  useEffect(() => {
    // getFilterStore();
    enter();
  }, []);
  useEffect(() => {
    console.log('if user entering', locdata);
    enterHome();
  }, [locdata]);

  async function locationPop() {
    let popup;
    popup = await hasLocationPermission();
    console.log('popupdata-----------------------', popup);
    setPopup(popup);
  }
  useEffect(() => {
    console.log('refresh', pop);
    if (pop === true) {
      console.log('entering');
      requestLocationPermission();
    }
  }, [pop]);
  useEffect(() => {
    locationPop();
  }, []);
  useEffect(() => {
    notificationListner(props.navigation);
    if (currentLatitude == undefined && pop) {
      getOneTimeLocation();
    }
  }, [isFocused]);
  function enter() {
    let obj = new FormData();
    obj.append('device_type', Platform.OS);
    obj.append('device_token', AuthReducer.getTokenResponse);

    connectionrequest()
      .then(() => {
        dispatch(yourPassesRequest());
        dispatch(profileRequest());
        console.log('calllllllldasdas', AuthReducer.getTokenResponse);
        if (
          HomeReducer.appEnterResponse == false &&
          AuthReducer.getTokenResponse != null
        ) {
          console.log('callllllll');
          dispatch(appEnterRequest(obj));
        }
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }
  function enterHome() {
    let obj = new FormData();
    obj.append('lat', locdata[0]);
    obj.append('long', locdata[1]);

    console.log('address', obj);
    connectionrequest()
      .then(() => {
        dispatch(userHomeRequest(obj));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }

  useEffect(() => {
    if (HomeReducer.status == 'Home/userHomeSuccess') {
      console.log('entering');
      setBarIds(HomeReducer.userHomeResponse.bar_owner);
      if (HomeReducer.userHomeResponse.bar_owner.length > 0) {
        dispatch(
          shortDistanceRequest([
            HomeReducer.userHomeResponse.bar_owner,
            locdata,
          ]),
        );
      }
    }
  }, [HomeReducer.status]);

  const [DATA, setData] = useState([
    {
      id: 0,
      imagePro1: Icons.humanIcon,
      imagePro2: Icons.shyicon,
      status: 'None',
      number: 3,
    },
    {
      id: 1,
      imagePro1: Icons.humanIcon,
      imagePro2: Icons.shyicon,
      status: '',
      number: 10,
    },
    {
      id: 2,
      imagePro1: Icons.humanIcon,
      imagePro2: Icons.shyicon,
      status: 'Short',
      number: 20,
    },
    {
      id: 3,
      imagePro1: Icons.humanIcon,
      imagePro2: Icons.shyicon,
      status: '',
      number: 28,
    },
    {
      id: 4,
      imagePro1: Icons.humanIcon,
      imagePro2: Icons.shyicon,
      status: '',
      number: 37,
    },
    {
      id: 5,
      imagePro1: Icons.humanIcon,
      imagePro2: Icons.shyicon,
      status: 'Medium',
      number: 45,
    },
    {
      id: 6,
      imagePro1: Icons.humanIcon,
      imagePro2: Icons.shyicon,
      status: '',
      number: 53,
    },
    {
      id: 7,
      imagePro1: Icons.humanIcon,
      imagePro2: Icons.shyicon,
      status: '',
      number: 62,
    },
    {
      id: 8,
      imagePro1: Icons.humanIcon,
      imagePro2: Icons.shyicon,
      status: 'Long',
      number: 70,
    },
    {
      id: 9,
      imagePro1: Icons.humanIcon,
      imagePro2: Icons.shyicon,
      status: '',
      number: 79,
    },
    {
      id: 10,
      imagePro1: Icons.humanIcon,
      imagePro2: Icons.shyicon,
      status: '',
      number: 88,
    },
    {
      id: 11,
      imagePro1: Icons.humanIcon,
      imagePro2: Icons.shyicon,
      status: 'Very Long',
      number: 100,
    },
  ]);
  const MapComp = useCallback(() => {
    return (
      <MapView
        customMapStyle={constants.MAPSTYLE}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{width: '100%', height: '100%'}}
        zoomEnabled={true}
        region={{
          latitude: parseFloat(currentLatitude),
          longitude: parseFloat(currentLongitude),
          latitudeDelta: 0.06,
          longitudeDelta: 0.01,
        }}>
        {console.log('Refresh')}
        {HomeReducer?.userHomeResponse?.bar_owner?.map((item, index) => (
          <Marker
            zIndex={index + 1}
            onPress={() =>
              props.navigation.navigate('SearchBarpassnotAvail', {
                id: item.id,
              })
            }
            coordinate={{
              latitude: parseFloat(item?.lat),
              longitude: parseFloat(item?.long),
            }}>
            <TouchableOpacity
              style={{alignItems: 'center', width: normalize(100)}}>
              <ImageBackground
                resizeMode="contain"
                style={{
                  height: normalize(50),
                  width: normalize(40),
                  resizeMode: 'contain',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                source={Icons.CustomMark}>
                {ProfileReducer?.profileResponse?.friend_count >= 5 ? (
                  <Text
                    style={{
                      color: '#2AE8AB',
                      fontFamily: Fonts.Poppins_Bold,
                      fontSize: normalize(12),
                      marginBottom: normalize(8),
                    }}>
                    {item.friends_count}
                  </Text>
                ) : (
                  <Image
                    style={{
                      height: normalize(14),
                      width: normalize(14),
                      resizeMode: 'contain',
                      tintColor: '#2AE8AB',
                      marginBottom: normalize(10),
                    }}
                    source={Icons.lockFriends}
                  />
                )}
              </ImageBackground>
              <Text
                style={{
                  color: 'white',
                  fontFamily: Fonts.Poppins_Medium,
                  fontSize: normalize(10),
                  textAlign: 'center',
                }}>
                {item.full_name}
              </Text>
            </TouchableOpacity>
          </Marker>
        ))}
        <Marker
          coordinate={{
            latitude: parseFloat(currentLatitude),
            longitude: parseFloat(currentLongitude),
          }}
          zIndex={99}>
          <View
            style={{
              height: normalize(60),
              width: normalize(60),
              backgroundColor: 'rgba(215,63,157,0.15)',
              borderRadius: 70,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: normalize(50),
                width: normalize(50),
                backgroundColor: 'rgba(215,63,157,0.25)',
                borderRadius: 70,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {ProfileReducer?.profileResponse?.user?.profile_photo_path ? (
                <Image
                  style={{
                    borderColor: 'white',
                    borderWidth: 2,
                    height: normalize(40),
                    width: normalize(40),
                    borderRadius: 50,
                  }}
                  source={{
                    uri:
                      constants.IMAGE_URL +
                      ProfileReducer?.profileResponse?.user?.profile_photo_path,
                  }}
                />
              ) : (
                <Image
                  source={Icons.DefaultProfile}
                  style={{
                    borderColor: 'white',
                    borderWidth: 2,
                    height: normalize(40),
                    width: normalize(40),
                    borderRadius: 50,
                  }}
                />
              )}
            </View>
          </View>
        </Marker>
      </MapView>
    );
  }, [
    pop,
    currentLatitude,
    currentLongitude,
    HomeReducer?.userHomeResponse?.bar_owner,
    ProfileReducer?.profileResponse?.user,
  ]);

  const renderItem1 = ({item, index}) => {
    return (
      <View
        style={{
          width: normalize(290),
          backgroundColor: '#0E1648',
          borderRadius: normalize(12),
          marginTop: normalize(8),
          alignSelf: 'center',
          // alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: normalize(6),
            justifyContent: 'space-between',
            marginHorizontal: normalize(10),
          }}>
          <View style={{flexDirection: 'row', width: '80%'}}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('SearchBarpassnotAvail', {
                  id: item.id,
                })
              }
              style={{
                borderRadius: 53,
                height: normalize(53),
                backgroundColor: '#262D5A',
                justifyContent: 'center',
                alignItems: 'center',
                width: normalize(52),
              }}>
              {item.profile_photo_path ? (
                <Image
                  source={{
                    uri: `${constants.IMAGE_URL}${item.profile_photo_path}`,
                  }}
                  style={{
                    height: normalize(50),
                    width: normalize(50),
                    borderRadius: 50,
                    borderColor: '#D73F9D',
                    borderWidth: 1,
                  }}
                />
              ) : (
                <Image
                  source={Icons.DefaultProfile}
                  style={{
                    height: normalize(50),
                    width: normalize(50),
                    borderRadius: 50,
                    borderColor: '#D73F9D',
                    borderWidth: 1,
                  }}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('SearchBarpassnotAvail', {
                  id: item.id,
                })
              }
              style={{
                marginLeft: normalize(12),
                justifyContent: 'center',
                marginBottom: normalize(8),
              }}>
              <Text
                style={{
                  marginTop: normalize(3),
                  color: '#B9A4F4',
                  fontSize: normalize(14),
                }}>
                {item.first_name} {item.last_name}
              </Text>
              <View style={{flexDirection: 'row', marginTop: normalize(3)}}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: normalize(9),
                    marginRight: normalize(2),
                  }}>
                  Line
                </Text>
                {item.line_type === '1' && <LineHead number={'1'} />}
                {item.line_type === '2' && <LineHead number={'2'} />}
                {item.line_type == '3' && <LineHead number={'3'} />}
                {item.line_type == '4' && <LineHead number={'4'} />}
                {item.line_type === '5' && <LineHead number={'5'} />}

                {item.line_type === '1' && (
                  <ColorText colorCode={'#ffff'} name={'None'} />
                )}
                {item.line_type === '2' && (
                  <ColorText colorCode={'#2AE8AB'} name={'Short'} />
                )}
                {item.line_type === '3' && (
                  <ColorText colorCode={'#DCE024'} name={'Medium'} />
                )}
                {item.line_type === '4' && (
                  <ColorText colorCode={'#FF7A00'} name={'Long'} />
                )}
                {item.line_type === '5' && (
                  <ColorText colorCode={'#B4262C'} name={'Very Long'} />
                )}
              </View>
              <View style={{flexDirection: 'row', marginTop: normalize(3)}}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: normalize(9),

                    marginRight: normalize(2),
                  }}>
                  Friends
                </Text>
                {ProfileReducer?.profileResponse?.friend_count >= 5 ? (
                  <Text
                    style={{
                      color: '#B9A4F4',
                      fontSize: normalize(9),
                    }}>
                    {item?.friends_count}
                  </Text>
                ) : (
                  <Image
                    style={{
                      height: normalize(10),
                      width: normalize(10),
                      resizeMode: 'contain',
                      tintColor: 'white',
                    }}
                    source={Icons.lockFriends}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              width: '20%',
            }}>
            <TouchableOpacity
              onPress={() => handleFavourite(item.id, item.is_fav)}>
              <Image
                source={item.is_fav == 1 ? Icons.pLove : Icons.outlinelove}
                style={{
                  height: normalize(20),
                  width: normalize(23),
                  tintColor: item.is_fav == 1 ? '#D73F9D' : '#3e456d',
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                width: normalize(50),
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginBottom: normalize(8),
                marginTop: normalize(10),
              }}>
              <Image
                source={Icons.Location}
                style={{
                  height: normalize(8),
                  width: normalize(6),
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  paddingTop: normalize(1),
                  fontSize: normalize(8),
                  color: '#FFFFFF',
                  paddingTop: normalize(1),
                  paddingHorizontal: normalize(3),
                }}>
                {(
                  getDistance(
                    {
                      latitude: parseFloat(item?.lat).toFixed(2),
                      longitude: parseFloat(item?.long).toFixed(2),
                    },
                    {
                      latitude: parseFloat(locdata[0]).toFixed(2),
                      longitude: parseFloat(locdata[1]).toFixed(2),
                    },
                  ) * 0.00062
                ).toFixed(1)}{' '}
                mi
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const renderItem1Curr = ({item, index}) => {
    return (
      <View
        style={{
          width: normalize(280),
          backgroundColor: '#0E1648',
          borderRadius: normalize(12),
          marginTop: normalize(8),
          alignSelf: 'center',
          // alignItems: 'center',
          borderWidth: 2,
          borderColor:
            index == HomeReducer?.shortDistanceResponse ? '#D73F9D' : '#0E1648',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: normalize(6),
            justifyContent: 'space-between',
            marginHorizontal: normalize(10),
          }}>
          <View style={{flexDirection: 'row', width: '80%'}}>
            <TouchableOpacity
              onPress={() => sendCurrent(item)}
              style={{
                borderRadius: 53,
                height: normalize(53),
                backgroundColor: '#262D5A',
                justifyContent: 'center',
                alignItems: 'center',
                width: normalize(52),
              }}>
              {item.profile_photo_path ? (
                <Image
                  source={{
                    uri: `${constants.IMAGE_URL}${item.profile_photo_path}`,
                  }}
                  style={{
                    height: normalize(50),
                    width: normalize(50),
                    borderRadius: 50,
                    borderColor: '#D73F9D',
                    borderWidth: 1,
                  }}
                />
              ) : (
                <Image
                  source={Icons.DefaultProfile}
                  style={{
                    height: normalize(50),
                    width: normalize(50),
                    borderRadius: 50,
                    borderColor: '#D73F9D',
                    borderWidth: 1,
                  }}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => sendCurrent(item)}
              style={{
                marginLeft: normalize(12),
                justifyContent: 'center',
                marginBottom: normalize(8),
              }}>
              <Text
                style={{
                  marginTop: normalize(3),
                  color: '#B9A4F4',
                  fontSize: normalize(14),
                }}>
                {item.first_name} {item.last_name}
              </Text>
              <View style={{flexDirection: 'row', marginTop: normalize(3)}}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: normalize(9),
                    marginRight: normalize(2),
                  }}>
                  Line
                </Text>
                {item.line_type === '1' && <LineHead number={'1'} />}
                {item.line_type === '2' && <LineHead number={'2'} />}
                {item.line_type == '3' && <LineHead number={'3'} />}
                {item.line_type == '4' && <LineHead number={'4'} />}
                {item.line_type === '5' && <LineHead number={'5'} />}

                {item.line_type === '1' && (
                  <ColorText colorCode={'#ffff'} name={'None'} />
                )}
                {item.line_type === '2' && (
                  <ColorText colorCode={'#2AE8AB'} name={'Short'} />
                )}
                {item.line_type === '3' && (
                  <ColorText colorCode={'#DCE024'} name={'Medium'} />
                )}
                {item.line_type === '4' && (
                  <ColorText colorCode={'#FF7A00'} name={'Long'} />
                )}
                {item.line_type === '5' && (
                  <ColorText colorCode={'#B4262C'} name={'Very Long'} />
                )}
              </View>
              <View style={{flexDirection: 'row', marginTop: normalize(3)}}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: normalize(9),

                    marginRight: normalize(2),
                  }}>
                  Friends
                </Text>
                {ProfileReducer?.profileResponse?.friend_count >= 5 ? (
                  <Text
                    style={{
                      color: '#B9A4F4',
                      fontSize: normalize(9),
                    }}>
                    {item?.friends_count}
                  </Text>
                ) : (
                  <Image
                    style={{
                      height: normalize(10),
                      width: normalize(10),
                      resizeMode: 'contain',
                      tintColor: 'white',
                    }}
                    source={Icons.lockFriends}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              width: '20%',
            }}>
            <TouchableOpacity
              onPress={() => handleFavourite(item.id, item.is_fav)}>
              <Image
                source={item.is_fav == 1 ? Icons.pLove : Icons.outlinelove}
                style={{
                  height: normalize(20),
                  width: normalize(23),
                  tintColor: item.is_fav == 1 ? '#D73F9D' : '#3e456d',
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                width: normalize(50),
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginBottom: normalize(8),
                marginTop: normalize(10),
              }}>
              <Image
                source={Icons.Location}
                style={{
                  height: normalize(8),
                  width: normalize(6),
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  paddingTop: normalize(1),
                  fontSize: normalize(8),
                  color: '#FFFFFF',
                  paddingTop: normalize(1),
                  paddingHorizontal: normalize(3),
                }}>
                {(
                  getDistance(
                    {
                      latitude: parseFloat(item?.lat).toFixed(2),
                      longitude: parseFloat(item?.long).toFixed(2),
                    },
                    {
                      latitude: parseFloat(locdata[0]).toFixed(2),
                      longitude: parseFloat(locdata[1]).toFixed(2),
                    },
                  ) * 0.00062
                ).toFixed(1)}{' '}
                mi
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderItem2 = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          // onPress={() => props.navigation.navigate('SearchBarpassnotAvail')}
          onPress={() => {
            setModalData(item);
            setModalVisible3(!isModalVisible3);
          }}
          style={{
            height: normalize(60),
            width: normalize(260),
            backgroundColor: '#060C30',
            borderRadius: normalize(12),
            marginTop: normalize(8),
            alignSelf: 'center',
            justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              // justifyContent: 'space-between',
              marginHorizontal: normalize(10),
            }}>
            <View
              style={{
                height: normalize(44),
                width: normalize(44),
                backgroundColor: '#1D2660',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {item?.pass_detail?.bar_owner?.bar_owner_image ? (
                <Image
                  source={{uri: item?.pass_detail?.bar_owner?.bar_owner_image}}
                  style={{
                    height: normalize(39),
                    width: normalize(39),
                    borderWidth: 1,
                    borderRadius: 50,
                    borderColor: '#FF58BF',
                  }}
                />
              ) : (
                <Image
                  source={Icons.DefaultProfile}
                  style={{
                    height: normalize(39),
                    width: normalize(39),
                    borderWidth: 1,
                    borderRadius: 50,
                    borderColor: '#FF58BF',
                  }}
                />
              )}
            </View>
            <View style={{justifyContent: 'center', marginLeft: normalize(10)}}>
              <Text
                style={{
                  // marginTop: normalize(3),
                  color: '#FF58BF',
                  fontSize: normalize(15),
                  fontFamily: Fonts.Poppins_Medium,
                }}>
                {item?.pass_detail?.bar_owner?.full_name}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    // marginRight: normalize(1),
                    color: '#FFF',
                    fontSize: normalize(10),
                    fontFamily: Fonts.Poppins_Medium,
                  }}>
                  Date:
                </Text>
                <Text
                  style={{
                    marginLeft: normalize(3),
                    color: '#2AE8AB',
                    fontSize: normalize(10),
                    fontFamily: Fonts.Poppins_Medium,
                  }}>
                  {moment(item?.pass_detail?.end_date).format('MMMM Do YYYY')}
                  {', '}
                  {moment(item?.pass_detail?.end_time, 'HH:mm').format(
                    'hh:mm A',
                  )}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };
  const renderItem3 = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            setModalData(item);
            setModalVisible5(true);
          }}
          style={{
            height: normalize(60),
            width: normalize(260),
            backgroundColor: '#3B4061',
            borderRadius: normalize(12),
            marginTop: normalize(8),
            alignSelf: 'center',
            // alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: normalize(6),
              // justifyContent: 'space-between',
              marginHorizontal: normalize(10),
            }}>
            <View
              style={{
                height: normalize(44),
                width: normalize(44),
                backgroundColor: '#4F5371',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {item?.pass_detail?.bar_owner?.bar_owner_image ? (
                <>
                  <Image
                    source={{
                      uri: item?.pass_detail?.bar_owner?.bar_owner_image,
                    }}
                    style={{
                      height: normalize(39),
                      width: normalize(39),
                      borderWidth: 1,
                      borderRadius: 50,
                      borderColor: '#908AA3',
                      tintColor: 'gray',
                    }}
                  />
                  <Image
                    source={{
                      uri: item?.pass_detail?.bar_owner?.bar_owner_image,
                    }}
                    style={{
                      height: normalize(39),
                      width: normalize(39),
                      borderWidth: 1,
                      borderRadius: 50,
                      borderColor: '#908AA3',

                      position: 'absolute',

                      opacity: 0.3,
                    }}
                  />
                </>
              ) : (
                <>
                  <Image
                    source={Icons.DefaultProfile}
                    style={{
                      height: normalize(39),
                      width: normalize(39),
                      borderWidth: 1,
                      borderRadius: 50,
                      borderColor: '#908AA3',
                      tintColor: 'gray',
                    }}
                  />
                  <Image
                    source={Icons.DefaultProfile}
                    style={{
                      height: normalize(39),
                      width: normalize(39),
                      borderWidth: 1,
                      borderRadius: 50,
                      borderColor: '#908AA3',
                      position: 'absolute',
                      opacity: 0.3,
                    }}
                  />
                </>
              )}
            </View>
            <View style={{justifyContent: 'center', marginLeft: normalize(5)}}>
              <Text
                style={{
                  // marginTop: normalize(3),
                  color: '#B9A4F4',
                  fontSize: normalize(15),
                  fontFamily: Fonts.Poppins_Medium,
                }}>
                {item?.pass_detail?.bar_owner?.full_name}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    // marginRight: normalize(1),
                    color: '#FFF',
                    fontSize: normalize(10),
                    fontFamily: Fonts.Poppins_Medium,
                  }}>
                  Date:
                </Text>
                <Text
                  style={{
                    marginLeft: normalize(3),
                    color: '#908AA3',
                    fontSize: normalize(10),
                    fontFamily: Fonts.Poppins_Medium,
                  }}>
                  {moment(item?.pass_detail?.end_date).format('MMMM Do YYYY')}
                  {', '}
                  {moment(item?.pass_detail?.end_time, 'HH:mm').format(
                    'hh:mm A',
                  )}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };
  const showModal = () => {
    // if (HomeReducer?.currentBarResponse?.checked_in == 1) {
    //   checkInUpdate();
    // } else {
    //   showErrorAlert('Please Check-In first!');
    // }
    checkInUpdate();
  };

  function sendCurrent(item) {
    setcurrentID(item?.id);

    let obj1 = new FormData();
    obj1.append('bar_owner_id', item?.id);
    connectionrequest()
      .then(() => {
        dispatch(currentBarRequest(obj1));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
    setModalVisibleCurr(!isModalVisiblecurr);
    console.log('current on press', item);
  }

  useEffect(() => {
    if (HomeReducer.status == 'Home/checkInSuccess') {
      setModalVisible1(true);
      setTimeout(() => {
        let obj1 = new FormData();
        obj1.append('bar_owner_id', currentID);
        connectionrequest()
          .then(() => {
            dispatch(currentBarRequest(obj1));
          })
          .catch(err => {
            showErrorAlert('Please connect To Internet');
          });
        setModalVisible1(false);
      }, 2000);
      enterHome();
    }
  }, [HomeReducer.status]);
  function checkInUpdate() {
    let obj = new FormData();
    obj.append('bar_owner_id', currentID);
    obj.append('line_type', line);
    // obj.append('checked_in', agree == true ? 1 : 0);
    connectionrequest()
      .then(() => {
        dispatch(checkInRequest(obj));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }
  function redeemPass(id) {
    let obj = new FormData();
    obj.append('user_pass_id', id);
    connectionrequest()
      .then(() => {
        dispatch(passRedeemRequest(obj));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }
  function refundRequest(id) {
    if (reason == '') {
      showErrorAlert('Please Enter Your Reason To Redeem');
    } else {
      let obj = new FormData();
      obj.append('user_pass_id', id);
      obj.append('refund_reason', reason);
      connectionrequest()
        .then(() => {
          dispatch(passRefundRequest(obj));
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    }
  }

  useEffect(() => {
    if (HomeReducer.status == 'Home/passRedeemSuccess') {
      enter();
      setTimeout(() => {
        setModalVisible4(false);
        setModalVisible3(false);
      }, 2500);
    } else if (HomeReducer.status == 'Home/passRefundSuccess') {
      // setModalVisible6(!isModalVisible6);
    } else if (HomeReducer.status == 'Home/purchaseSuccess') {
      dispatch(yourPassesRequest());
    } else if (HomeReducer.status == 'Home/requestPassSuccess') {
      let obj1 = new FormData();
      obj1.append('bar_owner_id', currentID);
      connectionrequest()
        .then(() => {
          dispatch(currentBarRequest(obj1));
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    }
  }, [HomeReducer.status]);

  function touchUpdate(item) {
    console.log('itemget', item);
    if (item == 2) {
      setPercentage(25);
      setLine(2);
    } else if (item == 5) {
      setPercentage(50);
      setLine(3);
    } else if (item == 8) {
      setPercentage(75);
      setLine(4);
    } else if (item == 11) {
      setPercentage(100);
      setLine(5);
    } else if (item == 0) {
      setPercentage(0);
      setLine(1);
    }
  }
  function barVisitRequest() {
    let obj = new FormData();
    obj.append('user_id', ProfileReducer?.profileResponse?.user?.id);
    obj.append('bar_owner_id', currentID);
    connectionrequest()
      .then(() => {
        dispatch(requestPass(obj));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }
  function checkInButtonFnc() {
    if (HomeReducer?.currentBarResponse?.checked_in != 1) {
      let obj = new FormData();
      obj.append('checked_in', 1);
      obj.append('bar_owner_id', currentID);
      connectionrequest()
        .then(() => {
          dispatch(enterBarRequest(obj));
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    } else {
      showErrorAlert('Already Checked-In');
    }
  }
  // PanResponder
  const [offset, setOffset] = useState(0);
  const ModalSheet = () => {
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          return gestureState.dy > 5 || gestureState.dy < -5;
        },
        onPanResponderMove: (evt, gestureState) => {
          if (gestureState.dy > 5) {
            setOffset(normalize(300));
            dispatch(trendReq(true));
          } else if (gestureState.dy < -5) {
            setOffset(60);
            dispatch(trendReq(false));
          }
        },
        onPanResponderRelease: (evt, gestureState) => {
          if (gestureState.dy > 5) {
            setOffset(normalize(300));
          } else if (gestureState.dy < -5) {
            setOffset(60);
          }
        },
      }),
    ).current;

    return (
      <View style={[styles.container, {height: offset}]}>
        {/* Add content for the modal sheet here */}
        <TouchableOpacity
          onPress={() => dispatch(trendReq(!HomeReducer?.trendResponse))}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: normalize(22),
              fontWeight: '500',
              fontFamily: Fonts.Poppins_Medium,
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: normalize(6),
              marginBottom: normalize(10),
            }}>
            Trending
          </Text>
          <Text
            style={{
              color: '#D73F9D',
              fontSize: normalize(22),
              fontWeight: '500',
              fontFamily: Fonts.Poppins_Medium,
              marginBottom: normalize(10),
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: normalize(6),
            }}>
            {' '}
            Now
          </Text>
        </TouchableOpacity>
        {HomeReducer?.trendResponse == true && (
          // <ScrollView style={{height: 280}}>
          <>
            {HomeReducer?.userHomeResponse?.trending?.length > 0 ? (
              <FlatList
                data={HomeReducer?.userHomeResponse?.trending}
                renderItem={renderItem1}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{
                  marginBottom: 20,
                }}
              />
            ) : (
              <Text
                style={{
                  color: '#fff',
                  fontSize: normalize(12),

                  alignSelf: 'center',
                  width: '60%',
                  textAlign: 'center',
                  fontFamily: Fonts.Poppins_Regular,
                  // paddingVertical: normalize(15),
                  marginTop: normalize(10),
                }}>
                Currently no trending bars in your area
              </Text>
            )}
          </>

          // </ScrollView>
        )}

        <View
          {...panResponder.panHandlers}
          style={{
            height: normalize(23),
            width: '100%',

            borderRadius: normalize(10),
            alignSelf: 'center',
            // bottom: normalize(6),
            alignItems: 'center',
            position: 'absolute',
            bottom: -18,
          }}>
          <TouchableOpacity
            style={{
              height: normalize(12),
              width: normalize(78),
              backgroundColor: '#D73F9D',
              borderRadius: normalize(10),
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => dispatch(trendReq(!HomeReducer?.trendResponse))}>
            <Image
              style={{
                resizeMode: 'contain',
                height: normalize(10),
                width: normalize(14),
                transform: [
                  HomeReducer?.trendResponse == false
                    ? {rotate: '0deg'}
                    : {rotate: '180deg'},
                ],
              }}
              source={Icons.homearrow}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  useEffect(() => {
    if (HomeReducer?.trendResponse == true) {
      setOffset(normalize(300));
    } else {
      setOffset(normalize(60));
    }
  }, [HomeReducer?.trendResponse]);
  // Panresponder
  console.log('short Distance', HomeReducer.shortDistanceResponse);
  function getCurrentAmount(item) {
    console.log('item', item.tier_amounts);
    let amount;
    if (item?.tier_amounts?.length > 0 && item?.remaining_ticket > 0) {
      for (let index = 0; index < item?.tier_amounts?.length; index++) {
        if (item?.tier_amounts[index]?.current_tire == 1) {
          amount = item?.tier_amounts[index].amount;
        }
      }
      return amount;
    }
    return 0;
  }
  useEffect(() => {
    if (
      ProfileReducer?.profileResponse?.user?.active == 0 ||
      ProfileReducer?.profileResponse?.user?.is_previous_user == 1
    ) {
      setLogoutModal(true);
    }
  }, [ProfileReducer.status]);
  return (
    <>
      <SafeAreaView style={{backgroundColor: '#060C30'}}>
        <MyStatusBar backgroundColor={'#060C30'} barStyle={'light-content'} />
        <Loader
          visible={
            HomeReducer.status == 'Home/passRedeemRequest' ||
            HomeReducer.status == 'Home/userHomeRequest' ||
            HomeReducer.status == 'Home/requestPass'
          }
        />
        <View style={{marginBottom: normalize(10)}}>
          <ModalSheet />
          <View
            style={{
              position: 'relative',
              zIndex: 0,
              height: '100%',
            }}>
            <View>
              {HomeReducer?.userHomeResponse?.bar_owner &&
                currentLongitude != undefined && <MapComp />}
              {HomeReducer?.userHomeResponse?.bar_owner &&
                currentLongitude != undefined && (
                  <View
                    style={{
                      flex: 1,
                      right: normalize(16),
                      left: normalize(16),
                      bottom:
                        Platform.OS == 'ios' ? normalize(64) : normalize(80),
                      position: 'absolute',

                      zIndex: 999,
                    }}>
                    <TouchableOpacity
                      // onPress={() => props.navigation.navigate('Wallet')}
                      onPress={() => setModalVisible2(!isModalVisible2)}
                      style={{
                        height: normalize(58),
                        width: normalize(58),
                        backgroundColor: '#D73F9D',
                        borderRadius: normalize(29),
                        alignSelf: 'flex-end',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          height: normalize(20),
                          width: normalize(20),
                          backgroundColor: '#2AE8AB',
                          borderRadius: normalize(10),
                          // bottom: normalize(2),
                          marginLeft: normalize(45),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{fontSize: normalize(10), color: 'black'}}>
                          {console.log('----Count')}
                          {HomeReducer?.yourPassesResponse?.upcoming?.length}
                        </Text>
                      </View>
                      <Image
                        source={Icons.pass}
                        style={{
                          height: normalize(20),
                          width: normalize(20),
                          marginBottom: normalize(20),
                        }}
                      />
                    </TouchableOpacity>
                    {HomeReducer?.shortDistanceResponse == null ||
                    HomeReducer?.userHomeResponse?.bar_owner_1miles?.length == 0 ? (
                      <ButtonItems
                        backgroundColor={'rgba(149,142, 146, 0.8)'}
                        height={normalize(48)}
                        width={normalize(280)}
                        textbutton={'Current Bar'}
                        onPress={() => {
                          showErrorAlert('Not Near A Bar');
                        }}
                        marginTop={normalize(16)}
                      />
                    ) : (
                      <ButtonItems
                        height={normalize(48)}
                        width={normalize(280)}
                        textbutton={'Current Bar'}
                        onPress={() => {
                          setModalVisible(true);
                        }}
                        marginTop={normalize(16)}
                      />
                    )}
                  </View>
                )}

              {currentLongitude == undefined && (
                <Text
                  style={{
                    alignSelf: 'center',
                    marginTop: normalize(270),
                    fontSize: normalize(14),
                    color: '#252F6F',
                    fontFamily: Fonts.Poppins_Regular,
                  }}>
                  Loading Map...
                </Text>
              )}
              <Modal
                isVisible={isModalVisible2}
                onBackdropPress={() => setModalVisible2(false)}>
                <View
                  style={{
                    height: normalize(500),
                    width: normalize(300),
                    backgroundColor: '#060C30',
                    alignSelf: 'center',
                    borderRadius: normalize(10),
                  }}>
                  <View
                    style={{
                      height: normalize(50),
                      width: normalize(300),
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
                        resizeMode={'contain'}
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
                        paddingHorizontal: normalize(50),
                      }}>
                      Your Passes
                    </Text>
                  </View>
                  <View
                    style={{
                      height: normalize(410),
                      width: normalize(280),
                      backgroundColor: '#161F5C',
                      alignSelf: 'center',
                      borderRadius: normalize(10),
                      marginTop: normalize(25),
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: normalize(16),
                        fontWeight: '600',
                        paddingHorizontal: normalize(50),
                        alignSelf: 'center',
                        marginVertical: normalize(10),
                      }}>
                      Upcoming Passes
                    </Text>
                    <View
                      style={{
                        height: normalize(1),
                        width: normalize(280),
                        backgroundColor: '#3B4061',
                      }}
                    />
                    <FlatList
                      data={HomeReducer?.yourPassesResponse?.upcoming}
                      renderItem={renderItem2}
                      // horizontal={true}
                      keyExtractor={(item, index) => index.toString()}
                      style={{marginTop: normalize(12), height: normalize(230)}}
                      ListEmptyComponent={
                        <Text
                          style={{
                            textAlign: 'center',
                            color: Colors.white,
                            fontSize: normalize(12),
                            fontFamily: Fonts.Poppins_Regular,
                          }}>
                          No Passes Available
                        </Text>
                      }
                    />
                    <Text
                      style={{
                        color: '#858CB7',
                        fontSize: normalize(16),
                        fontWeight: '600',
                        // paddingHorizontal: normalize(50),
                        alignSelf: 'center',
                        marginVertical: normalize(10),
                      }}>
                      Past Passes
                    </Text>
                    <View
                      style={{
                        height: normalize(1),
                        width: normalize(280),
                        backgroundColor: '#3B4061',
                      }}
                    />
                    <FlatList
                      data={HomeReducer?.yourPassesResponse?.past}
                      renderItem={renderItem3}
                      // horizontal={true}
                      keyExtractor={(item, index) => index.toString()}
                      style={{
                        marginTop: normalize(12),
                        marginBottom: normalize(12),
                        height: normalize(230),
                      }}
                      ListEmptyComponent={
                        <Text
                          style={{
                            textAlign: 'center',
                            color: Colors.white,
                            fontSize: normalize(12),
                            fontFamily: Fonts.Poppins_Regular,
                          }}>
                          No Passes Available
                        </Text>
                      }
                    />
                    <Modal
                      isVisible={isModalVisible3}
                      onBackdropPress={() => setModalVisible3(false)}>
                      <View
                        style={{
                          height:
                            Platform.OS == 'android'
                              ? normalize(330)
                              : normalize(330),

                          // borderRadius: normalize(15),
                          alignSelf: 'center',
                          width: normalize(300),
                          // marginTop: normalize(30),
                          alignItems: 'center',
                          backgroundColor: '#08103A',
                          borderRadius: normalize(10),
                        }}>
                        <View
                          style={{
                            height: normalize(50),
                            width: normalize(297),
                            backgroundColor: '#D73F9D',
                            borderTopRightRadius: normalize(10),
                            borderTopLeftRadius: normalize(10),
                            alignItems: 'center',
                            // alignItems: 'center',
                            // justifyContent: 'center',
                            flexDirection: 'row',
                          }}>
                          <TouchableOpacity
                            onPress={() => setModalVisible3(!isModalVisible3)}
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
                                tintColor: 'white',
                              }}
                            />
                          </TouchableOpacity>
                          <Text
                            style={{
                              fontSize: normalize(16),
                              color: '#fff',
                              fontFamily: Fonts.Poppins_Medium,
                              marginLeft: normalize(55),
                            }}>
                            Your Passes
                          </Text>
                        </View>
                        <View
                          style={{
                            height: normalize(250),
                            width: normalize(275),
                            backgroundColor: '#161F5C',

                            // alignItems: 'center',
                            // justifyContent: 'center',
                            marginTop: normalize(18),
                            borderRadius: normalize(10),
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              // justifyContent: 'center',
                              marginTop: normalize(10),
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                setModalVisible3(!setModalVisible3)
                              }>
                              <Image
                                source={Icons.leftarrow2}
                                resizeMode="contain"
                                style={{
                                  height: normalize(11),
                                  width: normalize(15),
                                  tintColor: '#fff',
                                  marginLeft: normalize(10),
                                }}
                              />
                            </TouchableOpacity>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontSize: normalize(15),
                                  color: '#fff',
                                  alignSelf: 'center',
                                  marginLeft: normalize(66),
                                }}>
                                {console.log('----', modalData)}
                                {modalData?.pass_detail?.bar_owner?.full_name}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              height: normalize(1),
                              width: normalize(275),
                              backgroundColor: '#252F6F',
                              marginTop: normalize(10),
                            }}
                          />
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginHorizontal: normalize(10),
                            }}>
                            <View>
                              <Text
                                style={{
                                  fontSize: normalize(20),
                                  color: '#FF58BF',
                                  marginTop: normalize(8),
                                }}>
                                {modalData?.pass_detail?.message}
                              </Text>
                              {/* <Text
                              style={{
                                fontSize: normalize(20),
                                color: '#FF58BF',
                              }}>
                              {modalData?.pass_detail?.message}
                            </Text> */}
                            </View>
                            <View style={{alignItems: 'center'}}>
                              <Text
                                style={{
                                  fontSize: normalize(9),
                                  color: '#FFF',
                                }}>
                                Qty
                              </Text>
                              <Text
                                style={{
                                  fontSize: normalize(20),
                                  color: '#FFF',
                                }}>
                                {modalData?.quantity}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginHorizontal: normalize(10),
                              marginTop: normalize(10),
                            }}>
                            <Text
                              style={{
                                fontSize: normalize(9),
                                color: '#FFF',
                              }}>
                              Pass Holder
                            </Text>
                            <Text
                              style={{
                                fontSize: normalize(9),
                                color: '#FFF',
                              }}>
                              Valid Till
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',

                              justifyContent: 'space-between',
                              marginHorizontal: normalize(10),
                              marginTop: normalize(5),
                            }}>
                            <Text
                              style={{
                                fontSize: normalize(13),
                                color: '#2AE8AB',
                                width: '50%',
                                textAlign: 'left',
                              }}>
                              {modalData?.pass_detail?.bar_owner?.full_name}
                            </Text>
                            <Text
                              style={{
                                fontSize: normalize(12),
                                color: '#2AE8AB',
                                width: '50%',
                                textAlign: 'right',
                              }}>
                              {moment(modalData?.pass_detail?.end_date).format(
                                'Do MMMM YYYY',
                              )}
                              {', '}
                              {moment(
                                modalData?.pass_detail?.end_time,
                                'HH:mm',
                              ).format('hh:mm A')}
                            </Text>
                          </View>
                          <ButtonItems
                            width={normalize(255)}
                            marginTop={normalize(15)}
                            textbutton={'I am the Bouncer'}
                            onPress={() => setModalVisible4(!isModalVisible4)}
                          />
                          <Text
                            style={{
                              fontSize: normalize(12),
                              color: '#FFF',
                              alignSelf: 'center',
                              marginTop: normalize(10),
                              fontWeight: '500',
                            }}>
                            Bouncer presses this button to redeem
                          </Text>
                        </View>
                      </View>
                      <Modal
                        isVisible={isModalVisible4}
                        onBackdropPress={() => setModalVisible4(false)}>
                        <View
                          style={{
                            height: normalize(280),
                            width: normalize(280),
                            backgroundColor: '#060C30',
                            alignSelf: 'center',
                            borderRadius: normalize(10),
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginHorizontal: normalize(20),
                              marginTop: normalize(20),
                            }}>
                            <Text
                              style={{
                                fontSize: normalize(18),
                                color: '#FFF',

                                fontWeight: '500',
                              }}>
                              {modalData?.pass_detail?.bar_owner?.full_name}
                            </Text>
                            <TouchableOpacity
                              onPress={() => setModalVisible4(false)}
                              style={{
                                height: normalize(30),
                                width: normalize(30),
                                borderRadius: normalize(10),
                                backgroundColor: '#B9A4F4',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text style={{fontSize: normalize(15)}}>×</Text>
                            </TouchableOpacity>
                          </View>
                          <Text
                            style={{
                              fontSize: normalize(22),
                              color: 'red',
                              alignSelf: 'center',
                              marginTop: normalize(10),
                              fontWeight: '500',
                            }}>
                            Attention
                          </Text>
                          <Text
                            style={{
                              fontSize: normalize(14),
                              color: '#fff',
                              alignSelf: 'center',
                              marginTop: normalize(20),
                              fontWeight: '500',
                            }}>
                            Only let bouncer or doorman redeem
                          </Text>
                          <Text
                            style={{
                              fontSize: normalize(14),
                              color: '#fff',
                              alignSelf: 'center',
                              marginTop: normalize(5),
                              fontWeight: '500',
                            }}>
                            this pass
                          </Text>
                          <ButtonItems
                            textbutton={'Redeem'}
                            width={normalize(245)}
                            marginTop={normalize(30)}
                            onPress={() => redeemPass(modalData?.id)}
                          />
                          <ButtonItems
                            textbutton={'Go back'}
                            width={normalize(245)}
                            marginTop={normalize(10)}
                            onPress={() => setModalVisible4(false)}
                          />
                        </View>
                      </Modal>
                    </Modal>

                    <Modal
                      isVisible={isModalVisible5}
                      onBackdropPress={() => setModalVisible5(false)}>
                      <View
                        style={{
                          height: normalize(200),
                          width: normalize(280),
                          backgroundColor: '#060C30',
                          alignSelf: 'center',
                          borderRadius: normalize(10),
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginHorizontal: normalize(20),
                            marginTop: normalize(20),
                          }}>
                          <Text
                            style={{
                              fontSize: normalize(18),
                              color: '#FFF',
                              // alignSelf: 'center',
                              // marginTop: normalize(20),
                              // marginLeft: normalize(20),
                              fontWeight: '500',
                            }}>
                            {modalData?.pass_detail?.bar_owner?.full_name}
                          </Text>
                          <TouchableOpacity
                            onPress={() => setModalVisible5(false)}
                            style={{
                              height: normalize(30),
                              width: normalize(30),
                              borderRadius: normalize(10),
                              backgroundColor: '#B9A4F4',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text style={{fontSize: normalize(15)}}>×</Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            height: normalize(50),
                            width: normalize(260),
                            backgroundColor: '#0E1648',
                            borderRadius: normalize(8),
                            alignSelf: 'center',
                            marginTop: normalize(18),
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: normalize(15),
                          }}>
                          <View style={{flexDirection: 'row'}}>
                            <View
                              style={{
                                height: normalize(35),
                                width: normalize(35),
                                backgroundColor: '#131D59',
                                borderRadius: normalize(15),
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Image
                                source={Icons.Pass2}
                                style={{
                                  height: normalize(16),
                                  width: normalize(16),
                                }}
                              />
                            </View>
                            <View style={{marginLeft: normalize(10)}}>
                              <Text
                                style={{
                                  fontSize: normalize(13),
                                  color: '#B9A4F4',

                                  marginTop: normalize(5),
                                  fontWeight: '500',
                                }}>
                                {modalData?.pass_detail?.message}
                              </Text>
                              <Text
                                style={{
                                  fontSize: normalize(10),
                                  color: '#D73F9D',
                                  alignSelf: 'center',
                                  // marginTop: normalize(5),
                                  fontWeight: '500',
                                }}>
                                Redeemed
                              </Text>
                            </View>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                fontSize: normalize(13),
                                color: '#B9A4F4',
                                alignSelf: 'center',
                                marginTop: normalize(5),
                                fontWeight: '500',
                              }}>
                              QTY
                            </Text>
                            <Text
                              style={{
                                fontSize: normalize(13),
                                color: '#fff',
                                alignSelf: 'center',
                                marginTop: normalize(5),
                                fontWeight: '500',
                                marginLeft: normalize(5),
                              }}>
                              {modalData?.quantity}
                            </Text>
                          </View>
                        </View>
                        <ButtonItems
                          textbutton={'Request a Refund'}
                          width={normalize(245)}
                          marginTop={normalize(20)}
                          onPress={() => setModalVisible6(true)}
                        />
                      </View>
                      <Modal
                        isVisible={isModalVisible6}
                        onBackdropPress={() => setModalVisible6(false)}>
                        <View
                          style={{
                            height: normalize(230),
                            width: normalize(280),
                            backgroundColor: '#060C30',
                            alignSelf: 'center',
                            borderRadius: normalize(10),
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginHorizontal: normalize(10),
                              marginTop: normalize(20),
                            }}>
                            <Text
                              style={{
                                fontSize: normalize(18),
                                color: '#FFF',
                                // alignSelf: 'center',
                                // marginTop: normalize(20),
                                // marginLeft: normalize(20),
                                fontWeight: '500',
                              }}>
                              {modalData?.pass_detail?.bar_owner?.full_name}
                            </Text>
                            <TouchableOpacity
                              onPress={() => setModalVisible6(false)}
                              style={{
                                height: normalize(30),
                                width: normalize(30),
                                borderRadius: normalize(10),
                                backgroundColor: '#B9A4F4',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text style={{fontSize: normalize(15)}}>×</Text>
                            </TouchableOpacity>
                          </View>
                          <Text
                            style={{
                              color: '#B9A4F4',
                              marginLeft: normalize(10),
                              marginTop: normalize(18),
                            }}>
                            Refund Request
                          </Text>
                          <TextInput
                            value={reason}
                            onChangeText={value => setReason(value)}
                            placeholder="Input reason here"
                            placeholderTextColor={'#fff'}
                            multiline={true}
                            textAlignVertical="top"
                            // multiline={multiline || false}
                            style={{
                              height: normalize(70),
                              width: normalize(260),
                              backgroundColor: '#26327C',
                              borderRadius: normalize(8),
                              alignSelf: 'center',
                              marginTop: normalize(8),
                              alignItems: 'flex-start',
                              paddingHorizontal: normalize(15),

                              paddingTop:
                                Platform.OS == 'ios' ? normalize(10) : null,
                              // paddingBottom:
                              //   Platform.OS == 'android'
                              //     ? normalize(42)
                              //     : null,
                              color: '#fff',
                            }}
                          />
                          <ButtonItems
                            textbutton={'Submit'}
                            width={normalize(258)}
                            marginTop={normalize(10)}
                            onPress={() => refundRequest(modalData?.id)}
                          />
                        </View>
                      </Modal>
                    </Modal>
                    {/* refund input */}
                  </View>
                </View>
              </Modal>
            </View>
            {/* currentmodal */}
            <Modal
              animationInTiming={500}
              isVisible={isModalVisible}
              onBackdropPress={() => setModalVisible(false)}>
              <View
                style={{
                  // height: calcH(0.9),

                  backgroundColor: '#060C30',
                  // borderRadius: normalize(15),
                  alignSelf: 'center',
                  // width: calcW(0.91),
                  marginTop: normalize(40),
                  borderTopRightRadius: normalize(10),
                  borderTopLeftRadius: normalize(10),
                  marginBottom: normalize(30),
                  borderBottomRightRadius: normalize(10),
                  borderBottomLeftRadius: normalize(10),
                }}>
                <View
                  style={{
                    width: normalize(300),

                    alignSelf: 'center',
                    marginBottom: normalize(20),

                    borderTopRightRadius: normalize(10),
                    borderTopLeftRadius: normalize(10),
                  }}>
                  <View
                    style={{
                      height: normalize(50),
                      width: normalize(300),
                      backgroundColor: '#D73F9D',
                      borderTopRightRadius: normalize(10),
                      borderTopLeftRadius: normalize(10),
                      alignItems: 'center',

                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      onPress={() => setModalVisible(!isModalVisible)}
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
                          tintColor: 'white',
                        }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: normalize(18),
                        color: '#fff',
                        fontFamily: Fonts.Poppins_Medium,
                        marginLeft: normalize(50),
                      }}>
                      Current Bar
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(14),
                      textAlign: 'center',
                      fontFamily: Fonts.Poppins_SemiBold,
                      paddingHorizontal: normalize(10),
                      marginVertical: normalize(10),
                    }}>
                    Select Which Bar You Are Currently At
                  </Text>
                  <ScrollView
                    style={{
                      paddingBottom: normalize(20),
                      height: normalize(400),
                    }}>
                    <FlatList
                      data={HomeReducer?.userHomeResponse?.bar_owner_1miles}
                      renderItem={renderItem1Curr}
                      keyExtractor={(item, index) => index.toString()}
                      contentContainerStyle={{
                        paddingTop: normalize(15),
                      }}
                    />
                  </ScrollView>
                </View>
              </View>
              <Modal
                animationInTiming={600}
                isVisible={isModalVisiblecurr}
                onBackdropPress={() => setModalVisibleCurr(false)}>
                <View
                  style={{
                    // height: calcH(0.9),

                    backgroundColor: '#060C30',
                    // borderRadius: normalize(15),
                    alignSelf: 'center',
                    // width: calcW(0.91),
                    marginTop: normalize(100),
                    borderTopRightRadius: normalize(10),
                    borderTopLeftRadius: normalize(10),
                    marginBottom: normalize(30),
                    borderBottomRightRadius: normalize(10),
                    borderBottomLeftRadius: normalize(10),
                  }}>
                  <View
                    style={{
                      width: normalize(300),

                      alignSelf: 'center',
                      marginBottom: normalize(60),

                      borderTopRightRadius: normalize(10),
                      borderTopLeftRadius: normalize(10),
                    }}>
                    <View
                      style={{
                        height: normalize(50),
                        width: normalize(300),
                        backgroundColor: '#D73F9D',
                        borderTopRightRadius: normalize(10),
                        borderTopLeftRadius: normalize(10),
                        alignItems: 'center',

                        flexDirection: 'row',
                      }}>
                      <TouchableOpacity
                        onPress={() => setModalVisibleCurr(!isModalVisiblecurr)}
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
                            tintColor: 'white',
                          }}
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontSize: normalize(18),
                          color: '#fff',
                          fontFamily: Fonts.Poppins_Medium,
                          marginLeft: normalize(50),
                        }}>
                        Current Bar
                      </Text>
                    </View>
                    <ScrollView>
                      <TouchableOpacity
                        onPress={() => {
                          checkInButtonFnc();
                          // controlCheck()
                        }}
                        style={{
                          height: normalize(65),
                          width: normalize(280),
                          backgroundColor:
                            HomeReducer?.currentBarResponse?.checked_in == 1
                              ? '#35B551'
                              : '#161F5C',
                          alignSelf: 'center',
                          marginTop: normalize(10),
                          borderRadius: normalize(10),
                        }}>
                        <Text
                          style={{
                            fontSize: normalize(15),
                            color: '#fff',
                            alignSelf: 'center',
                            marginTop: normalize(10),
                          }}>
                          {HomeReducer?.currentBarResponse?.users?.full_name}
                        </Text>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignSelf: 'center',
                            marginTop: normalize(6),
                          }}>
                          <View
                            style={{flexDirection: 'row', alignSelf: 'center'}}>
                            <View
                              style={{
                                height: normalize(19),
                                width: normalize(19),
                                borderRadius: normalize(5),
                                borderWidth: normalize(0.5),
                                borderColor: '#fff',
                              }}>
                              {HomeReducer?.currentBarResponse?.checked_in ==
                                1 && (
                                <View
                                  style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: normalize(4),
                                  }}>
                                  <Image
                                    source={Icons.tickimg}
                                    style={{
                                      tintColor: '#fff',
                                      height: normalize(10),
                                      width: normalize(12),
                                    }}
                                  />
                                </View>
                              )}
                            </View>
                            <Text
                              style={{
                                fontSize: normalize(12),
                                color: '#fff',
                                alignSelf: 'center',
                                marginLeft: normalize(8),
                              }}>
                              {HomeReducer?.currentBarResponse?.checked_in == 1
                                ? 'Checked- In'
                                : 'Check- In'}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <View
                        style={{
                          flexDirection: 'row',

                          marginTop: normalize(10),
                          justifyContent: 'space-between',
                          marginHorizontal: normalize(10),
                        }}>
                        <View
                          style={{
                            minHeight: normalize(100),
                            width: normalize(135),
                            backgroundColor: '#161F5C',
                            borderRadius: normalize(15),
                            borderWidth: normalize(2),
                            borderColor: '#161f5c',
                          }}>
                          <View
                            style={{
                              marginHorizontal: normalize(8),
                              marginTop: normalize(15),
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontSize: normalize(13),
                                  marginRight: normalize(8),
                                }}>
                                Friends Here:
                              </Text>
                              {grant &&
                              Number(
                                HomeReducer?.currentBarResponse
                                  ?.total_app_friend,
                              ) >= 5 ? null : (
                                <Image
                                  style={{
                                    height: normalize(14),
                                    width: normalize(14),
                                    resizeMode: 'contain',
                                    tintColor: 'white',
                                  }}
                                  source={Icons.lockFriends}
                                />
                              )}
                            </View>
                            {grant &&
                            Number(
                              HomeReducer?.currentBarResponse?.total_app_friend,
                            ) >= 5 ? (
                              <>
                                <Text
                                  style={{
                                    color: '#fff',
                                    fontSize: normalize(20),
                                    fontWeight: '600',
                                  }}>
                                  {
                                    HomeReducer?.currentBarResponse
                                      ?.total_friend
                                  }
                                </Text>
                              </>
                            ) : (
                              <>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    marginVertical: normalize(4),
                                  }}>
                                  {Number(
                                    HomeReducer?.currentBarResponse
                                      ?.total_app_friend,
                                  ) >= 5 ? (
                                    <Image
                                      style={{
                                        height: normalize(12),
                                        width: normalize(12),
                                        resizeMode: 'contain',
                                      }}
                                      source={Icons.allow}
                                    />
                                  ) : (
                                    <Image
                                      style={{
                                        height: normalize(12),
                                        width: normalize(12),
                                        resizeMode: 'contain',
                                      }}
                                      source={Icons.dontAllow}
                                    />
                                  )}

                                  <Text
                                    style={{
                                      color: '#fff',
                                      marginLeft: normalize(10),
                                      fontSize: normalize(10),
                                      fontFamily: Fonts.Poppins_Medium,
                                      width: '80%',
                                      fontWeight: '600',
                                    }}>
                                    Have at least 5 friends
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    marginVertical: normalize(4),
                                  }}>
                                  {console.log('device', grant)}
                                  {grant ? (
                                    <Image
                                      style={{
                                        height: normalize(12),
                                        width: normalize(12),
                                        resizeMode: 'contain',
                                      }}
                                      source={Icons.allow}
                                    />
                                  ) : (
                                    <Image
                                      style={{
                                        height: normalize(12),
                                        width: normalize(12),
                                        resizeMode: 'contain',
                                      }}
                                      source={Icons.dontAllow}
                                    />
                                  )}

                                  <Text
                                    style={{
                                      color: '#fff',
                                      marginLeft: normalize(10),
                                      fontSize: normalize(10),
                                      fontFamily: Fonts.Poppins_Medium,
                                      width: '80%',
                                      fontWeight: '600',
                                    }}>
                                    Have location set to ‘always’
                                  </Text>
                                </View>
                              </>
                            )}
                          </View>
                        </View>
                        {HomeReducer?.currentBarResponse?.userCollege !=
                          null && (
                          <View
                            style={{
                              height: normalize(100),
                              width: normalize(135),
                              backgroundColor: '#161F5C',
                              borderRadius: normalize(15),
                              borderWidth: normalize(2),
                              borderColor: '#161f5c',
                              paddingTop: normalize(15),
                            }}>
                            <View style={{marginHorizontal: normalize(8)}}>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontSize: normalize(12),
                                }}>
                                College{' '}
                                {HomeReducer?.currentBarResponse?.userCollege
                                  ?.student_or_alumni == '1'
                                  ? 'Students'
                                  : 'Alumni'}
                                :
                              </Text>
                              {HomeReducer?.currentBarResponse?.college_students
                                ?.length > 0 ? (
                                <>
                                  {HomeReducer?.currentBarResponse?.college_students?.map(
                                    (item, index) => (
                                      <Text
                                        style={{
                                          color: '#fff',
                                          fontSize: normalize(12),
                                          fontWeight: '600',
                                        }}>
                                        {item.college_name}:{' '}
                                        {item.student_count}
                                      </Text>
                                    ),
                                  )}
                                </>
                              ) : (
                                <Text
                                  style={{
                                    color: '#fff',
                                    fontSize: normalize(12),
                                  }}>
                                  Not Available
                                </Text>
                              )}
                            </View>
                          </View>
                        )}
                      </View>

                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: normalize(15),
                            alignSelf: 'center',
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: normalize(9),
                              marginRight: normalize(2),
                            }}>
                            Line
                          </Text>
                          <View style={{flexDirection: 'row'}}>
                            {HomeReducer?.currentBarResponse?.users
                              ?.line_type == '5' && <LineHead number={'5'} />}
                            {HomeReducer?.currentBarResponse?.users
                              ?.line_type == '4' && <LineHead number={'4'} />}
                            {HomeReducer?.currentBarResponse?.users
                              ?.line_type == '3' && <LineHead number={'3'} />}
                            {HomeReducer?.currentBarResponse?.users
                              ?.line_type == '2' && <LineHead number={'2'} />}
                            {HomeReducer?.currentBarResponse?.users
                              ?.line_type == '1' && <LineHead number={'1'} />}
                            {HomeReducer?.currentBarResponse?.users
                              ?.line_type == '1' && (
                              <ColorText colorCode={'#ffff'} name={'None'} />
                            )}
                            {HomeReducer?.currentBarResponse?.users
                              ?.line_type == '2' && (
                              <ColorText colorCode={'#2AE8AB'} name={'Short'} />
                            )}
                            {HomeReducer?.currentBarResponse?.users
                              ?.line_type == '3' && (
                              <ColorText
                                colorCode={'#DCE024'}
                                name={'Medium'}
                              />
                            )}
                            {HomeReducer?.currentBarResponse?.users
                              ?.line_type == '4' && (
                              <ColorText colorCode={'#FF7A00'} name={'Long'} />
                            )}
                            {HomeReducer?.currentBarResponse?.users
                              ?.line_type == '5' && (
                              <ColorText
                                colorCode={'#B4262C'}
                                name={'Very long'}
                              />
                            )}
                          </View>
                        </View>
                        <Text
                          style={{
                            fontSize: normalize(18),
                            color: '#fff',
                            alignSelf: 'center',
                            marginTop: normalize(10),
                          }}>
                          How is the line?
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            // justifyContent: 'space-around',
                            marginTop: normalize(12),
                            // marginHorizontal: normalize(8),
                          }}>
                          <View
                            style={{
                              justifyContent: 'space-between',
                              // alignItems: 'center',
                              marginHorizontal: normalize(10),
                            }}>
                            <Text
                              style={{
                                color: '#fff',
                                fontSize: normalize(8),
                              }}>
                              None
                            </Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginLeft:
                                Platform.OS == 'ios'
                                  ? normalize(15)
                                  : normalize(18),
                            }}>
                            <Text
                              style={{
                                color: '#fff',
                                fontSize: normalize(8),
                              }}>
                              Short
                            </Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                color: '#fff',
                                fontSize: normalize(8),
                                marginLeft:
                                  Platform.OS == 'ios'
                                    ? normalize(40)
                                    : normalize(45),
                              }}>
                              Medium
                            </Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginLeft:
                                Platform.OS == 'ios'
                                  ? normalize(38)
                                  : normalize(38),
                            }}>
                            <Text
                              style={{color: '#fff', fontSize: normalize(8)}}>
                              Long
                            </Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginLeft: normalize(25),
                              marginLeft:
                                Platform.OS == 'ios'
                                  ? normalize(32)
                                  : normalize(36),
                            }}>
                            <Text
                              style={{color: '#fff', fontSize: normalize(8)}}>
                              Very Long
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            width: '85%',

                            alignSelf: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                          }}>
                          {DATA.map(data => {
                            return (
                              <>
                                {data.id == 2 ||
                                data.id == 5 ||
                                data.id == 8 ||
                                data.id == 11 ? (
                                  <>
                                    <TouchableOpacity
                                      onPress={() => touchUpdate(data.id)}
                                      style={{
                                        alignSelf: 'flex-end',
                                      }}>
                                      <Image
                                        source={
                                          percentage < data.number &&
                                          data.id == 2
                                            ? data.imagePro1
                                            : percentage < data.number &&
                                              data.id == 5
                                            ? data.imagePro1
                                            : percentage < data.number &&
                                              data.id == 8
                                            ? data.imagePro1
                                            : percentage < data.number - 1 &&
                                              data.id == 11
                                            ? data.imagePro1
                                            : data.imagePro2
                                        }
                                        resizeMode={'contain'}
                                        style={{
                                          height: normalize(45),
                                          width: normalize(20),
                                          tintColor:
                                            percentage > data.number - 1 &&
                                            data.id == 2
                                              ? '#2AE8AB'
                                              : percentage > data.number - 1 &&
                                                data.id == 5
                                              ? '#DCE024'
                                              : percentage > data.number - 1 &&
                                                data.id == 8
                                              ? '#FF7A00'
                                              : percentage > data.number - 2 &&
                                                data.id == 11
                                              ? '#B4262C'
                                              : '#252F6F',
                                        }}
                                      />
                                    </TouchableOpacity>
                                  </>
                                ) : (
                                  <TouchableOpacity
                                    onPress={() => touchUpdate(data.id)}
                                    style={{
                                      alignSelf: 'flex-end',
                                    }}>
                                    <Image
                                      source={
                                        percentage > data.number
                                          ? data.imagePro2
                                          : data.imagePro1
                                      }
                                      resizeMode={'contain'}
                                      style={{
                                        tintColor:
                                          percentage > data.number &&
                                          (data.id == 0 || data.id == 1)
                                            ? '#2AE8AB'
                                            : percentage > data.number &&
                                              (data.id == 3 || data.id == 4)
                                            ? '#DCE024'
                                            : percentage > data.number &&
                                              (data.id == 6 || data.id == 7)
                                            ? '#FF7A00'
                                            : percentage > data.number &&
                                              (data.id == 9 || data.id == 10)
                                            ? '#B4262C'
                                            : '#252F6F',
                                        height: normalize(37),
                                        width: normalize(16),
                                        // marginTop: normalize(10),
                                      }}
                                    />
                                  </TouchableOpacity>
                                )}
                              </>
                            );
                          })}
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: normalize(10),
                            marginHorizontal: normalize(10),
                          }}>
                          <View
                            style={{
                              height: normalize(10),
                              width: normalize(10),
                              borderRadius: normalize(6),
                              backgroundColor: '#fff',
                            }}
                          />
                          <View
                            style={{
                              height: normalize(1),
                              width: normalize(55),
                              backgroundColor: '#fff',
                            }}
                          />
                          <View
                            style={{
                              height: normalize(10),
                              width: normalize(10),
                              borderRadius: normalize(6),
                              backgroundColor: '#fff',
                            }}
                          />
                          <View
                            style={{
                              height: normalize(1),
                              width: normalize(55),
                              backgroundColor: '#fff',
                            }}
                          />
                          <View
                            style={{
                              height: normalize(10),
                              width: normalize(10),
                              borderRadius: normalize(6),
                              backgroundColor: '#fff',
                            }}
                          />
                          <View
                            style={{
                              height: normalize(1),
                              width: normalize(55),
                              backgroundColor: '#fff',
                            }}
                          />
                          <View
                            style={{
                              height: normalize(10),
                              width: normalize(10),
                              borderRadius: normalize(6),
                              backgroundColor: '#fff',
                            }}
                          />
                          <View
                            style={{
                              height: normalize(1),
                              width: normalize(55),
                              backgroundColor: '#fff',
                            }}
                          />
                          <View
                            style={{
                              height: normalize(10),
                              width: normalize(10),
                              borderRadius: normalize(6),
                              backgroundColor: '#fff',
                            }}
                          />
                        </View>
                        <View
                          style={{
                            alignSelf: 'center',
                            width: '100%',
                            alignItems: 'center',
                          }}>
                          <Slider
                            step={25}
                            animateTransitions={true}
                            containerStyle={{width: normalize(280), height: 40}}
                            minimumValue={0}
                            maximumValue={100}
                            thumbStyle={{
                              height: 24,
                              width: 14,
                              borderRadius: 50,
                              backgroundColor: '#FFFFFF',
                            }}
                            trackStyle={{backgroundColor: '#252F6F'}}
                            minimumTrackStyle={{backgroundColor: '#252F6F'}}
                            value={percentage}
                            onValueChange={e => {
                              console.log('changed point', e);
                              setPercentage(e);
                              if (e == 0) {
                                setLine(1);
                              } else if (e > 0 && e <= 25) {
                                setLine(2);
                              } else if (e > 25 && e <= 50) {
                                setLine(3);
                              } else if (e > 50 && e <= 75) {
                                setLine(4);
                              } else if (e > 75 && e <= 100) {
                                setLine(5);
                              }
                            }}
                          />
                        </View>
                        <View style={{paddingHorizontal: normalize(10)}}></View>

                        <ButtonItems
                          width={normalize(280)}
                          textbutton={'Submit'}
                          marginTop={normalize(2)}
                          onPress={() => {
                            showModal();
                          }}
                        />
                        <Text
                          style={{
                            fontSize: normalize(15),
                            color: '#fff',
                            alignSelf: 'center',
                            marginTop: normalize(35),
                            marginBottom: normalize(15),
                          }}>
                          Passes
                        </Text>
                        {HomeReducer?.todaysPassResponse?.length > 0 ? (
                          <>
                            {HomeReducer?.todaysPassResponse?.map(
                              (item, index) => (
                                <TouchableOpacity
                                  onPress={() => (
                                    props.navigation.navigate('Passpurchase', {
                                      id: item.id,
                                      barId: item.bar_owner_id,
                                      amt: item.amount,
                                      expDate: item.end_date,
                                      name: item.pass_id,
                                      message: item.message,
                                      exptime: item.end_time,
                                    }),
                                    setModalVisible(!isModalVisible)
                                  )}
                                  style={{
                                    height: normalize(90),
                                    width: normalize(280),
                                    marginBottom: normalize(16),
                                    backgroundColor: '#161F5C',
                                    borderRadius: normalize(10),
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      marginHorizontal: normalize(10),
                                      // marginVertical: normalize(10),
                                      alignItems: 'center',
                                    }}>
                                    <View>
                                      <Text
                                        style={{
                                          fontSize: normalize(18),
                                          color: '#FF58BF',
                                          // marginHorizontal: normalize(12),
                                        }}>
                                        {item.message}
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        alignItems: 'center',
                                        // marginTop: normalize(10),
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: normalize(12),
                                          color: '#FFF',
                                          // marginHorizontal: normalize(12),
                                          // marginVertical: normalize(10),
                                        }}>
                                        Price
                                      </Text>
                                      <Text
                                        style={{
                                          fontSize: normalize(20),
                                          color: '#FFF',
                                          // marginHorizontal: normalize(12),
                                          // marginVertical: normalize(10),
                                        }}>
                                        ${getCurrentAmount(item)}
                                        {/* {`$${item.amount}`} */}
                                      </Text>
                                    </View>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      marginTop: normalize(5),
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: normalize(12),
                                        color: '#fff',
                                        alignSelf: 'center',
                                        marginLeft: normalize(10),
                                      }}>
                                      Date{' '}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: normalize(12),
                                        color: '#2AE8AB',
                                        alignSelf: 'center',
                                      }}>
                                      {moment(item.end_date).format(
                                        'Do MMMM YYYY',
                                      )}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              ),
                            )}
                          </>
                        ) : (
                          <View
                            style={{
                              backgroundColor: '#161F5C',
                              padding: normalize(20),
                              marginHorizontal: normalize(20),
                              marginTop: normalize(20),
                              borderRadius: normalize(15),
                              borderWidth: normalize(2),
                              borderColor: '#161f5c',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                color: '#fff',
                                fontSize: normalize(15),
                                marginBottom: normalize(15),
                              }}>
                              Bar does not have this feature
                            </Text>
                            {HomeReducer?.currentBarResponse?.request_bar_pass >
                            0 ? (
                              <ButtonItems
                                width={normalize(230)}
                                backgroundColor="#3B4061"
                                marginVertical={normalize(30)}
                                height={normalize(45)}
                                marginTop={normalize(5)}
                                textbutton={'Already Requested'}
                              />
                            ) : (
                              <ButtonItems
                                width={normalize(230)}
                                marginVertical={normalize(30)}
                                height={normalize(45)}
                                marginTop={normalize(5)}
                                textbutton={'Request bar for passes'}
                                onPress={() => barVisitRequest()}
                              />
                            )}

                            <Text
                              style={{
                                color: Colors.lightgreen,
                                marginTop: normalize(15),
                                width: '98%',
                                textAlign: 'center',
                                fontFamily: Fonts.Poppins_Medium,
                                paddingRight: normalize(4),
                                fontSize: normalize(13),
                              }}>
                              {HomeReducer?.currentBarResponse?.request_pass}{' '}
                              <Text
                                style={{
                                  color: '#9097CD',
                                  fontFamily: Fonts.Poppins_Regular,
                                }}>
                                users have requested this feature
                              </Text>{' '}
                            </Text>
                          </View>
                        )}
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </Modal>
          </View>
        </View>
        <Modal isVisible={logoutModal}>
          <View
            style={{
              height:
                Platform.OS == 'android' ? normalize(290) : normalize(290),
              // borderRadius: normalize(15),
              alignSelf: 'center',
              width: normalize(300),
              alignItems: 'center',
              backgroundColor: '#08103A',
              borderRadius: normalize(10),
            }}>
            <View
              style={{
                height: normalize(250),
                width: normalize(275),
                backgroundColor: '#161F5C',
                marginTop: normalize(18),
                borderRadius: normalize(10),
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: normalize(20),
                      color: '#FF58BF',
                      textAlign: 'center',
                      marginTop: normalize(8),
                      paddingHorizontal: normalize(20),
                      marginBottom: normalize(32),
                    }}>
                    Please logout and login again to use the app!
                  </Text>
                  <ButtonItems
                    width={normalize(170)}
                    marginVertical={normalize(30)}
                    height={normalize(45)}
                    marginTop={normalize(5)}
                    textbutton={'Logout'}
                    onPress={() => dispatch(logoutRequest())}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    zIndex: 999,
    left: 0,
    right: 0,
    backgroundColor: '#060C30',
    borderBottomRightRadius: normalize(15),
    borderBottomLeftRadius: normalize(15),
    // Change this to your desired height
  },
});
