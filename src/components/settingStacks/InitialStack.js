import {View, Switch, Text, StyleSheet, Pressable} from 'react-native';
import React, { useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingItem from '../SettingItem';
import { MainContext } from '../../store/context-store';

const InitialStack = ({navigation}) => {
  const {person, createTables, getInputs, isEdit} = useContext(MainContext)
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  useEffect(() => {
    createTables();
    getInputs();
    isEdit();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          paddingHorizontal: 55,
          paddingVertical: 30
        }}>
        <Text style={[styles.textHead]}>Setting</Text>
        <Text style={[styles.text, {marginTop: '22%', marginBottom: '14%'}]}>
          Account
        </Text>

        <Pressable
          style={({pressed})=> [
            {
              opacity: pressed ? 0.50: 1
            },
            styles.topButton
          ]}
          onPress={()=> {
            navigation.navigate('person')
          }}
          >
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#ddd',
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="person-sharp" color={'#33333361'} size={18} />
          </View>

          <View>
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 17,
                color: '#000',
                letterSpacing: 3,
              }}>
              {person.name}
            </Text>
            <Text>Personal Info</Text>
          </View>

          <View
            style={{
              width: 45,
              height: 45,
              backgroundColor: '#ddd',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name="chevron-forward-outline"
              color={'#333333e4'}
              size={20}
            />
          </View>
        </Pressable>

        <Text style={[styles.text, {marginTop: '18%', marginBottom: '10%'}]}>
          Setting
        </Text>

        <SettingItem
          mainColor={'#f59e0b'}
          bgColorr={'#fce4c6'}
          iconName="earth"
          mainText={'Language'}
          subText={'English'}>
          <View
            style={{
              width: 45,
              height: 45,
              backgroundColor: '#ddd',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name="chevron-forward-outline"
              color={'#333333e4'}
              size={20}
            />
          </View>
        </SettingItem>

        <SettingItem
          mainColor={'#39abdb'}
          bgColorr={'#cbe5f0'}
          iconName="notifications"
          mainText={'Notifications'}>
          <View
            style={{
              width: 45,
              height: 45,
              backgroundColor: '#ddd',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name="chevron-forward-outline"
              color={'#333333e4'}
              size={20}
            />
          </View>
        </SettingItem>

        <SettingItem
          mainColor={'#3e51c2'}
          bgColorr={'#bfc7f1'}
          iconName="moon"
          mainText={'DarkMode'}
          subText={'off'}>
          <View
            style={{
              transform: [{translateX: 26}, {scale: 1.4}],
            }}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              value={isEnabled}
              onValueChange={toggleSwitch}
            />
          </View>
        </SettingItem>

        <SettingItem
          mainColor={'#dc2626'}
          bgColorr={'#fecaca'}
          iconName="help-buoy"
          mainText={'Help'}>
          <View
            style={{
              width: 45,
              height: 45,
              backgroundColor: '#ddd',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{translateX: 68}],
            }}>
            <Icon
              name="chevron-forward-outline"
              color={'#333333e4'}
              size={20}
            />
          </View>
        </SettingItem>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textHead: {
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    color: '#000',
    marginTop: '30%',
  },
  text: {
    fontFamily: 'EduQLDBeginner-SemiBold',
    color: '#000',
    fontSize: 25,
  },
  topButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default InitialStack;
