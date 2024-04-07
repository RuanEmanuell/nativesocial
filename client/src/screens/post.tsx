import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/styles';

interface Post {
  postId: string;
  userId: string;
  postContent: string;
  likeCount: string;
  userName: string;
}

function PostScreen({route, navigation} : {route:any, navigation:any}) {
  const [posts, setPosts] = useState<null | Post[]>(null);
  const [postContent, setPostContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const {userName, userEmail} = route.params;

  async function getPosts() {
    try {
      const response = await fetch("http://10.0.2.2:5000/getposts");
      const data: Post[] = await response.json();
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addPost() {
    try {
      await fetch(
        "http://10.0.2.2:5000/addpost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          { userEmail: userEmail, postContent: postContent }
        )
      }
      );
      setPostContent("");
      await getPosts();
    } catch (error) {
      console.log(error);
    }
  }

  async function likePost(postId: string, postLikeCount: string) {
    try {
      await fetch(
        "http://10.0.2.2:5000/likepost", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          { postInfo: { "postId": postId, "postLikeCount": postLikeCount } }
        )
      }
      );
      await getPosts();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (posts) {
      setLoading(false);
    }
  }, [posts]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={{ display: "flex", flexDirection: "row", marginLeft: 5 }}>
            <Icon name="user" size={24}></Icon>
            <Text style={{ marginLeft: 5 }}>{userName}</Text>
          </View>
          <TextInput
            value={postContent}
            onChangeText={(text) => setPostContent(text)}
            multiline={true}
            style={styles.textInput} />
          <Pressable
            onPress={addPost}
            style={styles.button}>
            <Text style={{ color: "white" }}>Add post</Text>
          </Pressable>
          <View style={styles.postsSection}>
            {!loading ? posts?.map(post =>
              <View
                key={post["postId"]}
                style={styles.post}>
                <View style={{ display: "flex", flexDirection: "row", marginLeft: 5 }}>
                  <Icon name="user" size={24}></Icon>
                  <Text style={{ marginLeft: 5 }}>{post["userName"]}</Text>
                </View>
                <Text style={styles.postText}>{post["postContent"]}</Text>
                <View style={{ width: "100%", display: "flex", alignItems: "flex-end", paddingRight: 10 }}>
                  <View style={{ width: "auto" }}>
                    <Icon
                      name="thumbs-up"
                      size={24}
                      color={"deepskyblue"}
                      onPress={() => likePost(post["postId"], post["likeCount"])}
                    />
                    <Text style={{ textAlign: "center" }}>{post["likeCount"]}</Text>
                  </View>
                </View>
              </View>
            ) : <Text>Carregando...</Text>}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default PostScreen;
