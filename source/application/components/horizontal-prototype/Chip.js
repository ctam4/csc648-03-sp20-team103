import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

function Chip(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.chipText}>{props.text1 || 'Filter'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(230,230,230)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 12,
    paddingLeft: 12,
    borderRadius: 50
  },
  chipText: {
    color: 'rgba(0,0,0,0.87)',
    fontSize: 13
  }
});

export default Chip;
