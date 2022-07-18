import * as React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

import {GlobalStyles} from '../constants/styles';
import IconButton from '../UI/IconButton';
import CustomButton from '../UI/CustomButton';
import {ExpensesContext} from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

function ManageExpenses({route, navigation}) {
  const expenseCtx = React.useContext(ExpensesContext);

  const editedExpenseID = route.params?.expenseId;
  const isEditing = !!editedExpenseID;

  const selectedExpense = expenseCtx.expenses.find(
    expense => expense.id === editedExpenseID,
  );

  const {deleteExpense, updateExpense, expenses, addExpense} =
    React.useContext(ExpensesContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'EDIT EXPENSE' : 'ADD EXPENSE',
    });
  }, [navigation, isEditing]);

  const deleteHandler = () => {
    deleteExpense(editedExpenseID);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.navigate('ExpensesOverView');
  };

  const confirmHandler = expenseData => {
    // const specific = expenses.find((item)=> item.id = editedExpenseID);
    // updateExpense(editedExpenseID,{...specific})
    if (isEditing) {
      updateExpense(editedExpenseID, expenseData);
    } else {
      addExpense(expenseData);
    }
    navigation.navigate('ExpensesOverView');
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <Text style={styles.titleForm}>You can Edit your expense</Text>
      ) : (
        <Text style={styles.titleForm}>Enter you new expense</Text>
      )}
      <ExpenseForm
        onSubmit={confirmHandler}
        isEditing={isEditing}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error}
            size={36}
            onPress={deleteHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary1,
  },
  deleteContainer: {
    marginTop: 60,
    paddingTop: 8,
    borderTopWidth: 2,
    borderColor: GlobalStyles.colors.primary6,
    alignItems: 'center',
  },

  titleForm: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    color: GlobalStyles.colors.primary7,
    marginTop: 40,
  },
});

export default ManageExpenses;
