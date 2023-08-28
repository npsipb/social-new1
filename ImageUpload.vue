<template>
  <div>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <div class="post">
      <h1>Edit Your Profile</h1>
      <div class="profile-icon-container">
        <i class="fas fa-user-cog" @click="toggleDropdown"></i>
        <div v-if="isDropdownOpen" class="dropdown">
          <router-link to="/signup">Sign Up</router-link>
          <router-link to="/">Log In</router-link>
          <router-link to="/addpost">Add Post</router-link>
        </div>
      </div>

      <input type="file" id="p1" @change="handleImageUpload">
      <img v-if="uploadedImageUrl" :src="uploadedImageUrl" alt="Uploaded Image" class="uploaded-image">
    </div>
  </div>
</template>



<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const newPhoto = ref('');
    const uploadedImageUrl = ref(null);
    const isDropdownOpen = ref(false);

    async function uploadPhoto() {
      if (!newPhoto.value) {
        return;
      }

      try {
        const formData = new FormData();
        formData.append('profilePicture', newPhoto.value);

        const response = await axios.post('http://localhost:4000/api/uploads/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log(response.data.message);
        uploadedImageUrl.value = null;
      } catch (error) {
        console.error(error);
      }
    }

    function handleImageUpload(event) {
      const file = event.target.files[0];
      newPhoto.value = file;
      uploadedImageUrl.value = URL.createObjectURL(file);
    }

    function toggleDropdown() {
      isDropdownOpen.value = !isDropdownOpen.value;
    }

    return {
      newPhoto,
      uploadedImageUrl,
      uploadPhoto,
      handleImageUpload,
      toggleDropdown,
      isDropdownOpen,
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
  border-radius:50%;
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
i{
    padding: 4px; 
    float: right;
    margin-top: -67px;
    margin-left:10px;
    margin-right:60px;
    font-size:30px;

 }

 .dropdown {
  position: absolute;
  left: 20px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: flex;
  flex-direction: column;
  margin-left:390px;
  margin-top:-30px;
  border-radius:10px;
  padding: 10px;
  width:100px;
  height:150px;
}

.dropdown a {
  text-decoration: none;
  color: #333;
  margin-top:20px;
}

.dropdown a:hover {
  background-color: #f5f5f5;
  font-size:18px;
  color:green;
}


</style>