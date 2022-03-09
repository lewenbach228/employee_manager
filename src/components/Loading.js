import React from "react";
import { View, Text } from "react-native";
import { FAB } from "react-native-elements";

export default () => {
  const [visible, setVisible] = React.useState(true);

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingVertical: 5,
          // flexGrow: 1,
          justifyContent: "center",
          backgroundColor : 'rgba(231,76,60,1)'
        }}
      >
        {/* <FAB
          loading
          visible={visible}
          // icon={{ name: "add", color: "white" }}
          size="large"
          color="white"
        /> */}
        <Text style={{ color: "white", paddingVertical: 10, fontSize: 20 }}>
          Chargement en cours ...
        </Text>
      </View>
    </>
  );
};
