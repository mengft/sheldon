import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../Themes/Colors';

const HeaderLeft = ({ navigation, color, onPress, iconName = 'arrows', text, textStyle, iconStyle, }) => {
  let onPressFunc;
  if (onPress) {
    onPressFunc = () => onPress(navigation);
  } else {
    onPressFunc = () => navigation.goBack(null);
  }
  return (
    <TouchableOpacity onPress={onPressFunc} style={{ padding: 10, paddingRight: 20 }} >
      { text ? <Text style={[{ color: Colors.CB, fontSize: 15, marginRight: 5 }, textStyle]}>{text}</Text>
        : <Icon size={17} name={iconName} color={color || Colors.CB} style={[iconStyle]} /> }
    </TouchableOpacity>
  );
};

module.exports = HeaderLeft;
