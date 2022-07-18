import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

const BoldAndBeautiful = () => {

  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput fallBackText={"no expenses found here!"} expenses={expensesCtx.expenses} expensesPeriod={"At 6 days Ago"}/>
  );
}; 

const styles = StyleSheet.create({
  baseText: {
    fontWeight: 'bold'
  },
  innerText: {
    color: 'red'
  }
});

export default BoldAndBeautiful;