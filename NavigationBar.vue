<template>
  <div id="navbar">
    <nav>
      <span id="lo">LOCOMATE</span>
      <span>
        <router-link to="/">Sign In</router-link>
        <router-link to="/signup">Sign Up</router-link>
        <router-link to="/image-upload">Profile</router-link>
      </span>
    </nav>
  </div>
</template>

<style scoped>
  nav a{
      text-decoration:none;
      margin-right:20px;
      margin-left:30px;
      font-size:18px;
      padding:10px;
 }
 nav{
      background-color:lightblue;
      padding:10px;
      position: relative;
      border-radius:20px; 
      font-size:24px; 
      margin-left:5px;
      margin-right:5px; 
 }
 nav a:hover{
      background-color:white;
      font-size:20px;
 }
  span {
    margin-left:550PX;
    margin-right: 20px;
  }
  #lo{
    margin-left:20px;
  }
 
</style>

<script>
export default {
    
}
</script>
