import {
  Platform,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {MainContext} from '../store/context-store';
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

const Home = ({navigation, route}) => {
  const Mains = useContext(MainContext);

  //  console.log(Mains.person);

  const remove = id => {
    db.transaction(txn => {
      txn.executeSql(`DELETE FROM val WHERE id=?`, [id], (_, res) => {
        console.log('Deleted');
        Mains.getInputs();
        Mains.setResult(cur => []);
        Mains.setPerson(cur => []);
        Mains.setIsEditing('false');
      });
    });
  };

  useEffect(()=> {
    Mains.getInputs();
    Mains.isEdit();
  }, [])

  return (
    <View style={styles.container1}>
      <View>
        <ScrollView>
          {Mains.result?.map((item, index) => (
            <Pressable
              key={item.id}
              style={({pressed}) => [
                {
                  opacity: pressed ? 0.5 : 1,
                },
                styles.home,
              ]}
              onPress={() => remove(item.id)}>
              <Text style={styles.text}>Name : {item.name} </Text>
              <Text style={styles.text}>Gender : {item.gender}</Text>
              <Text style={styles.text}>Age : {item.age}</Text>
              <Text style={styles.text}>Email : {item.email}</Text>
              <Text style={styles.text}>ID : {item.id}</Text>
              <Text style={styles.text}>Lang : {item.language}</Text>
              <Text style={styles.text}>
                Theme : {Mains.darkMode.toString()}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    paddingHorizontal: 90,
    paddingVertical: 50,
  },
  home: {
    flex: 1,
    // backgroundColor: '#333',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  text: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    marginVertical: 20,
    color: '#000',
  },
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: '#ddd',
    marginTop: 12,
  },
});

export default Home;
