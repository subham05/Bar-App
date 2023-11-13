import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  TextInput,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Modal from 'react-native-modal';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import ButtonItems from '../../components/ButtonItems';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../utils/helpers/Loader';
import {
  addBarRequest,
  clearStore,
  favouriteRequest,
  getBarListRequest,
  getFavoutiteListRequest,
  getFilterRequest,
  getNearByRequest,
  getTagRequest,
  sortRequest,
  storeSortData,
} from '../../redux/reducer/HomeReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import Tags from 'react-native-tags';
import Geolocation from '@react-native-community/geolocation';
import LineHead from '../../components/LineHead';
import ColorText from '../../components/ColorText';
import constants from '../../utils/helpers/constants';
import {getDistance} from 'geolib';
import { profileRequest } from '../../redux/reducer/ProfileReducer';
export default function Search(props) {
  const STATUSBAR_HEIGHT = StatusBar.currentHeight;
  const [pressm, setPressm] = useState(0);
  const [pressm1, setPressm1] = useState([]);
  const [show, setShow] = useState(false);
  const [tagVal, setTagVal] = useState();
  const [isTag, setisTag] = useState([]);
  const [lat, setLat] = useState('');
  const [latlong, setLatLong] = useState([]);
  const [long, setLong] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible10, setModalVisible10] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);
  const [barEmail, setBarEmail] = useState('');
  const [address, setAddress] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [locationStatus, setLocationStatus] = useState('');
  const [barname, setBarName] = useState('');
  const [search, setSearch] = useState('');
  const [sortby, setSortBy] = useState('ASC');
  const HomeReducer = useSelector(state => state.HomeReducer);
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const [selected, setSelected] = useState(['22.5754349', '88.426932']);
  const dispatch = useDispatch();
  const [sortId, setSortId] = useState(1);
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const sortValue = [
    {id: 1, name: 'Friends'},
    {id: 2, name: 'Distance'},
    {id: 3, name: 'Trends'},
    {id: 4, name: 'Line-wait'},
  ];

  console.log('tags array', pressm1);
  const requestLocationPermission = async () => {
    console.log("alwaysaccess");
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
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
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
  useEffect(() => {

    requestLocationPermission();
    // return () => {
    //   Geolocation.clearWatch(watchID);
    // };
  }, []);
  function ApplySort() {
    let obj = new FormData();
    obj.append('sort_type', sortId);
    obj.append('sort_by', sortby);
    obj.append('lat', currentLatitude);
    obj.append('long', currentLongitude);
    console.log('sort DATA=======>', obj);
    if (currentLongitude == '' || currentLatitude == '') {
      requestLocationPermission();
    } else {
      connectionrequest()
        .then(() => {
          dispatch(sortRequest(obj));
          // dispatch(storeSortData(obj))
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    }
  }
  function ApplyFilter() {
    let obj = new FormData();
    for (let index = 0; index < pressm1.length; index++) {
      obj.append('tags[]', pressm1[index]);
    }
    if (pressm1.length > 0) dispatch(getFilterRequest(obj));
  }
  function Clear() {
    setPressm1([]);
    setSelected(HomeReducer?.tagResponse);
  }

  useEffect(() => {
    if (HomeReducer.status == 'Home/getTagSuccess') {
      setSelected(HomeReducer?.tagResponse);
    } else if (HomeReducer.status == 'Home/favouriteSuccess') {
      ApplyFilter();
      ApplySort();
    } else if (HomeReducer.status == 'Home/addBarSuccess') {
      setBarName('');
      setAddress('');
      setisTag([]);
      setTimeout(() => {
        setModalVisible2(false);
      }, 2000);
    }
  }, [HomeReducer.status]);
  useEffect(() => {
    let obj1 = new FormData();
    obj1.append('lat', latlong[0]);
    obj1.append('long', latlong[1]);
    // obj1.append('lat', '22.59158256');
    // obj1.append('long', '88.42227734');
    dispatch(getNearByRequest(obj1));
  }, [latlong]);
  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setLatLong([currentLatitude, currentLongitude]);
        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  // const subscribeLocationLocation = () => {
  //   watchID = Geolocation.watchPosition(
  //     (position) => {
  //       //Will give you the location on location change

  //       setLocationStatus('You are Here');
  //       console.log(position);

  //       //getting the Longitude from the location json
  //       const currentLongitude =
  //         JSON.stringify(position.coords.longitude);

  //       //getting the Latitude from the location json
  //       const currentLatitude =
  //         JSON.stringify(position.coords.latitude);

  //       //Setting Longitude state
  //       setCurrentLongitude(currentLongitude);

  //       //Setting Latitude state
  //       setCurrentLatitude(currentLatitude);
  //     },
  //     (error) => {
  //       setLocationStatus(error.message);
  //     },
  //     {
  //       enableHighAccuracy: false,
  //       maximumAge: 1000
  //     },
  //   );
  // };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  console.log('---Longitude', currentLongitude);
  console.log('---Latitude', currentLatitude);
  useEffect(() => {
    connectionrequest()
      .then(() => {
        dispatch(getBarListRequest());
        dispatch(getFavoutiteListRequest());
        dispatch(getTagRequest());
        dispatch(profileRequest());
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }, []);
  useEffect(() => {
    const obj = {
      name: search,
    };
    connectionrequest()
      .then(() => {
        dispatch(getBarListRequest(obj));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }, [search]);

  // barList card
  const renderItem = ({item, index}) => {
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
                width: '67%',
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
                { ProfileReducer?.profileResponse?.friend_count >= 5 ? (
                  <Text
                    style={{
                      color: '#B9A4F4',
                      fontSize: normalize(9),
                    }}>
                    {item.friends_count}
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
              justifyContent: 'space-between',
              width: '20%',
              alignItems: 'flex-end',
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

                alignItems: 'center',
                justifyContent: 'flex-end',
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
                      latitude: parseFloat(latlong[0]).toFixed(2),
                      longitude: parseFloat(latlong[1]).toFixed(2),
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
  // favourite card
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
                  id: item?.bar_owner?.id,
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
              {item?.bar_owner?.profile_photo_path ? (
                <Image
                  source={{
                    uri: `${constants.IMAGE_URL}${item?.bar_owner?.profile_photo_path}`,
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
                  id: item?.bar_owner?.id,
                })
              }
              style={{
                width: '67%',
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
                {item?.bar_owner?.full_name}
              </Text>
              <View style={{flexDirection: 'row', marginTop: normalize(3)}}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: normalize(9),
                    marginRight: normalize(2),
                  }}>
                  Line
                  {/* {item.bar_owner?.line_type} */}
                </Text>
                {item.bar_owner?.line_type === '1' && <LineHead number={'1'} />}
                {item.bar_owner?.line_type === '2' && <LineHead number={'2'} />}
                {item.bar_owner?.line_type == '3' && <LineHead number={'3'} />}
                {item.bar_owner?.line_type === '4' && <LineHead number={'4'} />}
                {item.bar_owner?.line_type === '5' && <LineHead number={'5'} />}

                {item.bar_owner?.line_type === '1' && (
                  <ColorText colorCode={'#ffff'} name={'None'} />
                )}
                {item.bar_owner?.line_type === '2' && (
                  <ColorText colorCode={'#2AE8AB'} name={'Short'} />
                )}
                {item.bar_owner?.line_type === '3' && (
                  <ColorText colorCode={'#DCE024'} name={'Medium'} />
                )}
                {item.bar_owner?.line_type === '4' && (
                  <ColorText colorCode={'#FF7A00'} name={'Long'} />
                )}
                {item.bar_owner?.line_type === '5' && (
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
                    {item.bar_owner?.friends_count}
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
              onPress={() =>
                handleFavourite(item.bar_owner?.id, item.bar_owner?.is_fav)
              }>
              <Image
                source={
                  item.bar_owner?.is_fav == 1 ? Icons.pLove : Icons.outlinelove
                }
                style={{
                  height: normalize(20),
                  width: normalize(23),
                  tintColor:
                    item.bar_owner?.is_fav == 1 ? '#D73F9D' : '#3e456d',
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginTop: normalize(10),
                marginBottom: normalize(8),
                width: normalize(50),
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
                  fontSize: normalize(8),
                  color: '#FFFFFF',
                  paddingHorizontal: normalize(3),
                }}>
                {(
                  getDistance(
                    {
                      latitude: parseFloat(item?.bar_owner?.lat).toFixed(2),
                      longitude: parseFloat(item?.bar_owner?.long).toFixed(2),
                    },
                    {
                      latitude: parseFloat(latlong[0]).toFixed(2),
                      longitude: parseFloat(latlong[1]).toFixed(2),
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
                  id: item?.user?.id,
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
              {item?.user?.profile_photo_path ? (
                <Image
                  source={{
                    uri: `${constants.IMAGE_URL}${item?.user?.profile_photo_path}`,
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
                  id: item?.user?.id,
                })
              }
              style={{
                width: '67%',
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
                {item?.user?.full_name}
              </Text>
              <View style={{flexDirection: 'row', marginTop: normalize(3)}}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: normalize(9),
                    marginRight: normalize(2),
                  }}>
                  Line
                  {/* {item.bar_owner?.line_type} */}
                </Text>
                {item.user?.line_type === '1' && <LineHead number={'1'} />}
                {item.user?.line_type === '2' && <LineHead number={'2'} />}
                {item.user?.line_type == '3' && <LineHead number={'3'} />}
                {item.user?.line_type === '4' && <LineHead number={'4'} />}
                {item.user?.line_type === '5' && <LineHead number={'5'} />}

                <Text
                  style={{
                    color: '#DCE024',
                    marginLeft: normalize(5),
                    fontSize: normalize(9),
                  }}>
                  {item.user?.line_type === '1' && (
                    <ColorText colorCode={'#ffff'} name={'None'} />
                  )}
                  {item.user?.line_type === '2' && (
                    <ColorText colorCode={'#2AE8AB'} name={'Short'} />
                  )}
                  {item.user?.line_type === '3' && (
                    <ColorText colorCode={'#DCE024'} name={'Medium'} />
                  )}
                  {item.user?.line_type === '4' && (
                    <ColorText colorCode={'#FF7A00'} name={'Long'} />
                  )}
                  {item.user?.line_type === '5' && (
                    <ColorText colorCode={'#B4262C'} name={'Very Long'} />
                  )}
                </Text>
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
                    {item.user?.friends_count}
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
              onPress={() =>
                handleFavourite(item?.user?.id, item?.user?.is_fav)
              }>
              {console.log('filter fav', item?.user?.is_fav)}
              <Image
                source={
                  item?.user?.is_fav == 1 ? Icons.pLove : Icons.outlinelove
                }
                style={{
                  height: normalize(20),
                  width: normalize(23),
                  tintColor: item?.user?.is_fav == 1 ? '#D73F9D' : '#3e456d',
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: normalize(40),
                marginTop: normalize(10),
                marginBottom: normalize(8),
              }}>
              <Image
                source={Icons.Location}
                style={{height: normalize(8), width: normalize(6)}}
              />
              <Text
                style={{
                  fontSize: normalize(8),
                  color: '#FFFFFF',

                  height: normalize(10),
                  overflow: 'hidden',
                  paddingHorizontal: normalize(3),
                }}>
                {(
                  getDistance(
                    {
                      latitude: parseFloat(item?.user?.lat).toFixed(2),
                      longitude: parseFloat(item?.user?.long).toFixed(2),
                    },
                    {
                      latitude: parseFloat(latlong[0]).toFixed(2),
                      longitude: parseFloat(latlong[1]).toFixed(2),
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
  const mrenderItem = ({item, index}) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            marginTop: normalize(18),
            justifyContent: 'space-between',
            marginHorizontal: normalize(15),
          }}>
          <View style={{}}>
            <Text
              style={{
                color: '#fff',
                fontSize: normalize(15),
                fontWeight: '700',
              }}>
              {item.name}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setSortId(item.id);
              setPressm(index);
            }}
            style={{
              height: normalize(16),
              width: normalize(16),
              borderRadius: normalize(8),
              borderWidth: normalize(1),
              borderColor: index == pressm ? '#D73F9D' : '#3E456D',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {index == pressm && (
              <View
                style={{
                  alignSelf: 'center',
                  // marginTop:
                  //   Platform.OS == 'ios' ? normalize(2.75) : normalize(3),
                }}>
                <View
                  style={{
                    height: normalize(8),
                    width: normalize(8),
                    borderRadius: normalize(4),
                    backgroundColor: '#D73F9D',
                  }}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </>
    );
  };
  const handleSelect = item => {
    const newItem = selected.map(val => {
      if (val.id == item.id) {
        return {...val, active: item.active == 1 ? 0 : 1};
      } else {
        return val;
      }
    });
    setSelected(newItem);
  };
  const handlePostArray = (item, index) => {
    console.log('Item--------->>', item); // id: 2
    let searchedArr = pressm1.find(element => element == item);
    // let index1 = pressm1.findIndex(val => {
    //   return val == searchedArr;
    // });
    let index1 = pressm1.indexOf(searchedArr);
    console.log('index', index1);
    if (searchedArr != undefined) {
      console.log('===here', pressm1.splice(index1, 1));
      pressm1.splice(index, 1);
      setPressm1([...pressm1]);
    } else {
      setPressm1([...pressm1, item]);
    }
    console.log('searchedArr--------->>', searchedArr);
  };
  // tags
  const m1renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleSelect(item);
          handlePostArray(item.id, index);
        }}
        style={{
          minHeight: normalize(29),
          width: normalize(90),
          padding: normalize(5),
          backgroundColor: item.active == 1 ? '#36407D' : 'white',
          borderRadius: normalize(7),
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: normalize(4),
          marginTop: normalize(10),
        }}>
        <Text
          style={{
            color: item.active == 1 ? '#2AE8AB' : 'black',
            fontWeight: '700',
          }}>
          {item.tag}
        </Text>
      </TouchableOpacity>
    );
  };
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
      let obj1 = new FormData();
      obj1.append('lat', currentLatitude);
      obj1.append('long', currentLongitude);

      connectionrequest()
        .then(() => {
          if (search != '') {
            const obj = {
              name: search,
            };

            console.log('search with======>', obj);
            dispatch(getBarListRequest(obj));
          } else {
            dispatch(getBarListRequest());
          }

          dispatch(getFavoutiteListRequest());
          dispatch(getNearByRequest(obj1));
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    }
  }, [HomeReducer.status]);

  // tags render
  const renderTag = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => delElement(item.id)}
        style={{
          height: normalize(28),
          borderWidth: normalize(0.5),
          backgroundColor: '#1D2658',
          borderColor: Colors.darkblue,
          justifyContent: 'center',
          paddingHorizontal: normalize(10),
          borderRadius: normalize(10),
          borderWidth: normalize(0.5),
          alignItems: 'center',
          marginLeft: normalize(3),
          marginTop: normalize(10),
        }}>
        <Text
          style={{
            color: '#2AE8AB',
            fontFamily: Fonts.Poppins_Regular,
            fontWeight: '600',
          }}>
          {item.tag}
        </Text>
      </TouchableOpacity>
    );
  };
  const addElement = index => {
    if (tagVal != '') {
      setisTag([...isTag, {tag: tagVal, id: isTag?.length + 1}]);
      setTagVal('');
      setModalVisible3(false);
    } else {
      showErrorAlert('Please Enter at least one letter');
    }
  };
  console.log('tags', isTag);

  const delElement = id =>
    setisTag([...isTag.filter((item, index) => item.id !== id)]);

  function addaBar() {
    console.log('---', isTag);
    if (barname == '') {
      showErrorAlert('Please enter a bar name');
    } else if (address == '') {
      showErrorAlert('Please enter Address');
    } else if (isTag.length == 0) {
      showErrorAlert('Please enter a Tag');
    } else {
      let obj = new FormData();
      obj.append('full_name', barname);
      obj.append('address', address);
      obj.append('lat', lat);
      obj.append('long', long);
      for (let index = 0; index < isTag.length; index++) {
        obj.append('tags[]', isTag[index].tag);
      }
      console.log('sending obj', obj);
      connectionrequest()
        .then(() => {
          dispatch(addBarRequest(obj));
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    }
  }
  useEffect(() => {
    if (HomeReducer.status == 'Home/addBarSuccess') {
      setModalVisible10(true);
      setTimeout(() => {
        setModalVisible10(false);
      }, 2000);
    }
  }, [HomeReducer.status]);
  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <MyStatusBar backgroundColor={'#060C30'} barStyle={'light-content'} />
        <Loader
          visible={
            HomeReducer.status == 'Home/getFavoutiteListRequest' ||
            HomeReducer.status == 'Home/getNearByRequest' ||
            HomeReducer.status == 'Home/sortRequest' ||
            HomeReducer.status == 'Home/getFilterRequest' ||
            HomeReducer.status == 'Home/addBarRequest'
          }
        />
        <SafeAreaView style={{flex: 1, backgroundColor: '#030721'}}>
          <View
            style={{
              flexDirection: 'row',
              height: normalize(55),
              width: '100%',
              backgroundColor: '#060C30',
              // backgroundColor: 'red',

              marginTop: Platform.OS == 'android' ? STATUSBAR_HEIGHT : null,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '58%',
                justifyContent: 'space-between',
                marginHorizontal: normalize(15),
                alignSelf: 'center',
                // backgroundColor: 'red',
                position: 'absolute',
                right: 0,
              }}>
              <View style={{alignSelf: 'center'}}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: normalize(21),

                    fontFamily: Fonts.Poppins_Medium,
                  }}>
                  Search
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setShow(!show);
                  setSearch('');
                  dispatch(clearStore());
                }}
                //   onPress={() => props.navigation.navigate('Settings')}
              >
                <Image
                  source={Icons.Search}
                  resizeMode="contain"
                  style={{
                    height: normalize(20),
                    width: normalize(20),
                    tintColor: '#fff',
                    // marginLeft: normalize(70),
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          {show == true && (
            <View
              style={{
                height: normalize(40),
                width: normalize(290),
                backgroundColor: '#0E1648',
                borderRadius: normalize(5),
                alignSelf: 'center',
                marginVertical: normalize(15),
                paddingHorizontal: normalize(10),
                color: '#fff',
                fontSize: normalize(14),
                borderWidth: 1,
                borderColor: '#161F5C',
                alignItems: 'center',
                // justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: '15%',
                  // backgroundColor: 'red',
                  height: normalize(40),
                  justifyContent: 'center',
                }}>
                <Image
                  source={Icons.Search}
                  resizeMode="contain"
                  style={{
                    height: normalize(15),
                    width: normalize(25),
                    tintColor: 'white',
                  }}
                />
              </View>
              <View
                style={{
                  width: '85%',
                  // backgroundColor: 'green',
                  height: normalize(40),
                  justifyContent: 'center',
                }}>
                <TextInput
                  placeholder="Search"
                  value={search}
                  onChangeText={val => setSearch(val)}
                  placeholderTextColor="#fff"
                  style={{
                    color: '#fff',
                    paddingBottom: normalize(2),
                    justifyContent: 'center',
                    height: normalize(40),
                    fontSize: normalize(13),
                    fontWeight: '400',
                    // alignSelf: 'center',
                    fontFamily: Fonts.Poppins_Light,
                    // paddingVertical: normalize(15),
                  }}></TextInput>
                {console.log('---SearchValue', search)}
              </View>
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: normalize(16),
              marginBottom: normalize(8),
            }}>
            {show == true && (
              <TouchableOpacity
                onPress={() => setModalVisible(!isModalVisible)}
                style={{
                  height: normalize(40),
                  width: normalize(138),
                  backgroundColor: '#0E143D',
                  borderRadius: normalize(10),
                  borderWidth: normalize(1),
                  borderColor: '#212B69',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: normalize(13),
                }}>
                <Image
                  source={Icons.arrow2}
                  style={{
                    height: normalize(12),
                    width: normalize(8),
                    transform: [{rotate: '180deg'}],
                  }}
                />
                <Image
                  source={Icons.arrow2}
                  style={{height: normalize(12), width: normalize(8)}}
                />
                <Text
                  style={{
                    height: normalize(34),
                    width: normalize(200),
                    paddingHorizontal: normalize(5),

                    color: '#fff',
                    marginTop: normalize(16),
                    fontSize: normalize(12),
                  }}>
                  Sort Most Least
                </Text>
              </TouchableOpacity>
            )}
            {show == true && (
              <TouchableOpacity
                onPress={() => {
                  setModalVisible1(!isModalVisible1);
                  setSearch('');
                }}
                style={{
                  height: normalize(40),
                  width: normalize(138),
                  backgroundColor: '#0E143D',
                  borderRadius: normalize(10),
                  borderWidth: normalize(1),
                  borderColor: '#212B69',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: normalize(45),
                }}>
                <Image
                  source={Icons.filter}
                  style={{
                    height: normalize(11),
                    width: normalize(14),
                  }}
                />

                <Text
                  style={{
                    height: normalize(34),
                    width: normalize(200),
                    paddingHorizontal: normalize(12),
                    fontFamily: Fonts.Poppins_Regular,
                    color: '#fff',
                    marginTop: normalize(16),
                  }}>
                  Filter
                </Text>
              </TouchableOpacity>
            )}
            <Modal
              isVisible={isModalVisible}
              onBackdropPress={() => setModalVisible(false)}>
              <View
                style={{
                  height: normalize(300),

                  alignSelf: 'center',

                  // alignItems: 'center',
                  backgroundColor: '#161F5C',
                  width: normalize(318),
                  bottom: normalize(0),
                  // marginTop: normalize(300),
                  borderTopRightRadius: normalize(15),
                  borderTopLeftRadius: normalize(15),
                  position: 'absolute',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',

                    marginTop: normalize(20),
                    marginHorizontal: normalize(16),
                  }}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={{
                      height: normalize(30),
                      width: normalize(30),
                      borderRadius: normalize(5),
                      backgroundColor: '#D73F9D',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      resizeMode={'contain'}
                      source={Icons.Arrow}
                      style={{
                        height: normalize(8),
                        width: normalize(8),
                        transform: [{rotate: '90deg'}],
                        tintColor: '#fff',
                      }}></Image>
                  </TouchableOpacity>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontSize: normalize(14),
                        color: '#B9A4F4',
                        fontFamily: Fonts.Poppins_Regular,
                        marginLeft: normalize(8),
                      }}>
                      Sort By
                    </Text>
                    <TouchableOpacity
                      onPress={() => setSortBy('DESC')}
                      style={{
                        height: normalize(29),
                        width: normalize(85),
                        backgroundColor: sortby == 'DESC' ? '#fff' : '#36407D',
                        borderRadius: normalize(7),
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: normalize(8),
                      }}>
                      <Text
                        style={{
                          fontSize: normalize(14),
                          color: sortby == 'DESC' ? '#161F5C' : '#2AE8AB',
                          fontWeight: '700',
                        }}>
                        Most
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setSortBy('ASC')}
                      style={{
                        height: normalize(29),
                        width: normalize(85),
                        backgroundColor: sortby == 'ASC' ? '#fff' : '#36407D',
                        borderRadius: normalize(7),
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: normalize(8),
                      }}>
                      <Text
                        style={{
                          fontSize: normalize(14),
                          color: sortby == 'ASC' ? '#161F5C' : '#2AE8AB',
                          fontWeight: '700',
                        }}>
                        Least
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* tags */}
                <FlatList
                  data={sortValue}
                  renderItem={mrenderItem}
                  keyExtractor={(item, index) => index.toString()}
                  // contentContainerStyle={{paddingBottom: normalize(60)}}
                />
                <ButtonItems
                  width={'90%'}
                  marginBottom={normalize(30)}
                  height={normalize(45)}
                  marginTop={normalize(5)}
                  textbutton={'View Result'}
                  onPress={() => {
                    ApplySort();
                    setModalVisible(!isModalVisible);
                  }}
                />
              </View>
            </Modal>
            <Modal
              isVisible={isModalVisible1}
              onBackdropPress={() => setModalVisible1(false)}>
              <View
                style={{
                  height: normalize(300),
                  alignSelf: 'center',
                  backgroundColor: '#161F5C',
                  width: normalize(318),
                  bottom: normalize(0),
                  borderTopRightRadius: normalize(15),
                  borderTopLeftRadius: normalize(15),
                  position: 'absolute',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: normalize(20),
                    justifyContent: 'space-between',
                    paddingHorizontal: normalize(16),
                    paddingBottom: normalize(10),
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => setModalVisible1(false)}
                      style={{
                        height: normalize(30),
                        width: normalize(30),
                        borderRadius: normalize(5),
                        backgroundColor: '#D73F9D',
                        alignItems: 'center',
                        justifyContent: 'center',
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
                        fontSize: normalize(14),
                        color: '#B9A4F4',
                        marginLeft: normalize(8),
                      }}>
                      Filter
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => Clear()}
                    style={{
                      height: normalize(29),
                      width: normalize(85),
                      backgroundColor: '#D73F9D',
                      borderRadius: normalize(7),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: normalize(14),
                        color: '#fff',
                        fontWeight: '500',
                      }}>
                      Reset
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* Tag Result */}
                <FlatList
                  contentContainerStyle={{
                    paddingBottom: normalize(15),
                    alignItems: 'center',
                  }}
                  data={selected}
                  renderItem={m1renderItem}
                  // horizontal={true}
                  numColumns={3}
                  // showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                />
                <ButtonItems
                  width={'90%'}
                  marginBottom={normalize(25)}
                  height={normalize(45)}
                  marginTop={normalize(10)}
                  textbutton={'View Result'}
                  onPress={() => {
                    ApplyFilter();
                    setModalVisible1(!isModalVisible1);
                  }}
                />
              </View>
            </Modal>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            contentContainerStyle={{paddingBottom: normalize(170)}}>
            {/* barList  */}
            {search != '' && (
              <>
                {HomeReducer?.barListResponse.length > 0 ? (
                  <FlatList
                    data={HomeReducer?.barListResponse}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{
                      paddingTop: normalize(10),
                      paddingBottom: normalize(50),
                    }}
                  />
                ) : (
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: normalize(14),
                      fontWeight: '500',
                      alignSelf: 'center',
                      fontFamily: Fonts.Poppins_Medium,
                      // paddingVertical: normalize(15),
                      marginTop: normalize(15),
                    }}>
                    No Result Found
                  </Text>
                )}
              </>
            )}
            {HomeReducer?.filterResponse && show == true ? (
              <>
                {HomeReducer?.filterResponse.length > 0 && (
                  <>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: normalize(22),
                        fontWeight: '500',
                        alignSelf: 'center',
                        fontFamily: Fonts.Poppins_Medium,
                        // paddingVertical: normalize(15),
                        marginTop: normalize(15),
                      }}>
                      Filter Result
                    </Text>
                    <FlatList
                      data={HomeReducer?.filterResponse}
                      renderItem={renderItem2}
                      keyExtractor={(item, index) => index.toString()}
                      contentContainerStyle={{
                        paddingTop: normalize(10),
                        paddingBottom: normalize(10),
                      }}

                      // ListFooterComponent={

                      // }
                    />
                  </>
                )}
              </>
            ) : null}
            {search == '' && (
              <>
                {HomeReducer?.sortResponse && show == true ? (
                  <>
                    {HomeReducer?.sortResponse.length > 0 && (
                      <>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: normalize(22),
                            fontWeight: '500',
                            alignSelf: 'center',
                            fontFamily: Fonts.Poppins_Medium,
                            // paddingVertical: normalize(15),
                            marginTop: normalize(15),
                          }}>
                          Sort Result
                        </Text>
                        <FlatList
                          data={HomeReducer?.sortResponse}
                          renderItem={renderItem}
                          keyExtractor={(item, index) => index.toString()}
                          contentContainerStyle={{
                            paddingTop: normalize(10),
                            paddingBottom: normalize(10),
                          }}

                          // ListFooterComponent={

                          // }
                        />
                      </>
                    )}
                  </>
                ) : null}
              </>
            )}

            {search === '' && (
              <>
                {/* favourites */}
                <Text
                  style={{
                    color: '#fff',
                    fontSize: normalize(22),
                    fontWeight: '500',
                    alignSelf: 'center',
                    fontFamily: Fonts.Poppins_Medium,
                    // paddingVertical: normalize(15),
                    marginTop: normalize(15),
                  }}>
                  Favorites
                </Text>
                {HomeReducer?.favouriteListResponse.length > 0 ? (
                  <FlatList
                    data={HomeReducer?.favouriteListResponse}
                    renderItem={renderItem1}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{
                      paddingTop: normalize(10),
                      paddingBottom: normalize(15),
                    }}
                    // ListFooterComponent={

                    // }
                  />
                ) : (
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: normalize(12),
                      fontWeight: '400',
                      alignSelf: 'center',
                      // paddingVertical: normalize(15),
                      fontFamily: Fonts.Poppins_Medium,
                    }}>
                    No Favorites
                  </Text>
                )}
                <Text
                  style={{
                    color: '#fff',
                    fontSize: normalize(22),
                    fontWeight: '500',
                    alignSelf: 'center',
                    // paddingVertical: normalize(15),
                    fontFamily: Fonts.Poppins_Medium,
                  }}>
                  Nearby
                </Text>

                {/* nearby */}
                {HomeReducer?.nearByResponse.length > 0 ? (
                  <FlatList
                    data={HomeReducer?.nearByResponse}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{
                      paddingBottom: normalize(15),
                      paddingTop: normalize(10),
                    }}
                  />
                ) : (
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: normalize(12),
                      fontWeight: '400',
                      alignSelf: 'center',
                      // paddingVertical: normalize(15),
                      fontFamily: Fonts.Poppins_Medium,
                    }}>
                    No Nearby Bars
                  </Text>
                )}
              </>
            )}
            {!isKeyboardVisible && (
              <ButtonItems
                height={normalize(48)}
                width={normalize(280)}
                textbutton={'Add A Bar'}
                onPress={() => setModalVisible2(true)}
                marginTop={normalize(10)}
              />
            )}
            <Modal
              isVisible={isModalVisible2}
              onBackdropPress={() => setModalVisible2(false)}>
              <KeyboardAvoidingView
                style={{flexGrow: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView
                showsVerticalScrollIndicator={false}
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
                          paddingHorizontal: normalize(60),
                        }}>
                        Add A Bar
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: '#707AAC',
                        marginTop: normalize(15),
                        marginLeft: normalize(10),
                      }}>
                      Bar Name
                    </Text>
                    <TextInput
                      onChangeText={val => setBarName(val)}
                      value={barname}
                      placeholder="Enter Bar Name"
                      placeholderTextColor={'#36407D'}
                      style={{
                        height: normalize(45),
                        width: normalize(260),
                        backgroundColor: '#161F5C',
                        alignSelf: 'center',
                        borderRadius: normalize(10),
                        marginTop: normalize(5),
                        fontSize: normalize(15),
                        paddingHorizontal: normalize(10),
                        color: '#fff',
                      }}
                    />

                    <Text
                      style={{
                        color: '#707AAC',
                        marginTop: normalize(15),
                        marginLeft: normalize(10),
                      }}>
                      Bar Address
                    </Text>
                    {/* <TextInput
                  placeholder="Enter Bar Address"
                  placeholderTextColor={'#36407D'}
                  style={{
                    height: normalize(45),
                    width: normalize(260),
                    backgroundColor: '#161F5C',
                    alignSelf: 'center',
                    borderRadius: normalize(10),
                    marginTop: normalize(5),
                    fontSize: normalize(15),
                    paddingHorizontal: normalize(10),
                    color: '#fff',
                  }}
                /> */}
                    <ScrollView
                      keyboardShouldPersistTaps="always"
                      style={{
                        backgroundColor: '#161F5C',
                        width: normalize(260),
                        borderRadius: normalize(10),
                        marginTop: normalize(5),
                        paddingHorizontal: normalize(5),
                        alignSelf: 'center',
                      }}>
                      <GooglePlacesAutocomplete
                        // suppressDefaultStyles={true}
                        textInputProps={{placeholderTextColor: '#36407D'}}
                        keyboardShouldPersistTaps="always"
                        GooglePlacesDetailsQuery={{fields: 'geometry'}}
                        fetchDetails={true}
                        placeholder="Bar Address"
                        onPress={(data, details = null) => {
                          // 'details' is provided when fetchDetails = true
                          console.log('Autosearch', data.description);
                          console.log(
                            JSON.stringify(details?.geometry?.location),
                          );
                          setAddress(data.description);
                          setLat(details?.geometry?.location.lat);
                          setLong(details?.geometry?.location.lng);
                        }}
                        query={{
                          key: 'AIzaSyCToUJbAlaW183tWH2N8TvS4iE5BQBOhyc',
                          language: 'en',
                          location: 'lat,lng',
                          radius: 2000,
                        }}
                        styles={{
                          textInput: {
                            height: normalize(45),
                            color: '#fff',
                            fontSize: normalize(15),
                            marginBottom: 0,
                            backgroundColor: 'transparent',
                          },
                          predefinedPlacesDescription: {
                            color: '#1faadb',
                          },
                          description: {color: 'black'},
                        }}
                        onChangeText={val => {
                          console.log(val);
                        }}
                      />
                    </ScrollView>

                    <Text
                      style={{
                        color: '#707AAC',
                        marginTop: normalize(15),
                        marginLeft: normalize(10),
                      }}>
                      Bar Tags
                    </Text>
                    <View
                      style={{
                        width: normalize(260),
                        backgroundColor: '#161F5C',
                        alignSelf: 'center',
                        borderRadius: normalize(10),
                        marginTop: normalize(5),
                        fontSize: normalize(15),
                        paddingHorizontal: normalize(5),
                        color: '#fff',
                      }}>
                      <View
                        style={{
                          marginVertical: normalize(7),
                        }}>
                        <ScrollView
                          style={{maxHeight: normalize(100)}}
                          contentContainerStyle={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                          }}>
                          {isTag?.map((item, index) =>
                            renderTag({item, index}),
                          )}
                        </ScrollView>
                        <TouchableOpacity
                          onPress={() => setModalVisible3(!isModalVisible3)}
                          style={{
                            height: normalize(30),
                            alignSelf: 'center',
                            width: normalize(30),
                            backgroundColor: '#D73F9D',
                            marginTop: normalize(8),
                            borderRadius: normalize(18),
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginVertical: normalize(5),
                          }}>
                          <Image
                            source={Icons.addImage}
                            resizeMode="contain"
                            style={{
                              height: normalize(18),
                              width: normalize(18),
                              tintColor: '#fff',
                            }}
                          />
                        </TouchableOpacity>
                        <Modal
                          isVisible={isModalVisible3}
                          onBackdropPress={() => setModalVisible3(false)}>
                          <KeyboardAvoidingView
                            style={{flexGrow: 1, justifyContent: 'center'}}
                            behavior={
                              Platform.OS === 'ios' ? 'padding' : undefined
                            }>
                            <View
                              style={{
                                height: normalize(210),
                                width: normalize(290),
                                backgroundColor: '#060C30',
                                borderRadius: normalize(15),
                                alignSelf: 'center',
                              }}>
                              <Text
                                style={{
                                  fontSize: normalize(15),
                                  alignSelf: 'center',
                                  color: '#fff',
                                  fontFamily: Fonts.PoppinsRegular,
                                  marginTop: normalize(25),
                                  textAlign: 'center',
                                }}>
                                Do you want to add tags{'\n'}
                                for Bar?
                              </Text>
                              <TextInput
                                placeholder="Enter New Tag"
                                placeholderTextColor={'grey'}
                                keyboardType="default"
                                maxLength={15}
                                onChangeText={val => setTagVal(val)}
                                value={tagVal}
                                style={{
                                  height: normalize(50),
                                  width: normalize(160),
                                  borderRadius: normalize(10),
                                  alignSelf: 'center',
                                  borderWidth: normalize(1),
                                  borderColor: '#24245c',
                                  marginTop: normalize(10),
                                  paddingHorizontal: normalize(20),
                                  color: '#fff',
                                  fontSize: normalize(16),
                                }}
                              />

                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  marginHorizontal: normalize(45),
                                  marginTop: normalize(15),
                                }}>
                                <TouchableOpacity
                                  onPress={() => {
                                    setTagVal('');
                                    setModalVisible3(false);
                                  }}
                                  style={{
                                    height: normalize(36),
                                    width: normalize(95),

                                    borderRadius: normalize(10),
                                    borderColor: '#24245c',
                                    borderWidth: normalize(1),
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      color: '#fff',
                                      fontSize: normalize(14),

                                      color: '#8E6BF2',
                                      fontFamily: Fonts.Poppins_Medium,
                                    }}>
                                    Discard
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() => addElement()}
                                  style={{
                                    height: normalize(36),
                                    width: normalize(95),

                                    borderRadius: normalize(10),

                                    alignItems: 'center',
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#D73F9D',
                                  }}>
                                  <Text
                                    style={{
                                      color: '#fff',
                                      fontSize: normalize(14),

                                      fontFamily: Fonts.Poppins_Regular,
                                    }}>
                                    Confirm
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </KeyboardAvoidingView>
                        </Modal>
                        {/* <Tags
                      initialText="Rock Music"
                      deleteTagOnPress={false}
                      maxNumberOfTags={3}
                      // textInputProps={{
                      //   placeholder: 'Any type of animal',
                      // }}
                      // initialTags={['dog', 'cat', 'chicken']}
                      onChangeTags={tags => console.log(tags)}
                      onTagPress={(index, tagLabel, event, deleted) =>
                        console.log(
                          index,
                          tagLabel,
                          event,
                          deleted ? 'deleted' : 'not deleted',
                        )
                      }
                      containerStyle={{justifyContent: 'center'}}
                      inputStyle={{backgroundColor: '#161F5C', color: '#fff'}}
                      renderTag={({
                        tag,
                        index,
                        onPress,
                        deleteTagOnPress,
                        onTagPress,
                        readonly,
                      }) => (
                        <TouchableOpacity
                          key={`${tag}-${index}`}
                          onPress={onPress}>
                          <TouchableOpacity
                            style={{
                              height: normalize(25),
                              width: normalize(80),
                              backgroundColor: '#08103A',
                              borderRadius: normalize(5),
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginLeft: normalize(1),
                              marginTop: normalize(5),
                              bottom: normalize(3),
                            }}>
                            <View>
                              <Text
                                style={{
                                  fontSize: normalize(11),
                                  color: '#fff',
                                  fontWeight: '700',
                                }}>
                                {tag} <Text style={{color: '#D73F9D'}}>×</Text>
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </TouchableOpacity>
                      )}
                    /> */}
                      </View>
                    </View>

                    <ButtonItems
                      width={normalize(250)}
                      textbutton={'Submit Request'}
                      onPress={() => {
                        addaBar();
                      }}
                    />
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
              <Modal
                isVisible={isModalVisible10}
                onBackdropPress={() => setModalVisible10(false)}>
                <View
                  style={{
                    height:
                      Platform.OS == 'android'
                        ? normalize(290)
                        : normalize(290),
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
                            marginTop: normalize(8),
                          }}>
                          Your request has been submitted, Thank You!
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            </Modal>
          </ScrollView>
          <View
            style={{
              position: 'absolute',
              bottom: normalize(70),
              left: 0,
              width: '100%',
              padding: normalize(20),
            }}></View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
}
