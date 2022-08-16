import React, { useState } from 'react';
import { Text, View, StyleSheet, Vibration, Platform } from 'react-native';
import { Countdown } from '../../components/Countdown';
import { ProgressBar } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';
import { useKeepAwake } from 'expo-keep-awake';
const DEFAULT_TIME = 0.1;
export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const interval=React.useRef(null)
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [progress, setProgress] = useState(1);
  const [isStarted, setisStarted] = useState(false);
  const onProgress = (progress) => {
    setProgress(progress);
  };
  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setisStarted(false);
  };
  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };
  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setisStarted(false);
    onTimerEnd();
  };
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPause={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: 40 }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View>
        <View style={{ paddingTop: 8 }}>
          <ProgressBar
            progress={progress}
            color="#5E84E2"
            style={{ height: 10 }}
          />
        </View>
        <View style={styles.buttonwrapper}>
          <Timing onChangeTime={changeTime} />
        </View>
      </View>
      <View style={styles.buttonwrapper}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={() => setisStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setisStarted(true)} />
        )}
      </View>
      <View style={styles.clearsubject}>
        <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
  },
  task: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonwrapper: {
    flex: 0.3,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearsubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});
