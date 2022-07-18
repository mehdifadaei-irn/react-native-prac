import * as React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';

import CustomButton from '../../UI/CustomButton';
import {GlobalStyles} from '../../constants/styles';
import Input from './Input';

function ExpenseForm({defaultValues, onCancel, onSubmit, isEditing}) {
  const [inputValue, setInputValue] = React.useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description.toString() : '',
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValue(prevVal => {
      return {
        ...prevVal,
        [inputIdentifier]: {value: enteredValue, isValid: true},
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValue.amount.value,
      date: new Date(inputValue.date.value),
      description: inputValue.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descIsValid) {
      // Alert.alert('Invalid input', 'please check values');
      setInputValue(curInput => {
        return {
          amount: {value: curInput.amount.value, isValid: amountIsValid},
          date: {value: curInput.date.value, isValid: dateIsValid},
          description: {
            value: curInput.description.value,
            isValid: descIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputValue.amount.isValid ||
    !inputValue.date.isValid ||
    !inputValue.description.isValid;

  return (
    <View style={styles.formContainer}>
      <View style={styles.inputRow}>
        <Input
          label={'Amount'}
          invalid={!inputValue.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            value: inputValue.amount.value,
            onChangeText: inputChangedHandler.bind(this, 'amount'),
          }}
          style={{flex: 1}}
        />
        <Input
          label={'Date'}
          invalid={!inputValue.date.isValid}
          textInputConfig={{
            keyboardType: 'default',
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            value: inputValue.date.value,
            onChangeText: inputChangedHandler.bind(this, 'date'),
          }}
          style={{flex: 1}}
        />
      </View>
      <Input
        label={'Description'}
        invalid={!inputValue.description.isValid}
        textInputConfig={{
          multiline: true,
          autoCapitalize: 'none',
          value: inputValue.description.value,
          onChangeText: inputChangedHandler.bind(this, 'description'),
        }}
      />
      {formIsInvalid && <Text style={styles.feedBack}>invalid input values - please check your data</Text>}
      <View style={styles.buttons}>
        <CustomButton style={styles.button} mode={'flat'} onPress={onCancel}>
          Cancel
        </CustomButton>
        <CustomButton style={styles.button} onPress={submitHandler}>
          {isEditing ? 'Update' : 'Add'}
        </CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 80,
  },

  sum: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: GlobalStyles.colors.primary1,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedBack: {
    color: GlobalStyles.colors.error,
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    marginTop: 7,
    textAlign: 'center'
  }
});

export default ExpenseForm;
