<template>
  <div>
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    >
    <div class="post">
      <span id="menu" @click="toggleMenu"><i class="fa-solid fa-bars"></i></span>
      <h1>Add new post</h1>
      <input type="file" id="p1" @change="handleImageUpload">
      <img v-if="uploadedImageUrl" :src="uploadedImageUrl" alt="Uploaded Image" class="uploaded-image">
      <div id="media">
        <i
          class="far fa-thumbs-up"
          :class="{ 'liked': isLiked }"
          @click="toggleLike"
        ></i>
        <i class="far fa-comment" @click="toggleCommentInput"></i>
        
        <i class="fas fa-share" @click="showSocialIcons = !showSocialIcons"></i>
        <div v-show="showSocialIcons" id="socialIcons">
          <i class="fab fa-facebook-f" @click="openSocialMedia('https://www.facebook.com/')"></i>
          <i class="fab fa-whatsapp" @click="openSocialMedia('https://www.whatsapp.com/')"></i>
          <i class="fab fa-instagram" @click="openSocialMedia('https://www.instagram.com/')"></i>
        </div>
        <input
    type="text"
    id="commentInput"
    v-show="showCommentInput"
    placeholder="Add Comment"
    v-model="comment"
  >
  <button v-show="showCommentInput" @click="addComment">Add</button>

        
       <div id="comments">
      <div v-for="comment in comments" :key="comment.id" class="comment">
      {{ comment.text }}
    </div>
        </div>
      </div>
    </div>
    
    <div v-if="showMenu" id="menuItems">
      <div @click="navigateTo('/')">Login</div>
      <div @click="navigateTo('/signup')">Signup</div>
      <div @click="navigateTo('/image-upload')">Profile</div>
    </div>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const showMenu = ref(false);
    const showCommentInput = ref(false);
    const showSocialIcons = ref(false);
    const isLiked = ref(false);
    const uploadedImageUrl = ref(null);
    const postId = ref(); 
    const userId = ref();
    const comment = ref('');
    const comments = ref([]);
  


    function simulateRegistration() {
      // In a real scenario, you would fetch the userId after registration
      userId.value = 123; // Replace with the actual userId
    }
    
     async function addComment() {
      if (!comment.value.trim()) {
        return;
      }

      if (!userId.value) {
        alert('Please log in or register before adding a comment.');
        return;
      }

      try {
        const payload = {
          post_id: postId.value, // Replace with the actual postId
          user_id: userId.value, // Use the stored userId
          content: comment.value
        };

        const response = await axios.post('http://localhost:4000/api/comments/addComment', payload);

        console.log('Comment added successfully:', response.data);
        comment.value = '';
        fetchComments(); // Update the comments after successful addition
        alert('Comment added successfully');
      } catch (error) {
        console.error('Failed to add comment:', error);

        if (error.response) {
          console.error('Error Response Status:', error.response.status);
          console.error('Error Response Data:', error.response.data);
        }

        alert('Failed to add comment. Please try again.');
      }
    }

    async function fetchComments() {
      try {
        const response = await axios.get('http://localhost:4000/api/comments/getComments');
        console.log('API Response:', response.data);
        comments.value = response.data; // Assuming response.data is an array of comments
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }

    function toggleCommentInput() {
      showCommentInput.value = !showCommentInput.value;
      if (!showCommentInput.value) {
        comment.value = '';
      }
    }

    function openSocialMedia(url) {
      window.open(url, '_blank');
    }

    async function toggleLike() {
      isLiked.value = !isLiked.value;

      try {
        const response = await axios.post('http://localhost:4000/api/likes/likePost', {
          post_id: 123,
          user_id: 456,
        });
        console.log(response.data.message);
      } catch (error) {
        console.error(error);
      }
    }

    function toggleMenu() {
      showMenu.value = !showMenu.value;
    }

    function navigateTo(path) {
      router.push(path);
      showMenu.value = false;
    }

    function handleImageUpload(event) {
      const file = event.target.files[0];
      uploadedImageUrl.value = URL.createObjectURL(file);
    }

    const newPost = ref({
      content: ''
    });

    function addPost() {
      fetch('http://localhost:4000/api/posts/addPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: newPost.value.content })
      })
        .then(response => response.json()) // Parse the response JSON
        .then(parsedData => {
          console.log(parsedData);
          newPost.value.content = '';
        })
        .catch(error => {
          console.error(error);
          // Handle the error appropriately
        });
    }

    onMounted(() => {
      fetchComments();
    });

    return {
      showMenu,
      showCommentInput,
      showSocialIcons,
      isLiked,
      uploadedImageUrl,
      postId,
      userId,
      comment,
      comments,
      toggleCommentInput,
      addComment,
      openSocialMedia,
      toggleLike,
      toggleMenu,
      navigateTo,
      handleImageUpload,
      newPost,
      addPost,
      simulateRegistration
    };
  },
};
</script>


<style scoped>
#text {
  margin-left: 50px;
  padding: 5px;
  border-radius: 20px;
  border-color: none;
  border-style: solid;
  background: transparent;
  width: 350px;
}
#media i {
  margin-top: 10px;  
  margin-right: 20px;
  font-size: 30px;
  cursor: pointer;   
}
#media{
  margin-right:150px;
}
i {
  padding: 4px;
  margin-right: 15px;
  margin-top: 50px;
}

.liked {
  color: red;
}
h1 {
  text-align: center;
  color: white;
  font-size: 40px;
  margin-top: 40px;
}
input {
  width: 320px;
  height: 40px;
  font-size: 16px;
  padding: 0 5px;
}
body {
  background-image: linear-gradient(to bottom right, #0ef, lightblue, blue);
  height: 100vh;
}
.post {
  position: relative;
  background-image: linear-gradient(to bottom right, blue, #0ef, blue, #0ef);
  opacity: 0.8;
  border-radius: 20px;
  width: 500px;
  min-height: 600px;
  opacity: 0.6;
  padding-top: 5px;
  padding-left:10px;
  margin-left: 350px;
  margin-top: 20px;
}
#commentInput{
  margin-top:20px;
  height:50px;
  border-style:solid;
  border-radius:10px;
}
#socialIcons i{
  margin-top:60px;
  margin-right:10px;
  margin-left:10px;
  padding-right:10px;
}
#menuItems {
  position: absolute;
  top: 50px;
  right: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  margin-right:300px;
  margin-top:50px;
}
#menuItems > div {
  cursor: pointer;
  padding: 5px;
  
}
#menu i{
  margin-right:50px;
}
#add{
   position: relative;
    width: 50px;
    height: 40px;
    background-image:linear-gradient(lightblue,blue);
    font-size: 16px;
    color: #fff;
    font-weight: 500;
    cursor: pointer;
    border-radius: 10px;
    border: none;
    outline: none;
    margin-left:200px;
    margin-top:-50px;
}
img{
  width:250px;
  height:250px;
  margin-top:30px;
  margin-left:100px;
  margin-right:250px;
}
#p1{
  margin-left:50px;
  padding:10px;
  border:solid 2px;
  border-radius:10px;
  placeholder:add post;
  background:transparent;
}

#media button {
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

#media button:hover {
  background-color: lightblue;
  color: blue;
}
</style>
