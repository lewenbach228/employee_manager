import { View, Text, Modal, StyleSheet } from "react-native";
import React from "react";
import MyButton from "../components/Button";

const ConfirmModal = ({ visible, onAccept, onDecline }) => {
  return (
    <View >
      <Modal
        transparent
        visible={visible}
        animationType="slide"
        onRequestClose={() => {}}
      >
        <View style={styles.containerStyle}>
          <View style={styles.cardStyle}>
            <Text
              style={{
                fontSize: 17,
                lineHeight: 40,
                color : 'white'
              }}
            >
              Voulez-vous vraiment renvoyer cet employé ?
            </Text>
          </View>
          <MyButton title="Oui" tap={onAccept} />
          <MyButton title="Annuler" tap={onDecline} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "rgba(0,0,0,0.75)",
    position: "relative",
    flex: 1,
    justifyContent: "center",
  },
  cardStyle: {
    justifyContent: "center",
    alignItems : 'center',
    // flex: 1,
  },
});

export default ConfirmModal;
