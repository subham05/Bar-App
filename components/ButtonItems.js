import React, {useState} from 'react';
import PropTypes from 'prop-types';
import normalize from '../utils/helpers/dimen';
// import {Fonts} from '../themes/fonts';
// import {Colors} from '../themes/Path';
import {TouchableOpacity, Text} from 'react-native';
// import {Fonts} from '../themes/Fonts';
import {Fonts} from '../themes/ImagePath';

export default function ButtonItems(props) {
  const [blureffect, setBlureffect] = useState(false);
  function onPress() {
    if (props.onPress) {
      props.onPress();
    }
  }
  return (
    <TouchableOpacity
      style={{
        width: props.width,
        height: props.height,
        backgroundColor: props.backgroundColor,
        borderRadius: props.borderRadius,
        alignSelf: 'center',
        marginTop: props.marginTop,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: props.marginLeft,
        marginBottom: props.marginBottom,
      }}
      onPress={() => {
        onPress();
      }}>
      <Text
        style={{
          color: props.textColors,
          textAlign: props.textAlign,
          paddingTop: props.paddingTop,
          fontSize: props.fontSize,
          fontFamily:Fonts.Poppins_Medium
        }}>
        {props.textbutton}
      </Text>
      {/* <Text>{props.textbutton}</Text> */}
    </TouchableOpacity>
  );
}
ButtonItems.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.number,
  alignSelf: PropTypes.string,
  marginTop: PropTypes.number,
  color: PropTypes.string,
  textAlign: PropTypes.string,
  paddingTop: PropTypes.number,
  fontSize: PropTypes.number,
  textbutton: PropTypes.string,
  marginLeft: PropTypes.number,
  onPress: PropTypes.func,
  marginBottom: PropTypes.number,
};
ButtonItems.defaultProps = {
  width: normalize(300),
  height: normalize(40),
  backgroundColor: '#D73F9D',
  borderRadius: normalize(8),
  marginTop: normalize(24),
  color: 'white',
  alinText: 'center',
  fontSize: normalize(15),
  textColors: 'white',
  fontFamily: Fonts.Poppins_Regular,
};
