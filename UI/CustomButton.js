import * as React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

import {GlobalStyles} from '../constants/styles';

function CustomButton({children, onPress, mode, style}) {

  return (
    <View style={style}>
      <Pressable onPress={onPress} style={({pressed})=> pressed && styles.pressed}>
        <View style={[styles.button , mode === 'flat' && styles.flat]}>
          <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    backgroundColor: GlobalStyles.colors.primary5,
    padding: 8,
  },
  flat: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Roboto_Regular',
  },
  flatText: {
    color: GlobalStyles.colors.primary7,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary6,
    borderRadius:4
  }
  
});

export default CustomButton;
