import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView, Dimensions, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import postStyle from '../styles/post';
import StandartButton from '../components/standartbutton';

interface Post {
  postId: string;
  userId: string;
  postContent: string;
  likeCount: string;
  userEmail: string;
  userName: string;
}

function PostScreen({ route, navigation }: { route: any, navigation: any }) {
  const [posts, setPosts] = useState<null | Post[]>(null);
  const [postContent, setPostContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [likedPosts, setLikedPosts] = useState<null | string[]>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [selectedPostToDelete, setSelectedPostToDelete] = useState<null | string> ( null);

  const { userName, userEmail } = route.params;

  async function getPosts() {
    try {
      const response = await fetch("http://10.0.2.2:5000/getposts");
      const data: Post[] = await response.json();
      setPosts(data);
      getUserLikes();
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserLikes() {
    try {
      const response = await fetch(`http://10.0.2.2:5000/getuserlikes?userEmail=${userEmail}`);
      const data: string[] = await response.json();
      setLikedPosts(data);
    } catch (error) {
      console.log(error);
    }
  }


  async function addPost() {
    if (postContent != "") {
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
  }

  async function likePost(userEmail: string, postId: string, postLikeCount: string) {
    try {
      await fetch(
        "http://10.0.2.2:5000/likepost", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          { postInfo: { "userEmail": userEmail, "postId": postId, "postLikeCount": postLikeCount } }
        )
      }
      );
      await getPosts();
    } catch (error) {
      console.log(error);
    }
  }

  function getPostToDelete(postId: string){
    setSelectedPostToDelete(postId);
    setDeleteModalVisible(true);
  }

  async function deletePost(postId: string) {
    try {
      await fetch(
        "http://10.0.2.2:5000/deletepost", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          { postInfo: { "postId": postId } }
        )
      }
      );
      await getPosts();
      setDeleteModalVisible(false);
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
    <SafeAreaView style={postStyle.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={postStyle.container}>
        <ScrollView contentContainerStyle={postStyle.scrollViewContent}>
          <View style={{ display: "flex", width: "90%", flexDirection: "row", justifyContent: "flex-start" }}>
            <Icon name="user" size={24}></Icon>
            <Text style={{ marginLeft: 5 }}>{userName}</Text>
          </View>
          <TextInput
            value={postContent}
            onChangeText={(text) => setPostContent(text)}
            multiline={true}
            numberOfLines={4}
            style={postStyle.textInput}
            placeholder='Add a post...'
          />
          <StandartButton
            label="Add post"
            onPress={addPost}
            backgroundColor="deepskyblue"
            color="white"
          />
          <View style={postStyle.postsSection}>
              <>
              {!loading ? posts?.map(post =>
                <View
                  key={post["postId"]}
                  style={postStyle.post}>
                  <View style={{ display: "flex", flexDirection: "row", margin: 5, width: "100%" }}>
                    <Icon name="user" size={24}></Icon>
                    <Text style={{ marginLeft: 5 }}>{post["userName"]}</Text>
                    {post["userEmail"] == userEmail ?
                      <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <Icon
                          name="trash-o"
                          size={32}
                          color={"red"}
                          style={{ marginRight: 10 }}
                          onPress={() => getPostToDelete(post["postId"])}
                        />
                      </View> : <></>}
                  </View>
                  <Text style={postStyle.postText}>{post["postContent"]}</Text>
                  <View style={{ flex: 1, alignItems: "flex-end", paddingRight: 5 }}>
                    <View style={{ width: "auto" }}>
                      <Icon
                        name="thumbs-up"
                        size={24}
                        color={likedPosts?.includes(post["postId"]) ? "deepskyblue" : "gray"}
                        onPress={() => likePost(userEmail, post["postId"], post["likeCount"])}
                      />
                      <Text style={{ textAlign: "center" }}>{post["likeCount"]}</Text>
                    </View>
                  </View>
                </View>
                ): <Text>Carregando...</Text>}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={deleteModalVisible}
                  >
                    <View style={postStyle.modalOverlay}>
                      <View style={postStyle.modalBox}>
                        <View style={postStyle.modalBoxColumn}>
                          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 5 }}>You sure you want to delete this post?</Text>
                          <View style={{ flex: 1 }}></View>
                          <View style={postStyle.modalButtonRow}>
                            <StandartButton
                              label='Yes'
                              onPress={() => deletePost(selectedPostToDelete!)}
                              color='white'
                              backgroundColor='green'
                            />
                            <View style={{ marginHorizontal: 10 }}></View>
                            <StandartButton
                              label='No'
                              onPress={() => setDeleteModalVisible(false)}
                              color='white'
                              backgroundColor='red'
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </Modal>
                  
              </>
             
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default PostScreen;
