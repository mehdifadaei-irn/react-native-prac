import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const SettingItem = ({
  iconName,
  mainText,
  subText,
  children,
  bgColorr,
  mainColor,
}) => {
  const {navigate} = useNavigation();

  return (
    <Pressable
      style={({pressed}) => [
        {
          opacity:
            pressed &&
            mainText.toLowerCase() !== 'notifications' &&
            mainText.toLowerCase() !== 'darkmode'
              ? 0.6
              : 1,
        },
        styles.container,
      ]}
      onPress={() => {
        // navigate('help')
        const name = mainText.toLowerCase();
        if (name === 'notifications' || name === 'darkmode') {
          return
        } else {
          navigate(`${name}`);
        }
      }}>
      <View
        style={{
          width: 45,
          height: 45,
          backgroundColor: `${bgColorr}`,
          borderRadius: 90,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: '8%',
        }}>
        <Icon name={iconName} color={mainColor} size={24} />
      </View>

      <Text
        style={{
          fontFamily: 'Roboto-Bold',
          color: '#000',
          letterSpacing: 1,
          fontSize: 15,
          marginRight: `${!subText ? '28%' : '22%'}`,
        }}>
        {mainText}
      </Text>

      <Text
        style={{
          fontFamily: 'Roboto-Regular',
          color: '#0000006f',
          fontSize: 13,
          transform: [{translateX: -15}],
        }}>
        {!subText ? '' : subText}
      </Text>

      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '5%',
  },
});

export default SettingItem;
