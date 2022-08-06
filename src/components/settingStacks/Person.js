import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import SQLite from 'react-native-sqlite-storage';


import {MainContext} from '../../store/context-store';

function openDatabases() {
  if (Platform.OS === 'web') {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase(
    {
      name: 'rn_sqlite',
      location: 'default',
    },
    () => {},
    error => {
      console.log(error);
    },
  );
  return db;
}

const db = openDatabases();

const Person = ({navigation}) => {
  const [textInput, setTextInput] = useState({
    name: '',
    age: '',
    email: '',
  });

  const {
    isEditing,
    pic,
    setPic,
    createTables,
    person,
    setPerson,
    isEdit,
    getInputs,
    setIsEditing,
  } = useContext(MainContext);

  const toggleGender = gender => {
    setPerson(cur => {
      return {
        ...cur,
        gender: gender,
      };
    });
  };

  const gotInputs = () => {
    if (isEditing == 'false') {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO val (name, age, email, gender) VALUES (?,?,?,?)`,
          [person.name, person.age, person.email, person.gender],
          (sqlTxn, res) => {
            console.log('inserted');
            getInputs();
            setIsEditing('true');
          },
          error => {
            console.log('error on creating table ' + error.message);
          },
        );
      });
    } else {
      console.log('yay');
      db.transaction(tx => {
        tx.executeSql(
          `UPDATE val SET name=? ,age=?, gender=?, email=? WHERE id = ?`,
          [person.name, person.age, person.gender, person.email, person.id],
          (sqlTxn, res) => {
            getInputs();
            Mains.setResult(cur => ({
              ...cur,
              name: person.name,
            }));
          },
          error => {
            console.log('error on Updating table ' + error.message);
          },
        );
      });
    }
    navigation.navigate('initial')

  };

  const uploadImage = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };

    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('did Cancel');
      } else if (res.errorCode == 'permission') {
        console.log('permission');
      } else if (res.errorCode == 'others') {
        console.log('other error');
      } else if (res.assets[0].fileSize > 2097152) {
        console.log('more size requered');
      } else {
        setPic(res.assets[0], base64);
      }
    });
  };

  useEffect(() => {
    createTables();
    getInputs();
    isEdit();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 50,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          flex: 1,
          // backgroundColor: '#ddd',
        }}>
        <Text style={styles.title}>Account</Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 60,
            marginBottom: 35,
          }}>
          <Text style={{marginRight: '26%', fontSize: 14}}>photo</Text>
          <View>
            <Avatar.Image
              size={74}
              source={{uri: 'data:image/png;base64,' + pic}}
              style={{marginBottom: 12, marginTop: 12, marginLeft: 20}}
            />
            <Pressable
              style={({pressed}) => [{opacity: pressed ? 0.6 : 1}]}
              onPress={uploadImage}>
              <Text style={{color: '#33dd', marginLeft: 12, fontSize: 14}}>
                Upload Image
              </Text>
            </Pressable>
          </View>
        </View>

        {/* INPUTS */}

        <View style={styles.item}>
          <Text style={styles.text}>Name</Text>
          <TextInput
            onChangeText={value => {
              setPerson(cur => ({
                ...cur,
                name: value,
              }));
            }}
            value={person.name}
            style={styles.itemPerson}
            placeholder="David Guetta"
          />
        </View>

        <View style={styles.item}>
          <Text style={styles.text}>Gender</Text>
          <View style={{flexDirection: 'row', width: 210, marginTop: 8}}>
            <Pressable
              onPress={() => toggleGender('male')}
              style={({pressed}) => [
                {
                  backgroundColor: person.gender === 'male' ? '#33d' : '#ddd',
                  width: 45,
                  height: 45,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 30,
                },
              ]}>
              <Icon
                name="male-outline"
                size={21}
                color={person.gender === 'male' ? '#fff' : '#868383'}
              />
            </Pressable>
            <Pressable
              onPress={() => toggleGender('female')}
              style={({pressed}) => [
                {
                  backgroundColor: person.gender === 'female' ? '#33d' : '#ddd',
                  width: 45,
                  height: 45,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <Icon
                name="female-outline"
                size={20}
                color={person.gender === 'female' ? '#fff' : '#868383'}
              />
            </Pressable>
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.item}>
              <Text style={styles.text}>Age</Text>
              <TextInput
                keyboardType="number-pad"
                onChangeText={value => {
                  setPerson(cur => ({
                    ...cur,
                    age: value,
                  }));
                }}
                value={`${person.age || ''}`}
                style={styles.itemPerson}
                placeholder="28"
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View style={styles.item}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            keyboardType="email-address"
            onChangeText={value => {
              setPerson(cur => ({
                ...cur,
                email: value,
              }));
            }}
            value={person.email}
            style={styles.itemPerson}
            placeholder="Mamal_231@yahoo.com"
          />
        </View>

        <Button title="submit" onPress={gotInputs} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 30,
    color: '#000',
    marginTop: 25,
  },
  text: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    marginTop: 19,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 29,
  },
  itemPerson: {
    width: 217,
    borderBottomWidth: 1,
    borderBottomEndRadius: 20,
    color: '#000',
    paddingBottom: 8,
  },
  container: {
    flex: 1,
  },
});

export default Person;
