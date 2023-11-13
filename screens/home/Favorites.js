import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Icons} from '../../themes/ImagePath';

import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';

export default function Favorites(props) {
  const STATUSBAR_HEIGHT = StatusBar.currentHeight;
  const [press, setPress] = useState(-1);
  const [press1, setPress1] = useState(-1);
  // const [DATA, setData] = useState([
  //   {
  //     id: 0,
  //     imagePro: Icons.barsimg,
  //     text: 'Jameson’s Bar',
  //     sub: 'Line',
  //     // imageArrow: Icons.Arrow,
  //     man1: Icons.humanIcon,
  //     man2: Icons.shicon,
  //     time: 'Medium',
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
  //     time: 'Very Long',
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
  //     time: 'Medium',
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
  //     time: 'Medium',
  //     friends: '6',
  //     Location: Icons.Location,
  //     ltext: '3.2 mi',
  //     ftext: 'Friends',
  //   },
  // ]);
  // const [DATA1, setData1] = useState([
  //   {
  //     id: 0,
  //     imagePro: Icons.barsimg,
  //     text: 'Jameson’s Bar',
  //     sub: 'Line',
  //     // imageArrow: Icons.Arrow,
  //     man1: Icons.humanIcon,
  //     man2: Icons.shicon,
  //     time: 'Medium',
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
  //     time: 'Medium',
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
  //     time: 'Medium',
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
  //     time: 'Medium',
  //     friends: '6',
  //     Location: Icons.Location,
  //     ltext: '3.2 mi',
  //     ftext: 'Friends',
  //   },
  // ]);

  // const renderItem = ({item, index}) => {
  //   return (
  //     <>
  //       <TouchableOpacity
  //         onPress={() => props.navigation.navigate('PassnotAvailable2')}
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
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
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
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),

  //                       tintColor: '#DCE024',
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                 </View>
  //               )}
  //               {index == 3 && (
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
  //                     color: '#DCE024',
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
  //       </TouchableOpacity>
  //     </>
  //   );
  // };
  // const renderItem1 = ({item, index}) => {
  //   return (
  //     <>
  //       <TouchableOpacity
  //         onPress={() => props.navigation.navigate('PassnotAvailable2')}
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
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
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
  //                     source={item.man1}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
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
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),

  //                       tintColor: '#DCE024',
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                 </View>
  //               )}
  //               {index == 3 && (
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
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
  //                     }}
  //                   />
  //                   <Image
  //                     source={item.man1}
  //                     style={{
  //                       height: normalize(13),
  //                       width: normalize(6),
  //                       marginLeft: normalize(3),
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
  //                     color: '#DCE024',
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
  //                     color: '#DCE024',
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
  //                 index == press1 ? setPress1(-1) : setPress1(index)
  //               }>
  //               <Image
  //                 source={index == press1 ? Icons.pLove : Icons.outlinelove}
  //                 style={{
  //                   height: normalize(20),
  //                   width: normalize(23),
  //                   tintColor: index == press1 ? '#D73F9D' : '#3e456d',
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
  //       </TouchableOpacity>
  //     </>
  //   );
  // };
  return (
    <>
      <MyStatusBar backgroundColor={'#060C30'} barStyle={'dark-content'} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#030721'}}>
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

              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack('')}
              style={{
                height: normalize(30),
                width: normalize(30),
                borderRadius: normalize(6),
                backgroundColor: '#D73F9D',
                // alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: normalize(15),
              }}>
              <Image
                source={Icons.Arrow}
                resizeMode="contain"
                style={{
                  height: normalize(15),
                  width: normalize(8),
                  transform: [{rotate: '90deg'}],
                  tintColor: '#fff',
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: '#fff',
                fontSize: normalize(22),
                fontWeight: '500',
                marginLeft: normalize(70),
              }}>
              Favorites
            </Text>
            <TouchableOpacity
            //   onPress={() => props.navigation.navigate('Settings')}
            >
              <Image
                source={Icons.Search}
                style={{
                  height: normalize(20),
                  width: normalize(20),
                  tintColor: '#fff',
                  marginLeft: normalize(70),
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          {/* <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              paddingTop: normalize(10),
              paddingBottom: normalize(15),
            }}
            // ListFooterComponent={

            // }
          /> */}
          <Text
            style={{
              color: '#fff',
              fontSize: normalize(22),
              fontWeight: '500',
              alignSelf: 'center',
              // paddingVertical: normalize(15),
            }}>
            Near By
          </Text>
          {/* <FlatList
            data={DATA1}
            renderItem={renderItem1}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              paddingBottom: normalize(80),
              paddingTop: normalize(10),
            }}
          /> */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
