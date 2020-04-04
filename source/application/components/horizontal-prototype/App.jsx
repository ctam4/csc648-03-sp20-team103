import React from 'react';
import CreateReactClass from 'create-react-class';
import LocalizedStrings from 'react-localization';
import { StyleSheet, Text, View } from 'react-native';

let apiUrl = process.env.API_HOST || location.hostname;
if (process.env.API_PORT) {
  apiUrl += ':' + process.env.API_PORT;
}

let strings = new LocalizedStrings({
  en: {
    hello_world: "Hello, world!",
  },
});

const styles = StyleSheet.create({
  box: { padding: 10 },
  text: { fontWeight: 'bold' },
});

export default CreateReactClass({
  render: function() {
    return (
      <View style={styles.box}>
        <Text style={styles.text}>{strings.hello_world}</Text>
      </View>
    );
  },
});
