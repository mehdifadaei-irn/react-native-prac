import * as React from 'react';
import {Text, StyleSheet, Pressable, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../utils/date';

export default function ExpenseItem({id, description, amount, date}) {
  const navigation = useNavigation();
  const pressHandler=()=> {
    navigation.navigate('ManageExpense', {
      expenseId: id
    })
  }


  return (
    <Pressable onPress={pressHandler} style={({pressed})=> pressed && styles.pressed }>
      <View style={styles.container}>

        <View>
          <Text style={[styles.textBase , styles.description]}>{description}</Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount}</Text>
        </View>

      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed:{
    opacity: 0.75
  },
  container: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
  },
  textBase: {
    color: "#ddd6fe",
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: "Roboto-Bold"
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 70,
  },
  amount: {
    color: GlobalStyles.colors.primary1,
    fontFamily: "Roboto-Bold"
  }

})
