import {View, Text} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {MainContext} from '../../store/context-store';
import SQLite from 'react-native-sqlite-storage';



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

const Lang = ({navigation}) => {
  const mains = useContext(MainContext);

  const gotInputs = () => {
    if (mains.isEditing == 'false') {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO val (language) VALUES (?)`,
          [person.language],
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
          `UPDATE val SET language=? WHERE id = ?`,
          [mains.person.language, mains.person.id],
          (sqlTxn, res) => {
            getInputs();
            mains.setResult(cur => ({
              ...cur,
              language: mains.person.language,
            }));
          },
          error => {
            console.log('error on Updating table ' + error.message);
          },
        );
      });
    }
    navigation.navigate("initial")

  };

  useEffect(()=> {
    mains.getInputs();
    mains.isEdit();
  }, [])

  return (
    <View style={{padding: 30}}>
      <TextInput
        onChangeText={value => {
          mains.setPerson(cur => ({
            ...cur,
            language: value,
          }));
        }}
        placeholder="language"
        value={mains.person.language}
        label={'lang'}
      />
      <Button onPress={gotInputs} mode="contained">Submit</Button>
    </View>
  );
};

export default Lang;
