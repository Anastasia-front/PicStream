import { useState } from "react";

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";

import { db } from "@firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

import {
  addComment,
  selectStateAvatar,
  selectStateLogin,
  selectStateUserId,
} from "@redux";
import { useDispatch, useSelector } from "react-redux";

import { InputComment } from "@components";
import { useKeyboardListener } from "@utils";

export const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const login = useSelector(selectStateLogin);
  const avatar = useSelector(selectStateAvatar);
  const [myComment, setMyComment] = useState("");
  const { keyboardHeight } = useKeyboardListener(170);
  const userId = useSelector(selectStateUserId);

  const sendComment = async () => {
    const uniqueCommentId = Date.now().toString();

    try {
      const postRef = doc(db, "posts", postId, "comments", uniqueCommentId);

      await setDoc(postRef, {
        comment: myComment,
        owner: {
          login,
          avatar,
          userId,
        },
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      });
      setMyComment("");
      dispatch(addComment(myComment));
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ bottom: keyboardHeight }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={[styles.formWrp, { bottom: keyboardHeight }]}>
          <InputComment
            handleButtonClick={sendComment}
            inputValue={myComment}
            setInputValue={setMyComment}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  formWrp: {
    position: "absolute",
    left: 20,
  },
});
