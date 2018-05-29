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

const http = axios; // using axios 3rd party XHR/REST lib

const router = new VueRouter({
  mode: 'history', // html5 popstate, alternatively: 'hash'
  base: '/', // set the correct base
  routes: [ // our frontend routes
    { path: '/', component: HomePageComponent },
    { path: '/products', component: ProductPageComponent},
    { path: '/cart', component: CartPageComponent},
    { path: '/login', component: LoginPageComponent}
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
    });
  },
  data(){
    return {
      brand: "Selmaphone",
      products: []
    }
  }
});
