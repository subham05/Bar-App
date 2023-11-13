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
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import MyStatusBar from '../../utils/MyStatusBar';
  import {Colors, Fonts, Icons} from '../../themes/ImagePath';
  import normalize from '../../utils/helpers/dimen';
  import MaskInput, {Masks} from 'react-native-mask-input';
  import connectionrequest from '../../utils/helpers/NetInfo';
  import showErrorAlert from '../../utils/helpers/Toast';
  import Loader from '../../utils/helpers/Loader';
  import TextInputItem from '../../components/TextInputItem';
  import TextInputItem1 from '../../components/Textinputitem1';
  import {useDispatch, useSelector} from 'react-redux';
  import ButtonItems from '../../components/ButtonItems';
  import {addCardRequest, getCardRequest} from '../../redux/reducer/HomeReducer';
  import {
    profileNameUpdateRequest,
    profileRequest,
  } from '../../redux/reducer/ProfileReducer';
  export default function UpdateName(props) {
    const STATUSBAR_HEIGHT = StatusBar.currentHeight;
    const ProfileReducer = useSelector(state => state.ProfileReducer);
    const HomeReducer = useSelector(state => state.HomeReducer);
    const dispatch = useDispatch();
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [username,setUserName] = useState('');
    useEffect(() => {
      setFirstName(ProfileReducer?.profileResponse?.user?.first_name);
      setLastName(ProfileReducer?.profileResponse?.user?.last_name);
      setUserName(ProfileReducer?.profileResponse?.user?.user_name);
    }, []);
  
    function updateName() {
      let obj = new FormData();
      obj.append('first_name', firstName);
      obj.append('last_name', lastName);
      connectionrequest()
        .then(() => {
          dispatch(profileNameUpdateRequest(obj));
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    }
    useEffect(() => {
      if (ProfileReducer.status == 'Profile/profileNameUpdateSuccess') {
        dispatch(profileRequest());
      }
    }, [ProfileReducer.status]);
    return (
      <>
        <MyStatusBar backgroundColor={'#060C30'} barStyle={'light-content'} />
        <SafeAreaView style={{backgroundColor: Colors.darkblue, flex: 1}}>
          <Loader
            visible={ProfileReducer.status == 'Profile/profileNameUpdateRequest'}
          />
  
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
                  marginRight: normalize(38),
                }}>
                Profile <Text style={{color: '#D73F9D'}}>Name</Text>
              </Text>
            </View>
          </View>
          <ScrollView>
            <View style={{width: '90%', alignSelf: 'center'}}>
              <TextInputItem
                viewbordercolor="red"
                placeholder={'Enter First Name'}
                width={'100%'}
                height={normalize(50)}
                borderWidth={1}
                marginTop={normalize(20)}
                // marginTop={normalize(20)}
                value={firstName}
                onChangeText={val => setFirstName(val)}
                textColor={Colors.white}
                placeholderTextColor={Colors.white}
                fontSize={normalize(11)}
              />
            </View>
  
            <View style={{width: '90%', alignSelf: 'center'}}>
              <TextInputItem
                viewbordercolor="red"
                placeholder={'Enter Last Name'}
                width={'100%'}
                height={normalize(50)}
                borderWidth={1}
                // marginTop={normalize(20)}
                value={lastName}
                onChangeText={val => setLastName(val)}
                textColor={Colors.white}
                placeholderTextColor={Colors.white}
                fontSize={normalize(11)}
              />
            </View>
           
  
            <TouchableOpacity
              onPress={() => updateName()}
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
                Update Profile Name
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
  