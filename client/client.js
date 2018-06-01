Vue.component('product', ProductComponent);// skapar element som heter product, blir en komponent, komponenten ligger i components/product.js
Vue.component('hello', helloComponent);
Vue.component('register', registerComponent);
Vue.component('login', loginComponent);
Vue.component('cart-item', CartItemComponent);
Vue.component('cart', CartComponent);
Vue.component('home-page', HomePageComponent);
Vue.component('product-page', ProductPageComponent);
Vue.component('cart-page', CartPageComponent);
Vue.component('login-page', LoginPageComponent);
Vue.component('nav-menu', MenuComponent);
Vue.component('search', SearchComponent);
Vue.component('category', CategoryComponent);
Vue.component('admin-page', AdminPageComponent);
Vue.component('product-admin', ProductAdminComponent);
Vue.component('order-admin', OrderAdminComponent);
Vue.component('order-item', OrderItemComponent);

const http = axios; // using axios 3rd party XHR/REST lib

const router = new VueRouter({
  mode: 'history', // html5 popstate, alternatively: 'hash'
  base: '/', // set the correct base
  routes: [ // our frontend routes
    { path: '/', component: HomePageComponent },
    { path: '/products/:category?', component: ProductPageComponent},
    { path: '/cart', component: CartPageComponent},
    { path: '/login', component: LoginPageComponent},
    { path: '/admin', component: AdminPageComponent }
  ]
});

let app = new Vue({
  el: "#app", //Hämta element by id
  router,
  created(){
    // ladda in litta data
    http.get('/rest/products').then(response => {
      this.products = response.data;
    }).catch(e => {
      console.error(e);
    })
  },
  data(){
    return {
      products: [],
      categories: []
    }
  }
});
