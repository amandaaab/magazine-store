const CartComponent = {
    template: `
      <div class="card-body">
        <h2 class="mb-5">{{title}}</h2>
        <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th>Vara</th>
            <th>Pris</th>
            <th>Moms</th>
            <th>Antal</th>
          </tr>
          </thead>
          <cart-item v-if="!loading"
            v-for="item in items"
            v-bind:item="item"
            v-bind:key="item._id">
          </cart-item>
        </table>
      </div>
    `,
    created(){
      // ladda in litta data
      this.loading = true;
      http.get('/rest/cart').then(response => {
        console.log('items', response.data.items)
        this.items = response.data.items;
        this.loading = false;
      }).catch(e => {
        //console.error(e);
        this.loading = false;
      });
    },
    data(){
      return{
        loading: false,
        items: [],
        title: "Varukorg"
      }
    }
  }