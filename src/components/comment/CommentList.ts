import { FlatList, Image, StyleSheet, View } from "react-native";

import { Comment } from "@components";

import { globalVariables } from "@styles";

export const CommentsList = ({ allComments, photo }) => {
  return (
    <View style={styles.main}>
      <FlatList
        data={allComments}
        keyExtractor={({ id }) => id}
        renderItem={({ item, index }) => (
          <>
            {index === 0 && (
              <Image source={{ uri: photo }} style={styles.photo} />
            )}
            <Comment commentId={item.id} item={item} />
          </>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={<View style={{ height: 50 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingBottom: 50,
    backgroundColor: globalVariables.color.white,
  },
  parent: {
    marginHorizontal: 20,
    marginVertical: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    width: 370,
    height: 240,
    backgroundColor: globalVariables.color.lightGrey1,
    borderColor: globalVariables.color.white,
    borderWidth: globalVariables.border.main,
    borderRadius: globalVariables.radius.main,
    overflow: "hidden",
    marginHorizontal: 10,
    marginTop: 30,
    marginBottom: 30,
    borderRadius: globalVariables.radius.main,
    borderColor: globalVariables.color.lightGrey2,
  },
});
