import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Animated,
  TextInput,
  Button,
} from 'react-native';

const Progress = ({step, steps, height}) => {
  const [width, setWidth] = useState(0);

  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [step, width]);

  return (
    <>
      <Text
        style={{
          fontFamily: 'EduQLDBeginner-Bold',
          fontSize: 17,
          marginVertical: 6,
        }}>
        {step}/{steps}
      </Text>
      <View
        onLayout={ev => {
          const newWidth = ev.nativeEvent.layout.width;

          setWidth(newWidth);
        }}
        style={{
          height: 20,
          backgroundColor: 'rgba(0,0,0,0.3)',
          borderRadius: 20,
          overflow: 'hidden',
          width: '95%',
        }}>
        <Animated.View
          style={{
            height: 20,
            borderRadius: 20,
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            position: 'absolute',
            left: 0,
            top: 0,
            transform: [
              {
                translateX: animatedValue,
              },
            ],
          }}
        />
      </View>
    </>
  );
};

export default function App() {
  const [click, setClick] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (click) {
      const interval = setInterval(() => {
        setIndex((index + 1) % (10 + 1));
        
      }, 500);

      return () => {
        clearInterval(interval);
      };
    }
  }, [index, click]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Button
        onPress={() => setClick(!click)}
        title={click ? 'Stop' : 'Start'}
        color="#14aaa8"
      />
      <Progress step={index} steps={10} height={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
});
