<template>
  <div id="body">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <div class="div">
      <NavigationBar />
      <div class="signup-form">
        <div id="main">
          <h1>Sign up</h1>
          <form @submit.prevent="submitForm">
            <label id="un">Username</label><br>
            <input type="text" v-model="username" placeholder="username" id="name"><i class="fa-solid fa-user"></i><br><br>
            <p v-if="errors.username" class="error">{{ errors.username }}</p>

            <label id="em">Email</label><br>
            <input type="text" v-model="email" placeholder="email" id="email"><i class="fa fa-envelope" aria-hidden="true"></i><br><br>
            <p v-if="errors.email" class="error">{{ errors.email }}</p>

            <label id="cn">Name</label><br>
            <input type="text" v-model="name" placeholder="Name" id="count"><i class="fa-solid fa-user"></i><br><br>
            <p v-if="errors.name" class="error">{{ errors.name }}</p>

            <label id="pa">Password</label><br>
            <input type="password" v-model="password" placeholder="password" id="pw"><i class="fa-solid fa-lock"></i><br><br>
            <p v-if="errors.password" class="error">{{ errors.password }}</p>
            
            <label id="gen">Gender</label><br>
            <input type="text" v-model="gender" placeholder="gender" id="gender"><i class="fa-solid fa-person-half-dress"></i><br><br>
            <p v-if="errors.gender" class="error">{{ errors.gender }}</p>
      
            <input type="checkbox" v-model="agree" name="check" id="check">
            <p id="pp"> I agree</p>
            
            <button type="submit" id="button">Sign up</button>
          </form>
        
        </div>
      </div>
      <h2>Welcome to the LOCOMATE</h2>
      <img src="../assets/aaa.PNG">
    </div>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
import axios from 'axios';

export default {
  components: {
    NavigationBar,
  },
  data() {
    return {
      username: '',
      email: '',
      name: '',
      password: '',
      gender: '',
      agree: false,
      errors: {
        username: '',
        email: '',
        name: '',
        password: '',
        gender: '',
      },
    };
  },
  methods: {
    validateForm() {
      let isValid = true;

      if (!this.username.trim()) {
        this.errors.username = 'Username is required.';
        isValid = false;
      } else {
        this.errors.username = '';
      }

      if (!this.email) {
        this.errors.email = 'Email is required.';
        isValid = false;
      } else if (!this.isValidEmail(this.email)) {
        this.errors.email = 'Please enter a valid email address.';
        isValid = false;
      } else {
        this.errors.email = '';
      }

      if (!this.name) {
        this.errors.name = 'Name is required.';
        isValid = false;
      } else {
        this.errors.name = '';
      }

      if (!this.password) {
        this.errors.password = 'Password is required.';
        isValid = false;
      } else if (this.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters.';
        isValid = false;
      } else {
        this.errors.password = '';
      }

      if (!this.gender) {
        this.errors.gender = 'Gender is required.';
        isValid = false;
      } else {
        this.errors.gender = '';
      }

      if (!this.agree) {
        this.errors.agree = 'Please agree to the terms.';
        isValid = false;
      } else {
        this.errors.agree = '';
      }

      return isValid;
    },

    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    async submitForm() {
      if (this.validateForm()) {
        try {
          const response = await axios.post('http://localhost:4000/api/users/register', {
            name: this.name,
            email: this.email,
            username: this.username,
            password: this.password,
            gender: this.gender,
          });

          if (response.status === 201) {
            console.log(response.data.message);
            this.navigateToLogin();
          } else {
            console.log('User registration failed.');
          }
        } catch (error) {
          console.error(error);
        }
      }
    },

    navigateToLogin() {
      this.$router.push('/'); 
    },
  },
};
</script>
<style  scoped>
.signup-form{
      position: relative;
      width: 350px;
      min-height: 400px;
      border-radius: 20px;
      padding: 40px;
      overflow: hidden;
      background-color:white;
      opacity:0.6;
      margin-left:50px;
      margin-top:10px;
}

h1{
      text-align:center;
      color:blue;
      font-size:40px;
      margin-top:-10px;
}

