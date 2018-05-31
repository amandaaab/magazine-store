const ProductComponent = {

  props: ['item'],

  template: `
 
  <div class="col-lg-3 m-3" id="productCard">
  
    <div class="card-body text-center">
      <h4 class="card-title">{{item.name}}</h4>
      <h6 class="card-text">{{item.price}}kr</h6>
      <p class="card-text" v-html="item.description"></p>
      <button class="btn btn-success" v-on:click="addToCart">Lägg i varukorg</button>
      </div>
   
    </div>
  `,

  data() {
    return {
      _id: '',
      message: '',
      loading: false,
    };
  },

  methods: {
    addToCart() { // register
      this.loading = true;
      http.post('/rest/cart', {
        product: this.item._id,
        amount: 1,
      }).then(response => {
        console.log(response);
        this.loading = false;
        if(response.data.msg) {
          this.message = 'Lade till i varukorgen';
        } else {
          this.message = 'Error 1';
        }
      }).catch(error => {
        this.loading = false;
        this.message = 'Error 2';
      });
    }
  },

}