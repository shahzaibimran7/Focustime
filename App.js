import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/Timer/Timer';
import AsyncStorage from '@react-native-async-storage/async-storage';
const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};
export default function App() {
  const [focusSubject, setfocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);
  const addFocusHistorySubjectwithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, {subject, status }]);
  };

  const onClear = () => {
    setFocusHistory([]);
  };
  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };
  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    loadFocusHistory();
  }, []);
  
  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectwithStatus(focusSubject, STATUSES.COMPLETE);
            setfocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectwithStatus(focusSubject, STATUSES.CANCELLED);
            setfocusSubject(null);
          }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Focus addSubject={setfocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252250',
    paddingTop: Platform.OS === 'ios' ? 16 : 24,
  },
});