#un{
      font-size:18px;
      margin-bottom:100px;
      margin-top:20px;
      margin-left:30px;
}
#em{
     font-size:18px;
      margin-bottom:100px;
      margin-top:20px;
      margin-left:30px;
}
#cn{
      font-size:18px;
      margin-bottom:100px;
      margin-top:10px;
      margin-left:30px;
}

#ph{
      font-size:20px;
      margin-bottom:100px;
      margin-top:20px;
      margin-left:30px;
}
#pa{
      font-size:18px;
      margin-bottom:100px;
      margin-top:20px;
      margin-left:30px;
}
#gen{
      font-size:18px;
      margin-bottom:100px;
      margin-top:20px;
      margin-left:30px;
}

input{
    width: 320px;
    height: 20px;
    font-size: 16px;
    padding: 0 5px;  
}

#name{
     border-radius: 20px;
      border-color: none;
      border-style:solid;
      background: transparent;
      margin-left:10px;
}
#count{
     border-radius: 20px;
      border-color: none;
      border-style:solid;
      background: transparent;
      margin-left:10px;
}
#pw{
    border-radius: 20px;
      border-color: none;
      border-style:solid;
      background: transparent;
      margin-left:10px;
}
#gender{
     border-radius: 20px;
      border-color: none;
      border-style:solid;
      background: transparent;
      margin-left:10px;
}

#button{
    position: relative;
    width: 320px;
    height: 40px;
    background-image:linear-gradient(lightblue,blue);
    font-size: 16px;
    color: #fff;
    font-weight: 500;
    cursor: pointer;
    border-radius: 30px;
    border: none;
    outline: none;
}

#uname{
      border-radius: 20px;
      border-color: none;
      border-style:solid;
      background: transparent;
      margin-left:10px;
}
#email{
      border-radius: 20px;
      border-color: none;
      border-style:solid;
      background: transparent;
      margin-left:10px;
}
#coun{
      border-radius: 20px;
      border-color: none;
      border-style:solid;
      background: transparent;
      margin-left:10px;
}
#phone{
      border-radius: 20px;
      border-color: none;
      border-style:solid;
      background: transparent;
      margin-left:10px;
}
#pass{
      border-radius: 20px;
      border-color: none;
      border-style:solid;
      background: transparent;
      margin-left:10px;
}
#check{
      width:15px;
      margin-top:30px;
      margin-left:30px;
}
 
#pp{
      margin-left:50px;
      margin-top:-25px;
      margin-bottom:20px;
}

form{
      align-items: center;
}
body{
   background-image: linear-gradient(to bottom right,#0ef,lightblue,blue);
    height:150vh;
}

 h2{
      margin-left:550px;
      margin-top:-550px;
      padding-left:10px;
      font-size:35px;
      color:blue;
 }
 i{
    padding: 4px; 
    float: right;
    margin-top: -25px;
    margin-right:15px;
 }

 nav a{
      text-decoration:none;
      margin-right:20px;
      margin-left:30px;
      font-size:18px;
 }
 nav{
      background-color:lightblue;
      padding:10px;
      position: relative;
      border-radius:10px;
      
 }
 
 nav :hover{
      background-color:white;
 }

 .error {
  color: red;
  margin-top: 0px;
}

#p1{
      margin-top:-20px;
      margin-left:3px;

}
#p1 a{
      text-decoration:none;
}
#p1 a:hover{
      color:red;
      text-decoration:underline;
      font-weight:500px;
}

img{
      margin-left:600px;
      margin-top:10px;
      width:500px;
      height:350px;
      position: relative;
      background-image:linear-gradient(lightblue,blue);
      opacity:0.8;
      border-radius: 20px;
}
.div{
      position: relative;
      background-image: linear-gradient(to bottom right,blue,#0ef,lightblue);
      opacity:0.8;
      border-radius: 20px;
      width:95%;
      min-height:800px;
      opacity:0.6;
      padding-top:5px;
      margin-left:25px;
}

#ge{
  dispaly:inline;
}


</style>