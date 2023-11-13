import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import Contacts from 'react-native-contacts';
import Share from 'react-native-share';
import React, {useEffect, useState} from 'react';
import connectionrequest from '../../utils/helpers/NetInfo';
import showErrorAlert from '../../utils/helpers/Toast';
// import {ImagePath} from '../../themes/Path';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import {useDispatch, useSelector} from 'react-redux';
export default function InviteFriends(props) {
  const STATUSBAR_HEIGHT = StatusBar.currentHeight;
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const [searchData, setSearchData] = useState('');
  const [contacts, setContacts] = useState([]);
  const [show, setShow] = useState(false);
  const [filtered, setFilteredDataSource] = useState();
  const dispatch = useDispatch();

  const url = ProfileReducer?.InviteInfoResponse?.data?.link;
  const title = ProfileReducer?.InviteInfoResponse?.data?.title;
  const message = ProfileReducer?.InviteInfoResponse?.data?.message;
  const options = Platform.select({
    ios: {
      activityItemSources: [
        // {
        //   // For sharing url with custom title.
        //   placeholderItem: {type: 'url', content: url},
        //   item: {
        //     default: {type: 'url', content: url},
        //   },
        //   subject: {
        //     default: title,
        //   },
        //   linkMetadata: {originalUrl: url},
        // },
        // {
        //   // For sharing text.
        //   placeholderItem: {type: 'text', content: message},
        //   item: {
        //     default: {type: 'text', content: message},
        //     message: null, // Specify no text to share via Messages app.
        //   },
        //   linkMetadata: {
        //     // For showing app icon on share preview.
        //     title: message,
        //   },
        // },
        {
          // For using custom icon instead of default text icon at share preview when sharing with message.
          placeholderItem: {
            type: 'url',
            content: url,
          },
          item: {
            default: {
              type: 'text',
              content:`${message} ${url}`,
            },
          },
          subject: {
                default: title,
              },
          linkMetadata: {
            originalUrl:url
          },
        },
      ],
    },
    default: {
      title,
      subject: title,
      message: `${message} ${url}`,
    },
  });
  const openShare = async () => {
    await Share.open(options);
  };
  useEffect(() => {
    getContacts();
  }, []);
  function getContacts() {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Accept',
    }).then(res => {
      console.log('res', res);
      if (res != 'denied' || res != 'never_ask_again') {
        Contacts.getAll()
          .then(contacts => {
            // work with contacts
            console.log('getting contacts', contacts);
            setContacts(contacts);
            setFilteredDataSource(contacts);
          })
          .catch(e => {
            console.log(e);
          });
      }
    });
  }
  function renderdata3({item, index}) {
    //   console.log(item?.card_no?.split(''));

    return (
      <View
        style={{
          height: normalize(59),
          width: normalize(290),
          backgroundColor: '#0E1648',
          marginVertical: normalize(10),
          borderRadius: normalize(12),
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
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                height: normalize(50),
                width: normalize(50),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
                backgroundColor: '#262D5A',
              }}>
              <Image
                source={Icons.fpage}
                style={{
                  height: normalize(43),
                  width: normalize(43),
                  borderRadius: 50,
                  borderColor: '#D73F9D',
                  borderWidth: 2,
                }}
              />
            </View>
            <View style={{width: '56%'}}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontSize: normalize(12),
                  marginLeft: normalize(10),
                  color: '#B9A4F4',
                  maxWidth: '95%',
                  fontFamily: Fonts.Poppins_SemiBold,
                }}>
                {item?.familyName} {item?.givenName}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontSize: normalize(12),
                  marginLeft: normalize(10),
                  color: '#B9A4F4',
                  maxWidth: '95%',

                  fontFamily: Fonts.Poppins_Regular,
                }}>
                {item?.phoneNumbers[0]?.number}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => openShare()}
            style={{
              alignItems: 'center',
              backgroundColor: '#262D5A',
              paddingVertical: normalize(4),
              paddingHorizontal: normalize(8),
              borderRadius: normalize(6),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: normalize(12),
                color: Colors.white,
                fontWeight: '600',
              }}>
              Invite
            </Text>
            <Image
              source={Icons.link}
              resizeMode="contain"
              style={{
                height: normalize(12),
                width: normalize(16),
                marginLeft: normalize(4),
                tintColor: 'white',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  const searchFilterFunction = text => {
    if (text) {
      const newData = contacts.filter(function (item) {
        const itemData =
          item.familyName + item.givenName
            ? item.familyName.toUpperCase() + item.givenName.toUpperCase()
            : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      console.log('result', newData);

      setSearchData(text);
    } else {
      setFilteredDataSource(contacts);

      setSearchData(text);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#030721'}}>
        <View
          style={{
            height: show ? normalize(95) : normalize(60),

            justifyContent: 'space-between',

            paddingHorizontal: normalize(15),

            marginTop:
              Platform.OS == 'android' ? STATUSBAR_HEIGHT + 6 : normalize(8),
          }}>
          <View
            style={{
              width: '100%',
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
              }}>
              Contacts <Text style={{color: '#D73F9D'}}>List</Text>
            </Text>
            <TouchableOpacity
            style={{   marginTop: normalize(6),marginRight:normalize(2)}}
              onPress={() => {
                setShow(!show);
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
          {show && (
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  height: normalize(35),
                  width: '100%',
                  backgroundColor: '#0E1648',
                  marginVertical: normalize(10),
                  borderRadius: normalize(10),
                  alignSelf: 'center',
                  // justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: normalize(11),
                  paddingHorizontal: normalize(10),
                  flexDirection: 'row',
                }}>
                <Image
                  source={Icons.Search}
                  style={{
                    height: normalize(12),
                    width: normalize(12),
                    tintColor: '#fff',
                  }}
                />
                <TextInput
                  value={searchData}
                  onChangeText={val => searchFilterFunction(val)}
                  placeholder="Search Contact List"
                  placeholderTextColor={'#B4BDF1'}
                  style={{
                    height: normalize(34),
                    width: normalize(200),
                    paddingHorizontal: normalize(10),
                    color: '#fff',
                  }}
                />
              </View>
            </View>
          )}
        </View>
        <ScrollView>
          {/* <View
              style={{
                height: normalize(50),
                width: normalize(290),
                backgroundColor: '#0E1648',
                marginVertical: normalize(8),
                borderRadius: normalize(10),
                alignSelf: 'center',
  
                alignItems: 'center',
                fontSize: normalize(11),
                paddingHorizontal: normalize(15),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: normalize(14),
                  color: '#B9A4F4',
                  fontWeight: '500',
                  alignSelf: 'center',
                }}>
                Friend Requests
              </Text>
              <TouchableOpacity
                style={{
                  height: normalize(30),
                  width: normalize(30),
                  backgroundColor: '#D73F9D',
                  borderRadius: normalize(5),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={Icons.Arrow}
                  resizeMode={'contain'}
                  style={{
                    height: normalize(6),
                    width: normalize(8),
                    // transform: [{rotate: '90deg'}],
  
                    marginHorizontal: normalize(15),
                    tintColor: 'white',
                  }}
                />
              </TouchableOpacity>
            </View> */}
          {filtered?.length > 0 ? (
            <FlatList
              data={filtered}
              renderItem={renderdata3}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom:normalize(80)}}
              style={{
                width: '90%',
                alignSelf: 'center',
                
                borderRadius: normalize(10),
              }}
              // contentContainerStyle={{ paddingBottom: normalize(30) }}

              ListEmptyComponent={
                <View
                  style={{
                    width: '100%',
                    paddingVertical: normalize(13),
                    alignItems: 'center',
                    justifyContent: 'center',

                    borderRadius: normalize(8),
                  }}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(14),
                      fontFamily: Fonts.Poppins_Medium,
                    }}>
                    No Contacts Found
                  </Text>
                </View>
              }
            />
          ) : (
            <Text
              style={{
                alignSelf: 'center',
                color: 'white',
                fontSize: normalize(12),
                marginTop: normalize(16),
              }}>
              Invite Your Friends
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
