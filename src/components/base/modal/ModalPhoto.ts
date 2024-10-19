import { useState } from "react";

import {
  Image,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { globalVariables } from "@styles";

export const ModalPhoto = ({ modalPhoto, setModalPhoto, photo }) => {
  const [isPressed, setIsPressed] = useState(false);

  const closeAndElevate = () => {
    setModalPhoto(!modalPhoto);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalPhoto}
      onRequestClose={() => {
        setModalPhoto(!modalPhoto);
      }}
    >
      <TouchableWithoutFeedback onPress={closeAndElevate}>
        <View style={styles.container}>
          <View>
            <View
              style={[
                styles.modalView,
                {
                  backgroundColor: globalVariables.color.lightGrey1,
                  borderTopLeftRadius: globalVariables.radius.main,
                  borderTopRightRadius: globalVariables.radius.main,
                  paddingBottom: 40,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={closeAndElevate}
              >
                {isPressed ? (
                  <View>
                    <Ionicons
                      name="close-circle"
                      size={35}
                      color={globalVariables.color.grey}
                      style={{ marginRight: 10 }}
                      onPress={() => setIsPressed(!isPressed)}
                    />
                  </View>
                ) : (
                  <Ionicons
                    name="close-circle-outline"
                    size={35}
                    color={globalVariables.color.grey}
                    style={{ marginRight: 10 }}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.modalView,
                {
                  backgroundColor: globalVariables.color.white,
                  borderBottomLeftRadius: globalVariables.radius.main,
                  borderBottomRightRadius: globalVariables.radius.main,
                },
              ]}
            >
              <Image style={styles.photo} source={{ uri: photo }} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
