import * as React from 'react';
import { FlatList, StyleSheet} from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import ExpenseItem from './ExpenseItem';


function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={(i)=> (
        <ExpenseItem {...i.item}/>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary1
  }
})

export default ExpensesList;
