import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const minutestoMilli = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 20, isPause,onProgress,onEnd }) => {
  const interval=React.useRef(null)
  const [millis, setMillis] = useState(null);
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  const countDown=()=>{
    setMillis((time)=>{
      if(time===0){
        clearInterval(interval.current)
        onEnd();
        return time;
      }
      const timeLeft=time-1000;
      onProgress(timeLeft/minutestoMilli(minutes))
      return timeLeft;

    })
  }
  useEffect(()=>{
    if(isPause)
    {
      if(interval.current) clearInterval(interval.current)
      return
    }
    interval.current=setInterval(countDown,1000)
    return()=>clearInterval(interval.current)
  },[isPause])
  
  useEffect(()=>{
    setMillis(minutestoMilli(minutes))
  },[minutes])
  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#fff',
    padding: 24,
    backgroundColor: 'rgba(94,132,226,0.3)',
  },
});
