import { useEffect, useState } from "react";

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Feather, Ionicons } from "@expo/vector-icons";

import { db } from "@firebase";
import {
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  onSnapshot,
  setDoc,
  Timestamp,
} from "firebase/firestore";

import {
  addLike,
  selectStateAvatar,
  selectStateLogin,
  selectStateUserId,
} from "@redux";
import { useDispatch, useSelector } from "react-redux";

import { ModalLikes, ModalPhoto } from "@components";

import { globalVariables } from "@styles";

export const PostFeed = ({ post, navigation, route }) => {
  const dispatch = useDispatch();
  const login = useSelector(selectStateLogin);
  const avatar = useSelector(selectStateAvatar);
  const [countComments, setCountComments] = useState(0);
  const [likes, setLikes] = useState(0);
  const [likesInfo, setLikesInfo] = useState([]);
  const [numberOfClicks, setNumberOfClicks] = useState(0);
  const [modalLikes, setModalLikes] = useState(false);
  const [modalPhoto, setModalPhoto] = useState(false);
  const userId = useSelector(selectStateUserId);

  const handleLike = () => {
    setLikes(likes + 1);
    setNumberOfClicks(1);
    sendLike();
    if (numberOfClicks === 1) {
      setLikes(likes - 1);
      setNumberOfClicks(0);
      deleteLike();
    }
  };

  const sendLike = async () => {
    try {
      const postRef = doc(db, "posts", post.id, "likes", login);

      await setDoc(postRef, {
        owner: {
          login,
          avatar,
          userId,
        },
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      });
      dispatch(addLike(likes));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLike = async () => {
    try {
      const documentRef = doc(db, "posts", post.id, "likes", login);
      await deleteDoc(documentRef);
      console.log("The document was successfully deleted.");
    } catch (error) {
      console.error("Error when deleting the document:", error);
    }
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const commentsRef = collection(db, "posts", post.id, "comments");
        const likesRef = collection(db, "posts", post.id, "likes");

        const commentsSnapshot = await getCountFromServer(commentsRef);
        const likesSnapshot = await getCountFromServer(likesRef);

        setCountComments(commentsSnapshot.data().count);
        setLikes(likesSnapshot.data().count);
      };

      fetchData();
    } catch (error) {
      console.log("Error:", error.message);
    }
  }, [post]);

  useEffect(() => {
    const dbRef = collection(db, "posts", post.id, "likes");

    onSnapshot(
      dbRef,
      (data) => {
        const likes = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const reversLikes = likes.reverse();
        setLikesInfo(reversLikes);
      },
      () => {}
    );
  }, [likes]);

  const selectTitleLocation = ({ location }) => {
    if (location.title) {
      return location.title;
    }

    if (location.postAddress) {
      return `${location.postAddress?.city}, ${location.postAddress?.street}`;
    }

    return "Дефолтна локація";
  };

  if (modalLikes && likes !== 0) {
    return (
      <ModalLikes
        title="Вподобайки"
        likes={likesInfo}
        modalLikes={modalLikes}
        setModalLikes={setModalLikes}
      />
    );
  }
  if (modalPhoto) {
    return (
      <ModalPhoto
        photo={post.photo}
        modalPhoto={modalPhoto}
        setModalPhoto={setModalPhoto}
      />
    );
  }

  return (
    <View style={styles.postWrp}>
      <TouchableOpacity onPress={() => setModalPhoto(true)}>
        <Image style={styles.photo} source={{ uri: post.photo }} />
      </TouchableOpacity>

      <View style={styles.bottomInfo}>
        {route?.name !== "Profile" && (
          <View style={styles.column}>
            <View style={styles.owner}>
              <Image
                source={{ uri: post.owner.avatar }}
                style={styles.avatar}
              />
              <Text style={styles.dateTime}>{post.owner.login}</Text>
            </View>
          </View>
        )}

        <View>
          <Text style={styles.titlePost}>{post.titlePost}</Text>

          <View style={styles.buttonsWrp}>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.buttonComments}
                onPress={() => navigation.navigate("Comments", post)}
              >
                <View style={styles.commentsIcon}>
                  <Feather
                    name="message-circle"
                    size={24}
                    color={
                      countComments > 0
                        ? globalVariables.color.violet
                        : globalVariables.color.lightGrey3
                    }
                  />
                </View>
                <Text style={styles.commentsCount}>{countComments}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonComments}
                onPress={() => setModalLikes(true)}
              >
                <View style={styles.mapIcon}>
                  <Ionicons
                    name="heart"
                    size={25}
                    color={
                      likes > 0
                        ? globalVariables.color.pink
                        : globalVariables.color.lightGrey3
                    }
                    onPress={handleLike}
                  />
                </View>
                <Text style={styles.commentsCount}>{likes}</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.buttonLocation}
                onPress={() => navigation.navigate("Map", post)}
              >
                <View style={styles.mapIcon}>
                  <Ionicons
                    name="navigate"
                    size={20}
                    color={globalVariables.color.lightGrey3}
                  />
                </View>
                <Text
                  style={styles.mapTitle}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {selectTitleLocation(post)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    width: 65,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  dateTime: {
    width: 59,
    marginTop: 3,
    color: globalVariables.color.lightGrey3,
    fontSize: globalVariables.font.size.xs,
    fontWeight: globalVariables.font.weight.normal,
    textAlign: "center",
  },
  postWrp: {
    marginBottom: 30,
  },
  photo: {
    backgroundColor: globalVariables.color.lightGrey1,
    borderWidth: globalVariables.border.main,
    width: 350,
    height: 240,
    marginBottom: 10,
    borderRadius: globalVariables.radius.main,
    borderColor: globalVariables.color.lightGrey2,
  },
  bottomInfo: {
    flexDirection: "row",
  },
  owner: {
    marginTop: -10,
    marginRight: 10,
    height: 50,
    width: 50,
    borderRadius: globalVariables.radius.circle,
    backgroundColor: globalVariables.color.lightGrey1,
  },
  avatar: {
    height: globalVariables.containerPercent.full,
    width: globalVariables.containerPercent.full,
    borderRadius: globalVariables.radius.circle,
    borderWidth: globalVariables.border.main,
    borderColor: globalVariables.color.grey,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },
  titlePost: {
    marginBottom: 5,
    maxWidth: 100,

    fontSize: globalVariables.font.size.md,
    fontWeight: globalVariables.font.weight.medium,
    color: globalVariables.color.black,
  },
  buttonsWrp: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 280,
  },
  buttonComments: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentsIcon: {
    marginRight: 10,
    transform: [{ rotate: "-90deg" }],
    fill: globalVariables.color.lightGrey3,
  },
  commentsCount: {
    fontSize: globalVariables.font.size.md,
  },
  buttonLocation: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  mapIcon: {
    marginRight: 10,
    fill: globalVariables.color.lightGrey3,
  },
  mapTitle: {
    maxWidth: 100,

    fontSize: globalVariables.font.size.md,
    fontWeight: globalVariables.font.weight.medium,
    textDecorationLine: globalVariables.textDecoration,
    color: globalVariables.color.black,
  },
});
