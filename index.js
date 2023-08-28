import { createRouter, createWebHistory } from 'vue-router';

import AddPost from '@/views/AddPost.vue';
import LoginForm from '@/views/LoginForm.vue';
import SignupForm from '@/views/SIgnupForm.vue'; 
import ImageUpload from '@/views/ImageUpload.vue';
import Home from '@/views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'LoginForm',
    component: LoginForm,
  },
  {
    path: '/addpost', 
    name: 'AddPost',
    component: AddPost,
  },
  {
    path: '/signup',
    name: 'SignupForm',
    component: SignupForm,
  },
  {
    path: '/image-upload', 
    name: 'ImageUpload', 
    component: ImageUpload, 
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
