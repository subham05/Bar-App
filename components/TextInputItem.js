import React, {useState} from 'react';
import {View, TextInput, Text, Image, TouchableOpacity} from 'react-native';
import normalize from '../utils/helpers/dimen';
import PropTypes from 'prop-types';
import {Colors, Fonts, Icons} from '../themes/ImagePath';

export default function TextInputItem(props) {
  const [eyeVisible, setEyeVisible] = useState(true);
  const [blurview, setblurview] = useState(false);
  function onChangeText(text) {
    if (props.onChangeText) {
      props.onChangeText(text);
    }
  }

  //onrightimpress
  function onrightimpress() {
    if (props.onrightimpress) {
      props.onrightimpress();
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        width: props.width,
        alignItems: 'center',
        height: props.height,
        borderWidth: props.borderWidth,
        borderColor: blurview ? Colors.pink : Colors.placeholder, //props.viewbordercolor?props.viewbordercolor: '#C1C1C1',
        borderRadius: props.borderRadius,
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
        backgroundColor: props.backgroundColor,
        paddingLeft: normalize(15),
        alignSelf: 'center',
      }}>
      {/* {props.isleftIconVisible && (
        <Image
          resizeMode="contain"
          source={props.leftIcon}
          style={{width: normalize(15), height: normalize(15)}}
        />
      )} */}

      <TextInput
        style={[
          {
            flex: 1,
            paddingLeft: props.textInputLeft,
            textAlign: props.textAlign,
            letterSpacing: props.letterSpacing,
            color: props.textColor,
            fontFamily: props.fontFamily,
            fontSize: props.fontSize,
            paddingRight: normalize(0),
            shadowColor: props.shadowColor,
            shadowOffset: props.shadowOffset,
            shadowOpacity: props.shadowOpacity,
            shadowRadius: props.shadowRadius,
            elevation: props.elevation,
            // alignSelf: 'center',
            // alignItems: 'center',
            // textTransform:props.textTransform
            // fontWeight:props.fontWeight,
          },
        ]}
        maxLength={props.maxLength}
        secureTextEntry={eyeVisible ? props.isSecure : !props.isSecure}
        multiline={props.multiline}
        autoCapitalize={props.autoCapitalize}
        placeholder={props.placeholder}
        editable={props.editable}
        spellCheck={false}
        placeholderTextColor={props.placeholderTextColor}
        keyboardType={props.keyboardType}
        value={props.value}
        fontWeight={props.fontWeight}
        onChangeText={text => {
          onChangeText(text);
        }}
        onBlur={() => {
          setblurview(false), console.log('hi');
        }}
        onFocus={() => setblurview(true)}
      />
      {props.isRightIconVisible && (
        <TouchableOpacity
          style={{
            width: normalize(30),
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: normalize(10),
          }}
          // style={{backgroundColor:'red'}}
          onPress={() => onrightimpress()}>
          <Image
            source={props.rightimage}
            resizeMode="contain"
            style={{
              width: props.rightimageheight,
              height: props.rightimagewidth,

              tintColor: '#9FA5C0',
              marginLeft: normalize(10),
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

TextInputItem.propTypes = {
  marginLeft: PropTypes.number,
  marginTop: PropTypes.number,
  maxLength: PropTypes.number,
  isSecure: PropTypes.bool,
  multiline: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  keyboardType: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  color: PropTypes.string,
  letterSpacing: PropTypes.number,
  fontSize: PropTypes.number,
  editable: PropTypes.bool,
  borderColor: PropTypes.string,
  fontWeight: PropTypes.any,
  textAlign: PropTypes.string,
  onPress: PropTypes.func,
  search: PropTypes.bool,
  borderRadius: PropTypes.any,
  borderRadiusLeftRadius: PropTypes.any,
  borderBottomRadiusRightRadius: PropTypes.any,
  icon: PropTypes.any,
  iconleft: PropTypes.any,
  iconright: PropTypes.any,
  fontFamily: PropTypes.any,
  backgroundColor: PropTypes.any,
  width: PropTypes.any,
  height: PropTypes.any,
  marginBottom: PropTypes.number,
  borderWidth: PropTypes.number,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  isleftIconVisible: PropTypes.bool,
  isRightIconVisible: PropTypes.bool,
  textInputLeft: PropTypes.number,
  textColor: PropTypes.string,
  doller: PropTypes.bool,
  elevation: PropTypes.number,
  shadowRadius: PropTypes.number,
  shadowOpacity: PropTypes.number,
  shadowOffset: PropTypes.object,
  shadowColor: PropTypes.string,
  viewbordercolor: PropTypes.string,
  rightimage: PropTypes.string,
  rightimageheight: PropTypes.number,
  rightimagewidth: PropTypes.number,
  onrightimpress: PropTypes.func,
  textTransform: PropTypes.string,
};

TextInputItem.defaultProps = {
  shadowColor: '',
  shadowOffset: null,
  shadowRadius: 0,
  shadowOpacity: 0,
  elevation: 0,
  marginTop: 0,
  maxLength: 100,
  isSecure: false,
  multiline: false,
  autoCapitalize: 'none',
  placeholder: '',
  placeholderTextColor: '#8E6BF2',
  keyboardType: 'default',
  value: '',
  onChangeText: null,
  color: Colors.black,
  editable: true,
  borderColor: '#DDDDDD',
  onFocus: null,
  onBlur: null,
  letterSpacing: 0,
  fontSize: normalize(12),
  textAlign: 'left',
  caretHidden: false,
  borderRadius: normalize(5),
  icon: null,
  iconleft: null,
  fontFamily: Fonts.Poppins_Regular,
  fontWeight: '400',
  backgroundColor: '#4C24BE',
  search: false,
  width: '100%',
  height: normalize(42),
  borderRadiusRightRadius: normalize(10),
  borderBottomRadiusRightRadius: normalize(10),
  marginBottom: normalize(15),
  borderWidth: 0,
  leftIcon: '#9FA5C0',
  rightIcon: '#9FA5C0',
  isleftIconVisible: false,
  isRightIconVisible: false,
  textInputLeft: 0,
  textColor: Colors.black,
  doller: false,
  rightimage: Icons.Show,
  rightimageheight: normalize(20),
  rightimagewidth: normalize(20),
};
