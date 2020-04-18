import * as React from "react";
import CreateReactClass from "create-react-class";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../../stores/horizontal-prototype/store";
import { StyleSheet, View, ScrollView } from "react-native";
import LocalizedStrings from "react-localization";
import AppHeader from "../../components/horizontal-prototype/AppHeader";
import ConsumptionCard from "../../components/horizontal-prototype/ConsumptionCard";

let strings = new LocalizedStrings({
  en: {
    consumption: "Consumption",
    calendarWeek: "calendar-week",
    user: "User 1",
    role: "{role}",
    consumptionChart: "Above is a chart for the last 30 days. This text describes how user did compared to average person only on calories.",
    viewDetails: "VIEW DETAILS",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  materialHeader1: {
    width: 360,
    height: 56,
    alignSelf: "center"
  },
  scrollArea1: {
    width: 360,
    height: 628,
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  scrollArea1_contentContainerStyle: {
    width: 360,
    height: 3140,
    flexDirection: "column"
  },
  materialCard3: {
    width: 330,
    height: 420,
    margin: 15
  }
});

export default CreateReactClass({
  render: function() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
           <View style={styles.container}>
              <AppHeader
                text1={strings.consumption}
                icon2Name={strings.calendarWeek}
                style={styles.materialHeader1}
              ></AppHeader>
              <View style={styles.scrollArea1}>
                <ScrollView
                    contentContainerStyle={styles.scrollArea1_contentContainerStyle}
                >
                    <ConsumptionCard
                        text1={strings.user}
                        text2={strings.role}
                        text3={strings.consumptionChart}
                        text4={strings.viewDetails}
                        style={styles.materialCard3}
                    ></ConsumptionCard>
                </ScrollView>
              </View>
           </View>
           </PersistGate>
        </Provider>
    );
  },
});




