import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function App() {
  const [posts, setPosts] = useState<any[]>([]);
  const [postContent, setPostContent] = useState<string>("");

  async function getPosts() {
    try {
      const response = await fetch("http://10.0.2.2:5000");
      const data: string[] = await response.json();
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
          { postContent: postContent }
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

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
            {posts.length > 0 ? posts.map(post =>
              <View
                key={post["postId"]}
                style={styles.post}>
                <Text style={styles.text}>{post["postContent"]}</Text>
                <View style={{ width: "100%", paddingRight: "1%", display: "flex", alignItems: "flex-end" }}>
                  <Icon.Button
                    name="thumbs-up"
                    onPress={() => likePost(post["postId"], post["likeCount"])}
                  />
                </View>
                <Text style={{textAlign: "right", marginRight: "6%"}}>{post["likeCount"]}</Text>
              </View>
            ) : <Text style={styles.text}>Carregando...</Text>}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  textInput: {
    width: "90%",
    borderWidth: 2,
    borderColor: "gray",
    marginTop: 5
  },
  button: {
    backgroundColor: "blue",
    marginTop: 5,
    padding: 10,
    borderRadius: 5,
  },
  postsSection: {
    marginTop: 5,
  },
  post: {
    borderTopWidth: 2,
    borderTopColor: "gray"
  }
});

export default App;
