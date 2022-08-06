import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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

const Setting = ({navigation, route}) => {
  const [result, setResult] = useState([]);
  const [inputs, setInputs] = useState({
    number: null,
    string: '',
  });
  let st;

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS inputs (id INTEGER PRIMARY KEY AUTOINCREMENT, number INT(10),name VARCHAR(20))`,
        [],
        (sqlTxn, res) => {
          console.log('table created');
        },
        error => {
          console.log('error on creating table ' + error.message);
        },
      );
    });
  };

  const getInputs = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM inputs ORDER BY id DESC`,
        [],
        (sqlTxn, {rows}) => {
          console.log('selected');
          //  let len = res.rows.length;
          //  if (len > 0) {
          //    let results = [];
          //    for (let i = 0; i < len; i++) {
          //      let item = res.rows.item(i);
          //      results.push({id: item.id, name: item.name, number: item.number});
          //    }
          //  console.log(rows.item(0));
          setResult(rows.item(0));
          // console.log(rows.item(0));
          //   navigation.navigate('home', {
          //    id: res[0].id,
          //    number: res[0].number,
          //    name:res[0].number,
          //   });
          //  }
        },
        error => {
          console.log('error on getting inputs ' + error.message);
        },
      );
    });
  };

  const handleSubmit = () => {
    console.log(!!result);
    if (!result) {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO inputs (number, name) VALUES (?, ?)`,
          [inputs.number, inputs.string],
          (_, res) => {
            console.log('inserted');
            getInputs();
            setInputs(cur => {
              return {
                number: null,
                string: '',
              };
            });
          },
        );
      });
    } else {
      // db.transaction(tx => {
      //   tx.executeSql(`UPDATE  inputs set `);
      // });
      console.log('else');
    }
   //  console.log(`result is ${result.name}`);
  };

  const remove = id => {
    db.transaction(txn => {
      txn.executeSql(`DELETE FROM inputs WHERE id=?`, [id], (_, res) => {
        console.log('Deleted');
        getInputs();
      });
    });
  };

  useEffect(() => {
    createTable();
    getInputs();

    console.log(`name is ${result.name}`);
    let st =  `'${result.number}'`;
  }, []);

  
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="number"
          style={styles.input}
          value={!!result ? `${result.number}`: inputs.number}
          onChangeText={value =>
            setInputs(current => {
              return {
                ...current,
                number: value,
              };
            })
          }
          keyboardType="number-pad"
        />
        <TextInput
          placeholder="string"
          style={styles.input}
          value={!!result ? result.name: inputs.string}
          onChangeText={value =>
            setInputs(current => {
              return {
                ...current,
                string: value,
              };
            })
          }
        />
      </View>
      <Button title="Submit" onPress={handleSubmit} />
      <Text>
        {inputs.number} {inputs.string}
      </Text>
      {/* <Text style={styles.text}>{res.length.toString()}qw</Text> */}
      {!result ? (
        <Text>nothing</Text>
      ) : (
        <TouchableOpacity onPress={() => remove(result.id)} key={result.id}>
          <View>
            <Text style={styles.text}>name = {result.name}</Text>
            <Text style={styles.text}>number = {result.number}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 300,
    padding: 8,
    backgroundColor: '#b4b4f3',
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 8,
    borderRadius: 9,
  },
  text: {
    fontSize: 25,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default Setting;
