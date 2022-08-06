import React, {useState} from 'react';
import {useReducer, createContext} from 'react';
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

export const MainContext = createContext({
  darkMode: false,
  person: {
    name: '',
    img: null,
    gender: 'male',
    age: null,
    email: '',
    language: 'English',
  },
  toggleTheme: () => {},
  pic: '',
  setPic: pic => {},
  createTables: () => {},
  setPerson: () => {},
  isEdit: () => {},
  result: [],
  getInputs: ()=> {},
  remove: ()=> {},
  setResult: ()=> {},
  isEditing: false,
  setIsEditing: ()=> {},
});

function MainContextProvider({children}) {
  const [result, setResult] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [pic, setPic] = useState('');
  const [person, setPerson] = useState({
    name: '',
    img: null,
    gender: 'male',
    age: null,
    email: '',
    id: null,
    language: 'English'
  });
  const [isEditing, setIsEditing] = useState('false');

  const createTables = () => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS val (id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(20), gender VARCHAR(10), age INT(10), email VARCHAR(20), language VARCHAR(10))`,
        [],
        (sqlTxn, res) => {
          console.log('table created!!!');
        },
        error => {
          console.log('error on creating table ' + error.message);
        },
      );
    });
  };

  const isEdit = () => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT name FROM val`,
        [],
        (sqlTxn, res) => {
          // console.log('this'+res.name);
          // console.log('asda')
          if(res.rows.length == 0){
            setIsEditing('false')
          }else{
            setIsEditing('true')
          }
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
        `SELECT * FROM val ORDER BY id DESC`,
        [],
        (sqlTxn, res) => {
          console.log('selected');
          let len = res.rows.length;
          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({
                id: item.id,
                name: item.name,
                gender: item.gender,
                age: item.age,
                email: item.email,
                language: item.language,
                edit: item.edit
              });
            }
            // console.log(rows.item(0));
            // console.log(results[0].id);
            setPerson((cur)=> {
              return {
                ...cur,
                name: results[0].name,
                gender: results[0].gender,
                age: results[0].age,
                email: results[0].email,
                id: results[0].id,
                language:  results[0].language
              }
            })
            setResult(results);
          }
        },
        error => {
          console.log('error on getting inputs ' + error.message);
        },
      );
    });
  };

  function toggleTheme() {
    dispatch({type: 'TOGGLE_THEME'});
  }

  const value = {
    darkMode: darkMode,
    person: person,
    toggleTheme: toggleTheme,
    pic: pic,
    setPic,
    createTables,
    setPerson,
    isEdit,
    result,
    getInputs,
    setResult,
    isEditing,
    setIsEditing
  };

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
}

export default MainContextProvider;
