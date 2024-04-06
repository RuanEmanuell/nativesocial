import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';

function App() {
  const [posts, setPosts] = useState<string[]>([]);
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
        "http://10.0.2.2:5000/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          { postContent: postContent }
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
    <View style={styles.container}>
      {posts.length > 0 ? posts.map(post => <Text style={styles.text}>{post}</Text>) : <Text style={styles.text}>Olá, mundo!</Text>}
      <TextInput
        value={postContent}
        onChangeText={(text) => setPostContent(text)}
      />
      <Button
        onPress={addPost}
        title="Add Post"
        color="skyblue" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {

  }
});

export default App;
