const OrderAdminComponent = {
    template: `
      <div class="card-body">
        <h1>{{title}}</h1>
        <ul>
          <order-item v-if="!loading"
            v-for="order in orders"
            v-bind:order="order"
            v-bind:key="order._id">
          </order-item>
        </ul>
        
        </div>
    `,
    created(){
      // ladda in litta data
      this.loading = true;
      http.get('/rest/order').then(response => {
        console.log('orders', response.data)
        this.orders = response.data;
        this.loading = false;
      }).catch(e => {
        console.error(e);
        this.loading = false;
      });
    },
    data(){
      return{
        loading: false,
        orders: [],
        title: "Ordrar"
      }
    }
  }