import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Hey what would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, marginRight: 16 }}
            onSubmitEditing={({ nativeEvent }) => setSubject(nativeEvent.text)}
          />
          <RoundedButton
            size={50}
            title="+"
            onPress={() => {addSubject(subject)}}
          />
          </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  titleContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  inputContainer: {
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
