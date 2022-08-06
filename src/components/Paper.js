import * as React from 'react';
import { View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

const MyComponent = () => {
  const [text, setText] = React.useState('');

  const hasErrors = () => {
   console.log(!text.includes('@'));
    return (!text.includes('@') || (text.length > 3 ? false: true))
  };

 return (
    <View>
      <TextInput label="Email" value={text} onChangeText={setText} />
      <HelperText type="error" visible={hasErrors()}>
        Email address is invalid!
      </HelperText>
    </View>
  );
};

export default MyComponent;