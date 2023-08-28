<template>
  <div id="body">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <div class="div">
      <NavigationBar />
      <div class="login-form">
        <div id="main">
          <h1>Sign in</h1>
          
          <form @submit.prevent="submitForm">
            <label id="un">Username/Email</label><br />
            <input type="text" v-model="email" placeholder="username/email" id="uname"/><i class="fa-solid fa-user"></i><br />
            <span class="error-message" v-if="errors.email">
              {{ errors.email }}
            </span><br /><br />

            <label id="pa">Password</label><br />
            <input type="password" v-model="password" placeholder="password" id="pass"/><i class="fa-solid fa-lock"></i><br />
            <span class="error-message" v-if="errors.password">
              {{ errors.password }}
            </span><br />

            <input type="checkbox" v-model="agree" name="check" id="check" />
            <p id="pp">I agree</p>
            <p class="form-text">
              Don't have an account? <router-link to="/signup">Signup</router-link>
            </p>

            <button type="submit" id="button">Sign in</button>
            <span class="error-message" v-if="errorMessage">
              {{ errorMessage }}
            </span>
          </form>
         
        </div>
      </div>
      <h2>Welcome to the LOCOMATE</h2>
      <img src="@/assets/signin.PNG" alt="Sign In" />
    </div>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
import router from '@/router';
import axios from 'axios';

export default {
  components: {
    NavigationBar,
  },
  data() {
    return {
      email: '',
      password: '',
      agree: false,
      errorMessage: '',
      errors: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    validateForm() {
      this.errors.email = this.email === '' ? 'Email is required.' : '';
      this.errors.password = this.password === '' ? 'Password is required.' : '';
      if (!this.agree) {
        this.errorMessage = 'Please agree to the terms.';
      } else {
        this.errorMessage = '';
      }
      return !this.errors.email && !this.errors.password && this.agree;
    },
    
    async submitForm() {
      if (this.validateForm()) {
        this.errorMessage = '';

        try {
          const response = await axios.post('http://localhost:4000/api/auth/login', {
            email: this.email,
            password: this.password,
          });

          if (response.status === 200) {
            router.push('/home');
          } else {
            this.errorMessage = 'Invalid email or password.';
          }
        } catch (error) {
          this.errorMessage = 'Error occurred during login.';
          console.error(error);
        }
      }
    },
  },
};
</script>

<style >
.login-form{
      position: relative;
      width: 350px;
      min-height: 350px;
      border-radius: 20px;
      padding: 40px;
      background-color:white;
      opacity:0.6;
      margin-left:50px;
      margin-top:10px;
}

h1{
      text-align:center;
      color:blue;
      font-size:40px;
}

#un{
      font-size:20px;
      margin-bottom:100px;
      margin-top:20px;
      margin-left:30px;
}
#pa{
      font-size:20px;
      margin-bottom:100px;
      margin-top:20px;
      margin-left:30px;
}

input{
    width: 320px;
    height: 40px;
    font-size: 16px;
    padding: 0 5px;
    
    
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
#pass{
      border-radius: 20px;
      border-color: none;
      border-style:solid;
      background: transparent;
      margin-left:10px;
}
#check{
      width:15px;
      margin-top:20px;
      margin-left:30px;
}
#pp{
      margin-left:50px;
      margin-top:-35px;
      margin-bottom:20px;
}

form{
      align-items: center;
}

 h2{
      margin-left:550px;
      margin-top:-470px;
      padding-left:10px;
      font-size:40px;
      color:blue;
 }
 i{
    padding: 4px; 
    float: right;
    margin-top: -35px;
    margin-right:15px;
 }

 
 .error-message {
  color: red; 
  font-size: 14px; 
  margin-top: 5px; 
}

img{
      margin-left:600px;
      margin-top:-200px;
      width:500px;
      height:350px;
      position: relative;
      background-image:linear-gradient(lightblue,blue);
      opacity:0.8;
      border-radius: 20px;
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
a{
  text-decoration:none;
  margin-top:50px;
  margin-left:20px;
}

a:hover{
       color:red;
       text-decoration:underline;
       font-weight:500px;
}

.div{
      position: relative;
      background-image: linear-gradient(to bottom right,blue,#0ef,lightblue);
      opacity:0.8;
      border-radius: 20px;
      width:95%;
      height:600px;
      opacity:0.6;
      padding-top:5px;
      margin-left:25px;
      margin-top:20px;
}
body{
      background-image: linear-gradient(to bottom right,#0ef,blue);
}

</style>