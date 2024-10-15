import { useState } from "react";

import {
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { LikeInfo } from "@components";

import { globalVariables } from "@styles";

export const ModalLikes = ({ modalLikes, setModalLikes, title, likes }) => {
  const [isPressed, setIsPressed] = useState(false);

  const closeAndElevate = () => {
    setModalLikes(!modalLikes);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalLikes}
      onRequestClose={() => {
        setModalLikes(!modalLikes);
      }}
    >
      <TouchableWithoutFeedback onPress={closeAndElevate}>
        <View style={styles.container}>
          <View>
            <View
              style={[
                styles.modalView,
                {
                  backgroundColor: globalVariables.color.orangeModal,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                },
              ]}
            >
              <Text style={styles.modalTitle}>{title}</Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={closeAndElevate}
              >
                {isPressed ? (
                  <View>
                    <Ionicons
                      name="close-circle"
                      size={25}
                      color={globalVariables.color.white}
                      style={{ marginRight: 25 }}
                      onPress={() => setIsPressed(!isPressed)}
                    />
                  </View>
                ) : (
                  <Ionicons
                    name="close-circle-outline"
                    size={25}
                    color={globalVariables.color.white}
                    style={{ marginRight: 25 }}
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
              <FlatList
                data={likes}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => <LikeInfo like={item} />}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
