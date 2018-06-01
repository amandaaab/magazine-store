const SearchComponent = {
    template: `
      <div class="searchedProd" id="inputBlock">
      
          <label>Sök
            <input class="search" placeholder="sök produkt" v-model="searchItem" type="text" />
          </label>

          <div v-if="searchItem" v-for="product in filteredProducts">
                <h2>{{product.name}}</h2>
                <p>{{product.price}}</p>
          </div> 
       </div>
    `,
    
    created(){
      http.get('/rest/products').then((response) => {
        this.products = response.data;
  
      }).catch((error) => {
        console.error(error);
      });
    },
    data(){
      return{
    
       
      }
    },
    computed: {
      filteredProducts: function(){
        return this.products.filter((product)=> {
          return product.name.match(this.searchItem);
        });
      }


    }
}