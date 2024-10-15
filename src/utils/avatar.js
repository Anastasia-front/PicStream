import { Image, TouchableOpacity, View } from "react-native";

import { globalVariables } from "@styles";

function style(photoImageTop, pseudoTop, pseudoRight, avatar) {
  const styles = {
    photoImage: {
      width: 120,
      height: 120,
      position: "absolute",
      top: photoImageTop,
      left: "48%",
      transform: [{ translateX: -50 }, { translateY: -50 }],
      borderRadius: globalVariables.radius.avatar,
      borderWidth: globalVariables.border.thin,
      borderColor: globalVariables.color.grey,
      backgroundColor: globalVariables.color.white,
    },
    pseudo: {
      position: "absolute",
      top: pseudoTop,
      right: pseudoRight,
      transform: [{ translateX: -50 }, { translateY: -50 }],
    },
    afterElement: {
      position: "absolute",
      top: 0,
      right: 0,
      width: 25,
      height: 25,
    },
    afterElementCircle: {
      position: "absolute",
      width: 25,
      height: 25,
      left: 0,
      top: 0,
      backgroundColor: globalVariables.color.white,
      borderColor: globalVariables.color.orangeMain,
      borderWidth: globalVariables.border.main,
      borderRadius: globalVariables.radius.circle,
    },
    afterElementCircleGray: {
      borderColor: globalVariables.color.grey,
    },
    afterElementUnion: {
      position: "absolute",
      width: 25,
      height: 25,
      left: 0,
      top: 0,
    },
    afterElementVertical: {
      position: "absolute",
      width: 1,
      height: 13,
      left: 11,
      top: 5,
      backgroundColor: globalVariables.color.orangeMain,
    },
    afterElementVerticalGray: {
      backgroundColor: globalVariables.color.grey,
      transform: [{ rotate: "45deg" }],
    },
    afterElementHorizontal: {
      position: "absolute",
      width: 1,
      height: 13,
      left: 11,
      top: 5,
      backgroundColor: globalVariables.color.orangeMain,
      transform: [{ rotate: "-90deg" }],
    },
    afterElementHorizontalGray: {
      backgroundColor: globalVariables.color.grey,
      transform: [{ rotate: "-45deg" }],
    },
  };
  const renderImage = () => {
    if (avatar === "../images/whiteSquare.jpg") {
      return (
        <Image
          style={styles.photoImage}
          source={require("../images/whiteSquare.jpg")}
        />
      );
    } else {
      if (
        avatar ===
        "https://firebasestorage.googleapis.com/v0/b/first-react-native-proje-98226.appspot.com/o/userAvatars%2FDefault_pfp.svg.png?alt=media&token=7cafd3a4-f9a4-40f2-9115-9067f5a15f57"
      ) {
        return (
          <Image
            style={[
              styles.photoImage,
              { borderRadius: globalVariables.radius.image },
            ]}
            source={{ uri: avatar }}
          />
        );
      } else {
        return <Image style={styles.photoImage} source={{ uri: avatar }} />;
      }
    }
  };
  return { styles, renderImage };
}

export const avatarTemplate = (
  avatar,
  photoImageTop,
  pseudoTop,
  pseudoRight,
  handleAvatar
) => {
  const { styles, renderImage } = style(
    photoImageTop,
    pseudoTop,
    pseudoRight,
    avatar
  );
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          handleAvatar();
        }}
      >
        {renderImage()}
        <View style={styles.pseudo}>
          <View style={styles.afterElement}>
            <View
              style={[
                styles.afterElementCircle,
                avatar !== "../images/whiteSquare.jpg" &&
                  styles.afterElementCircleGray,
              ]}
            >
              <View style={styles.afterElementUnion}>
                <View
                  style={[
                    styles.afterElementVertical,
                    avatar !== "../images/whiteSquare.jpg" &&
                      styles.afterElementVerticalGray,
                  ]}
                />
                <View
                  style={[
                    styles.afterElementHorizontal,
                    avatar !== "../images/whiteSquare.jpg" &&
                      styles.afterElementHorizontalGray,
                  ]}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export const avatarRegister = (
  avatar,
  photoImageTop,
  pseudoTop,
  pseudoRight
) => {
  const { styles, renderImage } = style(
    photoImageTop,
    pseudoTop,
    pseudoRight,
    avatar
  );

  return (
    <>
      {renderImage()}
      <View style={styles.pseudo}>
        <View style={styles.afterElement}>
          <View
            style={[
              styles.afterElementCircle,
              avatar !== "../images/whiteSquare.jpg" &&
                styles.afterElementCircleGray,
            ]}
          >
            <View style={styles.afterElementUnion}>
              <View
                style={[
                  styles.afterElementVertical,
                  avatar !== "../images/whiteSquare.jpg" &&
                    styles.afterElementVerticalGray,
                ]}
              />
              <View
                style={[
                  styles.afterElementHorizontal,
                  avatar !== "../images/whiteSquare.jpg" &&
                    styles.afterElementHorizontalGray,
                ]}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
