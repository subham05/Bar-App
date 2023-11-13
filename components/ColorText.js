import React from 'react';
import {Text} from 'react-native';

function ColorText({colorCode, name, size}) {
  return (
    <Text
      style={{
        color: colorCode,
        marginLeft: normalize(5),
        fontSize: size? size : normalize(9),
      }}>
      {name}
    </Text>
  );
}
export default React.memo(ColorText);
