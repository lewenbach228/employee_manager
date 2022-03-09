import React from "react"
import { Button, } from "react-native-elements";

const MyButton = ({ title, tap}) => {
  return (
    <Button
      onPress={tap}
      title= {title}
      buttonStyle={{
        backgroundColor: "rgba(231,76,60,1)",
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 30,
      }}
      containerStyle={{
        width: 200,
        alignSelf : 'center',
        // marginHorizontal: 60,
        marginVertical: 10,
      }}
      titleStyle={{ fontWeight: "bold" }}
    />
  );
};

export default MyButton;
