import React from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';
import normalize from '../utils/helpers/dimen';

 function Button(props) {
  function onPress() {
    if (props.onPress) {
      props.onPress();
    }
  }

  return (
    <TouchableOpacity
      style={{
        height: props.height,
        width: props.width ? props.width : '100%',
        borderRadius: props.borderRadius,
        backgroundColor: props.backgroundColor,
        borderColor: props.borderColor,
        borderWidth: props.borderWidth,
        justifyContent: props.justifyContent,
        alignItems: props.alignItems,
        alignSelf: props.alignSelf,
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
        marginHorizontal: props.marginHorizontal,
        marginVertical: props.marginVertical,
        padding: normalize(5),
        flexDirection: 'row',
        marginRight:props.marginRight
    
        // position: 'absolute',
        // bottom: props.bottom,
        // top: props.top,
        // zIndex: 50,
      }}
      onPress={() => {
        onPress();
      }}>
      {props.image ? (
        <Image
          source={props.image}
          style={{
            width: props.imgwidth,
            height: props.imgheight,
            tintColor: props.tintColor,
           // marginLeft: normalize(15),
           marginLeft:props.marginLeft
          }}
          resizeMode="contain"
        />
      ) : null}


      <Text
        style={{
          color: props.textColor,
          fontSize: props.fontSize,
          fontFamily:props.fontFamily,
          marginTop: props.textMarginTop,
          fontWeight: props.fontWeight,
          textAlign: 'center',
          textTransform: props.textTransform,
          marginLeft:props.textmarginLeft
          // letterSpacing: 2,
        }}
        numberOfLines={2}>
        {props.title}
      </Text>
      {props.rightimage ? (
        
        <Image
          source={props.rightimage}
          style={{
            width: props.rightimgwidth,
            height: props.rightimgheight,
            tintColor: props.rightTintColor,
            marginRight:normalize(15)
          }}
          resizeMode="contain"
        />
     
    ) : null}
    </TouchableOpacity>
  );
}

Button.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.number,
  borderRadius: PropTypes.number,
  textColor: PropTypes.string,
  fontSize: PropTypes.number,
  title: PropTypes.string,
  onPress: PropTypes.func,
  alignSelf: PropTypes.string,
  // alignItems: PropTypes.alignItems,
  // justifyContent: PropTypes.justifyContent,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginHorizontal: PropTypes.number,
  marginVertical: PropTypes.number,
  textTransform: PropTypes.string,
  fontWeight: PropTypes.string,
  tintColor: PropTypes.string,
};

Button.defaultProps = {
  height: normalize(45),
  // backgroundColor: Color.blue,
  borderRadius: normalize(20),
  //textColor: Color.white,
  fontSize: normalize(14),
  // borderColor: Color.blue,
  borderWidth: 0,
  title: '',
  onPress: null,
  alignSelf: null,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 0,
  marginBottom: 0,
  marginHorizontal: 0,
  marginVertical: 0,
 // textTransform: 'uppercase',
  //fontWeight: 'bold',
 //tintColor: Color.white,
  // top: 0,
 
};
export default React.memo(Button)