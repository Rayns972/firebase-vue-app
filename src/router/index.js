import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import AddClient from '@/components/AddClient'
import Articles from '@/components/Articles'
import EditClient from '@/components/EditClient'
import Order from '@/components/Order'
import firebase from 'firebase';

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/articles',
      name: 'Articles',
      component: Articles,
      meta: {
        requiresAuth: true
      }
    },
    
    {
      path: '/add-client',
      name: 'AddClient',
      component: AddClient,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      meta: {
        requiresAuth: true
      }
    },
  {
    path: '/edit-client/:client_slug',
    name: 'EditClient',
    component: EditClient,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresGuest: true
    }
  }
  ]
});

router.beforeEach((to, from, next) => {
//check 
if(to.matched.some(record => record.meta.requiresAuth)) {
  if(!firebase.auth().currentUser){
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    });
   } else {
    next();
   }
  } else if(to.matched.some(record => record.meta.requiresGuest)) {
    if(firebase.auth().currentUser){
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
     } else {
      next();
     }
  } else{
    next();
  }
});

export default router;



