import React from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

const IconButton = ({icon, size, color, onPress}) => {
  return (
    <Pressable onPress={onPress} style={({pressed})=> pressed && styles.pressed }>
      <View style={{borderRadius: 24, padding:6, margin: 8}}>
        <Icon name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75
  }
});

export default IconButton;