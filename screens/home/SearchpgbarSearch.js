import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import Modal from 'react-native-modal';
import ButtonItems from '../../components/ButtonItems';
import {ScrollView} from 'react-native-gesture-handler';
import Tags from 'react-native-tags';
export default function SearchpgbarSearch(props) {
  const [press, setPress] = useState(-1);
  const [pressm, setPressm] = useState(-1);
  const [pressm1, setPressm1] = useState(-1);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);

  // const [DATA, setData] = useState([
  //   {
  //     id: 0,
  //     imagePro: Icons.barsimg,
  //     text: 'Jameson’s Bar',
  //     sub: 'Line',
  //     // imageArrow: Icons.Arrow,
  //     man1: Icons.humanIcon,
  //     man2: Icons.shicon,
  //     time: '16-45min',
  //     friends: '12',
  //     Location: Icons.Location,
  //     ltext: '3.2 mi',
  //     ftext: 'Friends',
  //   },
  //   {
  //     id: 1,
  //     imagePro: Icons.barsimg,
  //     text: 'Jameson’s Bar',
  //     sub: 'Line',
  //     // imageArrow: Icons.Arrow,
  //     man1: Icons.humanIcon,
  //     man2: Icons.shicon,
  //     time: '1h 15min+',
  //     friends: '6',
  //     Location: Icons.Location,
  //     ltext: '3.2 mi',
  //     ftext: 'Friends',
  //   },
  //   {
  //     id: 2,
  //     imagePro: Icons.barsimg,
  //     text: 'Jameson’s Bar',
  //     sub: 'Line',
  //     // imageArrow: Icons.Arrow,
  //     man1: Icons.humanIcon,
  //     man2: Icons.shicon,
  //     time: '16-45min',
  //     friends: ' 21',
  //     Location: Icons.Location,
  //     ltext: '3.2 mi',
  //     ftext: 'Friends',
  //   },
  //   {
  //     id: 3,
  //     imagePro: Icons.barsimg,
  //     text: 'Jameson’s Bar',
  //     sub: 'Line',
  //     // imageArrow: Icons.Arrow,
  //     man1: Icons.humanIcon,
  //     man2: Icons.shicon,
  //     time: '1h 15min+',
  //     friends: '6',
  //     Location: Icons.Location,
  //     ltext: '3.2 mi',
  //     ftext: 'Friends',
  //   },
  // ]);
  // const [Mdata, setMdata] = useState([
  //   {
  //     id: 0,
  //     mtext: 'Friends',
  //   },
  //   {
  //     id: 1,
  //     mtext: 'Distance',
  //   },
  //   {
  //     id: 2,
  //     mtext: 'Trending',
  //   },
  //   {
  //     id: 3,
  //     mtext: 'Line Wait',
  //   },
  // ]);
  // const [Mdata1, setMdata1] = useState([
  //   {
  //     id: 0,
  //     mtext: 'Live Music',
  //   },
  //   {
  //     id: 1,
  //     mtext: 'Sports Bar',
  //   },
  //   {
  //     id: 2,
  //     mtext: 'Club',
  //   },
  //   {
  //     id: 2,
  //     mtext: 'Darts/Pool',
  //   },
  //   {
  //     id: 3,
  //     mtext: 'Collage Bar',
  //   },
  // ]);

  // const renderItem = ({item, index}) => {
  //   return (
  //     <>
  //       <View
  //         style={{
  //           height: normalize(64),
  //           width: normalize(290),
  //           backgroundColor: '#0E1648',
  //           borderRadius: normalize(12),
  //           marginTop: normalize(8),
  //           alignSelf: 'center',
  //           // alignItems: 'center',
  //         }}>
  //         <View
  //           style={{
  //             flexDirection: 'row',
  //             marginTop: normalize(6),
  //             justifyContent: 'space-between',
  //             marginHorizontal: normalize(10),
  //           }}>
  //           <View>
  //             <Image
  //               source={item.imagePro}
  //               style={{height: normalize(50), width: normalize(50)}}
  //             />
  //           </View>
  //           <View
  //             style={{marginRight: normalize(12), justifyContent: 'center'}}>
  //             <Text
  //               style={{
  //                 marginTop: normalize(3),
  //                 color: '#B9A4F4',
  //                 fontSize: normalize(14),
  //               }}>
  //               {item.text}
  //             </Text>
  //             <View style={{flexDirection: 'row', marginTop: normalize(3)}}>
  //               <Text
  //                 style={{
  //                   color: '#fff',
  //                   fontSize: normalize(9),
  //                   marginRight: normalize(2),
  //                 }}>
  //                 {item.sub}
  //               </Text>
  //               {index == 0 && (
  //                 <View style={{flexDirection: 'row'}}>
  //                   <Image
  //                     source={item.man2}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man2}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man2}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),

  //                       tintColor: '#DCE024',
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man2}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),

  //                       tintColor: '#DCE024',
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     resizeMode="contain"
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                       tintColor: '#4F5896',
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     resizeMode="contain"
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                       tintColor: '#4F5896',
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     resizeMode="contain"
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                       tintColor: '#4F5896',
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     resizeMode="contain"
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(7),
  //                       marginLeft: normalize(3),
  //                       tintColor: '#4F5896',
  //                     }}
  //                   />
  //                 </View>
  //               )}
  //               {index == 1 && (
  //                 <View style={{flexDirection: 'row'}}>
  //                   <Image
  //                     source={item.man2}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man2}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man2}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),

  //                       tintColor: '#DCE024',
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man2}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),

  //                       tintColor: '#DCE024',
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man2}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),

  //                       tintColor: '#FF7A00',
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man2}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),

  //                       tintColor: '#FF7A00',
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man2}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),

  //                       tintColor: '#B4262C',
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man2}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),

  //                       tintColor: '#B4262C',
  //                     }}
  //                   />
  //                 </View>
  //               )}
  //               {index == 2 && (
  //                 <View style={{flexDirection: 'row'}}>
  //                   <Image
  //                     source={item.man2}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man2}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man2}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),

  //                       tintColor: '#DCE024',
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man2}
  //                     resizeMode="contain"
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),

  //                       tintColor: '#DCE024',
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     resizeMode="contain"
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                       tintColor: '#4F5896',
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     resizeMode="contain"
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                       tintColor: '#4F5896',
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     resizeMode="contain"
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                       tintColor: '#4F5896',
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     resizeMode="contain"
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                       tintColor: '#4F5896',
  //                     }}
  //                   />
  //                 </View>
  //               )}
  //               {index == 3 && (
  //                 <View style={{flexDirection: 'row'}}>
  //                   <Image
  //                     source={item.man2}
  //                     resizeMode="contain"
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(7),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man2}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man2}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),

  //                       tintColor: '#DCE024',
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man2}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),

  //                       tintColor: '#DCE024',
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man2}
  //                     resizeMode="contain"
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),

  //                       tintColor: '#FF7A00',
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man2}
  //                     resizeMode="contain"
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),

  //                       tintColor: '#FF7A00',
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man2}
  //                     resizeMode="contain"
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),

  //                       tintColor: '#B4262C',
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man2}
  //                     resizeMode="contain"
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),

  //                       tintColor: '#B4262C',
  //                     }}
  //                   />
  //                 </View>
  //               )}
  //               {index == 0 && (
  //                 <Text
  //                   style={{
  //                     color: '#DCE024',
  //                     marginLeft: normalize(5),
  //                     fontSize: normalize(9),
  //                   }}>
  //                   {item.time}
  //                 </Text>
  //               )}
  //               {index == 1 && (
  //                 <Text
  //                   style={{
  //                     color: '#B4262C',
  //                     marginLeft: normalize(5),
  //                     fontSize: normalize(9),
  //                   }}>
  //                   {item.time}
  //                 </Text>
  //               )}
  //               {index == 2 && (
  //                 <Text
  //                   style={{
  //                     color: '#DCE024',
  //                     marginLeft: normalize(5),
  //                     fontSize: normalize(9),
  //                   }}>
  //                   {item.time}
  //                 </Text>
  //               )}
  //               {index == 3 && (
  //                 <Text
  //                   style={{
  //                     color: '#B4262C',
  //                     marginLeft: normalize(5),
  //                     fontSize: normalize(9),
  //                   }}>
  //                   {item.time}
  //                 </Text>
  //               )}
  //             </View>
  //             <View style={{flexDirection: 'row', marginTop: normalize(3)}}>
  //               <Text
  //                 style={{
  //                   color: '#fff',
  //                   fontSize: normalize(9),

  //                   marginRight: normalize(2),
  //                 }}>
  //                 {item.ftext}
  //               </Text>
  //               {index == 0 && (
  //                 <Text
  //                   style={{
  //                     color: '#B9A4F4',
  //                     fontSize: normalize(9),
  //                   }}>
  //                   {item.friends}
  //                 </Text>
  //               )}
  //               {index == 1 && (
  //                 <Text
  //                   style={{
  //                     color: '#B9A4F4',
  //                     fontSize: normalize(9),
  //                   }}>
  //                   {item.friends}
  //                 </Text>
  //               )}
  //               {index == 2 && (
  //                 <Text
  //                   style={{
  //                     color: '#B9A4F4',
  //                     fontSize: normalize(9),
  //                   }}>
  //                   {item.friends}
  //                 </Text>
  //               )}
  //               {index == 3 && (
  //                 <Text
  //                   style={{
  //                     color: '#B9A4F4',
  //                     fontSize: normalize(9),
  //                   }}>
  //                   {item.friends}
  //                 </Text>
  //               )}
  //             </View>
  //           </View>
  //           <View style={{alignItems: 'center'}}>
  //             <TouchableOpacity
  //               onPress={() =>
  //                 index == press ? setPress(-1) : setPress(index)
  //               }>
  //               <Image
  //                 source={index == press ? Icons.pLove : Icons.outlinelove}
  //                 style={{
  //                   height: normalize(20),
  //                   width: normalize(23),
  //                   tintColor: index == press ? '#D73F9D' : '#3e456d',
  //                 }}
  //               />
  //             </TouchableOpacity>
  //             <View
  //               style={{
  //                 flexDirection: 'row',
  //                 justifyContent: 'center',
  //                 alignItems: 'center',
  //                 marginTop: normalize(18),
  //               }}>
  //               <Image
  //                 source={Icons.Location}
  //                 style={{height: normalize(8), width: normalize(6)}}
  //               />
  //               <Text
  //                 style={{
  //                   fontSize: normalize(8),
  //                   color: '#FFFFFF',
  //                   paddingHorizontal: normalize(3),
  //                 }}>
  //                 {item.ltext}
  //               </Text>
  //             </View>
  //           </View>
  //         </View>
  //       </View>
  //     </>
  //   );
  // };
  // const mrenderItem = ({item, index}) => {
  //   return (
  //     <>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           marginTop: normalize(18),
  //           justifyContent: 'space-between',
  //           marginHorizontal: normalize(15),
  //         }}>
  //         <View style={{}}>
  //           <Text
  //             style={{
  //               color: '#fff',
  //               fontSize: normalize(15),
  //               fontWeight: '700',
  //             }}>
  //             {item.mtext}
  //           </Text>
  //         </View>
  //         <TouchableOpacity
  //           onPress={() => (index == pressm ? setPressm(-1) : setPressm(index))}
  //           style={{
  //             height: normalize(16),
  //             width: normalize(16),
  //             borderRadius: normalize(8),
  //             borderWidth: normalize(1),
  //             borderColor: index == pressm ? '#D73F9D' : '#3E456D',
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //           }}>
  //           {index == pressm && (
  //             <View
  //               style={{
  //                 alignSelf: 'center',
  //                 // marginTop:
  //                 //   Platform.OS == 'ios' ? normalize(2.75) : normalize(3),
  //               }}>
  //               <View
  //                 style={{
  //                   height: normalize(8),
  //                   width: normalize(8),
  //                   borderRadius: normalize(4),
  //                   backgroundColor: '#D73F9D',
  //                 }}
  //               />
  //             </View>
  //           )}
  //         </TouchableOpacity>
  //       </View>
  //     </>
  //   );
  // };
  // const m1renderItem = ({item, index}) => {
  //   return (
  //     <>
  //       <TouchableOpacity
  //         onPress={() =>
  //           index == pressm1 ? setPressm1(-1) : setPressm1(index)
  //         }
  //         style={{
  //           height: normalize(29),
  //           width: normalize(85),
  //           backgroundColor: index == pressm1 ? '#fff' : '#36407D',
  //           borderRadius: normalize(7),
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //           marginLeft: normalize(8),
  //           marginTop: normalize(10),
  //         }}>
  //         <Text
  //           style={{
  //             color: index == pressm1 ? '#161F5C' : '#2AE8AB',
  //             fontWeight: '700',
  //           }}>
  //           {item.mtext}
  //         </Text>
  //       </TouchableOpacity>
  //     </>
  //   );
  // };
  return (
    <>
      <MyStatusBar backgroundColor={'#030721'} barStyle={'light-content'} />
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#030721', height: '100%'}}>
        {/* <TouchableOpacity
          onPress={() => props.navigation.goBack('')}
          style={{
            height: normalize(30),
            width: normalize(30),
            borderRadius: normalize(5),
            backgroundColor: '#D73F9D',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: normalize(40),
            marginLeft: normalize(15),
          }}>
          <Image
            resizeMode={'contain'}
            source={Icons.Arrow}
            style={{
              height: normalize(8),
              width: normalize(8),
              transform: [{rotate: '90deg'}],
              tintColor: '#fff',
            }}
          />
        </TouchableOpacity> */}
        {/* <View
          style={{
            height: normalize(35),
            width: normalize(290),
            backgroundColor: '#141E57',
            marginVertical: normalize(15),
            borderRadius: normalize(10),
            alignSelf: 'center',
            // justifyContent: 'center',
            alignItems: 'center',
            fontSize: normalize(11),
            paddingHorizontal: normalize(10),
            flexDirection: 'row',
            marginTop: normalize(10),
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
            placeholder="Search"
            placeholderTextColor={'#B4BDF1'}
            style={{
              height: normalize(34),
              width: normalize(200),
              paddingHorizontal: normalize(10),
              color: '#fff',
            }}
          />
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: normalize(16),
          }}>
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
          <TouchableOpacity
            onPress={() => setModalVisible1(!isModalVisible1)}
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

                color: '#fff',
                marginTop: normalize(16),
              }}>
              Filter
            </Text>
          </TouchableOpacity>
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
                marginTop: normalize(300),
                borderTopRightRadius: normalize(15),
                borderTopLeftRadius: normalize(15),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: normalize(20),
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
                    marginLeft: normalize(15),
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
                <Text
                  style={{
                    fontSize: normalize(14),
                    color: '#B9A4F4',
                    marginLeft: normalize(8),
                  }}>
                  Sort By
                </Text>
                <TouchableOpacity
                  style={{
                    height: normalize(29),
                    width: normalize(85),
                    backgroundColor: '#fff',
                    borderRadius: normalize(7),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: normalize(8),
                  }}>
                  <Text
                    style={{
                      fontSize: normalize(14),
                      color: '#161F5C',
                      fontWeight: '700',
                    }}>
                    Most
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: normalize(29),
                    width: normalize(85),
                    backgroundColor: '#36407D',
                    borderRadius: normalize(7),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: normalize(8),
                  }}>
                  <Text
                    style={{
                      fontSize: normalize(14),
                      color: '#2AE8AB',
                      fontWeight: '700',
                    }}>
                    Least
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <FlatList
                data={Mdata}
                renderItem={mrenderItem}
                keyExtractor={(item, index) => index.toString()}
                // contentContainerStyle={{paddingBottom: normalize(60)}}
              /> */}
              <ButtonItems
                width={normalize(270)}
                marginBottom={normalize(30)}
                height={normalize(45)}
                marginTop={normalize(5)}
                textbutton={'View Result'}
                onPress={() => setModalVisible(!isModalVisible)}
              />
            </View>
          </Modal>
          <Modal
            isVisible={isModalVisible1}
            onBackdropPress={() => setModalVisible1(false)}>
            <View
              style={{
                height: normalize(250),

                alignSelf: 'center',

                // alignItems: 'center',
                backgroundColor: '#161F5C',
                width: normalize(318),
                bottom: normalize(0),
                marginTop: normalize(330),
                borderTopRightRadius: normalize(15),
                borderTopLeftRadius: normalize(15),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: normalize(20),
                  justifyContent: 'space-between',
                  marginHorizontal: normalize(15),
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
                  style={{
                    height: normalize(29),
                    width: normalize(85),
                    backgroundColor: '#D73F9D',
                    borderRadius: normalize(7),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: normalize(8),
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
              {/* <FlatList
                data={Mdata1}
                renderItem={m1renderItem}
                // horizontal={true}
                numColumns={3}
                // showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{
                  paddingTop: normalize(15),
                  paddingLeft: normalize(5),
                }}
              /> */}
              <ButtonItems
                width={normalize(270)}
                marginBottom={normalize(30)}
                height={normalize(45)}
                marginTop={normalize(5)}
                textbutton={'View Result'}
                onPress={() => setModalVisible1(!isModalVisible1)}
              />
            </View>
          </Modal>
        </View>
        {/* <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          //   contentContainerStyle={{paddingBottom: normalize(60)}}
          ListFooterComponent={
            <ButtonItems
              //   iconShow={true}
              textbutton={'Add A Bar'}
              marginTop={normalize(8)}
              width={normalize(285)}
              // marginTop={normalize(75)}
              onPress={() => setModalVisible2(!isModalVisible2)}
            />
          }
        /> */}

        {/* <ButtonItems
          //   marginTop={normalize(5)}
          //   marginBottom={normalize(90)}
          width={normalize(285)}
          textbutton={'Add A Bar'}
          height={normalize(50)}
          onPress={() => setModalVisible2(!isModalVisible2)}
        /> */}
        {/* <Modal
          isVisible={isModalVisible2}
          onBackdropPress={() => setModalVisible2(false)}>
          <ScrollView style={{marginTop: normalize(120)}}>
            <View
              style={{
                height: normalize(355),
                width: normalize(280),
                backgroundColor: '#08103A',
                alignSelf: 'center',
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
              <TextInput
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
              />
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
                  height: normalize(45),
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
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginTop: normalize(10),
                    justifyContent: 'center',
                  }}>
                  <Tags
                    initialText="Rock Music"
                    deleteTagOnPress={false}
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
                    inputStyle={{backgroundColor: 'white'}}
                    renderTag={({
                      tag,
                      index,
                      onPress,
                      deleteTagOnPress,
                      readonly,
                    }) => (
                      <TouchableOpacity
                        key={`${tag}-${index}`}
                        onPress={onPress}>
                        <TouchableOpacity
                          style={{
                            height: normalize(25),
                            width: normalize(70),
                            backgroundColor: '#08103A',
                            borderRadius: normalize(5),
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: normalize(5),
                            marginTop: normalize(5),
                          }}>
                          <View>
                            <Text
                              style={{
                                fontSize: normalize(11),
                                color: '#2AE8AB',
                                fontWeight: '700',
                              }}>
                              {tag} <Text style={{color: '#D73F9D'}}>×</Text>
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </TouchableOpacity>
                    )}
                  />
                </View>

                <ButtonItems
                  width={normalize(250)}
                  textbutton={'Submit'}
                  onPress={() => setModalVisible2(!isModalVisible2)}
                />
              </View>
            </View>
          </ScrollView>
        </Modal> */}
      </SafeAreaView>
    </>
  );
}
