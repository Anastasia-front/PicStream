import { useEffect, useState } from "react";

import {
  Alert,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import { db } from "@firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import {
  authUpdateUser,
  selectStateAvatar,
  selectStateLogin,
  selectStateUserId,
  selectorStateComment,
} from "@redux";
import { useDispatch, useSelector } from "react-redux";

import { ListProfile, Loader, ModalLogin } from "@components";
import { avatarTemplate, exit, pickImage, uploadPhotoToServer } from "@utils";

import image from "@images";

import { globalVariables } from "@styles";

export const ProfileScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const [isShowLoaderAvatar, setIsShowLoaderAvatar] = useState(false);
  const [isShowLoaderPosts, setIsShowLoaderPosts] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector(selectStateUserId);
  const name = useSelector(selectStateLogin);
  const avatarGet = useSelector(selectStateAvatar);
  const comment = useSelector(selectorStateComment);
  const [modalLogin, setModalLogin] = useState(false);

  const login = name !== null ? name : "Default name";
  const avatar =
    avatarGet !== null
      ? avatarGet
      : "https://firebasestorage.googleapis.com/v0/b/first-react-native-proje-98226.appspot.com/o/userAvatars%2FDefault_pfp.svg.png?alt=media&token=7cafd3a4-f9a4-40f2-9115-9067f5a15f57";

  useEffect(() => {
    setIsShowLoaderPosts(true);
    const dbRef = collection(db, "posts");
    const myQuery = query(dbRef, where("owner.userId", "==", userId));

    onSnapshot(
      myQuery,
      (querySnapshot) => {
        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const reversPosts = posts.reverse();
        setPosts(reversPosts);
        setIsShowLoaderPosts(false);
      },
      () => {}
    );
  }, [userId, comment]);

  const changeAvatar = async () => {
    setIsShowLoaderAvatar(true);

    const avatarUri = await pickImage();
    const avatarURL = await uploadPhotoToServer(avatarUri, "userAvatars");

    dispatch(authUpdateUser({ avatarURL })).then((data) => {
      if (data === undefined || !data.userId) {
        setIsShowLoaderAvatar(false);
        console.log(data);
        Alert.alert("Реєстрацію не виконано!");
        return;
      }
      if (avatarURL !== avatarUri) {
        Alert.alert("Успішна зміна аватара!");
      }
    });

    setIsShowLoaderAvatar(false);
  };

  if (isShowLoaderAvatar) {
    return <Loader />;
  }

  if (modalLogin) {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          console.log("Button pressed");
        }}
      >
        <ModalLogin
          title="Редагування логіну"
          oldLogin={login}
          modalLogin={modalLogin}
          setModalLogin={setModalLogin}
        />
      </TouchableWithoutFeedback>
    );
  }

  return (
    <ImageBackground source={image} style={styles.imageBg}>
      <View style={styles.container}>
        <View style={styles.myPostsContainer}>
          {avatarTemplate(avatar, -70, 10, 42, changeAvatar)}

          <View style={styles.exitBtn}>
            <Feather
              name="log-out"
              size={24}
              color={styles.exitBtn.color}
              onPress={() => {
                exit(dispatch);
              }}
            />
          </View>
          <TouchableOpacity onPress={() => setModalLogin(true)}>
            <Text style={styles.login}>{login}</Text>
          </TouchableOpacity>
          <Text style={styles.count}>Всього публікацій: {posts.length}</Text>
          {isShowLoaderPosts ? (
            <Loader />
          ) : (
            <View style={styles.listContainer}>
              <ListProfile
                posts={posts}
                navigation={navigation}
                route={route}
              />
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  container: {
    height: globalVariables.containerPercent.eighty,
    width: globalVariables.containerPercent.full,

    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: globalVariables.color.white,
  },
  listContainer: {
    flex: 1,
  },
  myPostsContainer: {
    width: globalVariables.containerPercent.full,
    height: globalVariables.containerPercent.full,
    paddingTop: 60,
    marginLeft: 3,
    paddingHorizontal: 12,
  },
  avatarContainer: {
    position: "absolute",
    top: 30,
    left: 250,
    alignSelf: "center",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    borderRadius: globalVariables.radius.avatar,
    backgroundColor: globalVariables.color.lightGrey1,
  },

  avatarWrp: {
    borderRadius: globalVariables.radius.avatar,
    overflow: "hidden",
    height: globalVariables.containerPercent.avatarWrp,
    width: globalVariables.containerPercent.avatarWrp,
  },
  avatarImg: {
    width: globalVariables.containerPercent.full,
    height: globalVariables.containerPercent.full,
  },
  buttonAvatar: {
    position: "absolute",
    bottom: 13,
    right: -13,
    height: 25,
    width: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: globalVariables.radius.tab,
    borderWidth: globalVariables.border.main,
    borderColor: globalVariables.color.orangeMain,
    backgroundColor: globalVariables.color.white,
  },
  buttonAvatarText: {
    color: globalVariables.color.orangeMain,
  },
  exitBtn: {
    position: "absolute",
    right: 0,
    top: 16,
    color: globalVariables.color.lightGrey3,
  },
  login: {
    marginTop: 10,
    alignSelf: "center",
    fontSize: globalVariables.font.size.xl,
    fontWeight: globalVariables.font.weight.medium,
  },
  count: {
    alignSelf: "flex-end",
    fontSize: globalVariables.font.size.sm,
    marginBottom: 15,
    color: globalVariables.color.lightGrey3,
  },
});
