import React from 'react';
import { View, StyleSheet, Flatlist, Text, SafeAreaView } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
const HistoryItem = ({ item, index }) => {
  return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
};
export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };
  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we have focused on</Text>

            <Flatlist
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />

            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title="Clear"
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 1 ? 'red' : 'green',
    fontSize: 16,
  }),
  title: {
    color: 'white',
    fontSize: 24,
  },
  clearContainer: {
    alignItems: 'center',
    padding: 16,
  },
});
