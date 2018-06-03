const ProductPageComponent = {
  props:["slice"],
    template: `

    <div class="container">
    <div class="row">
    <div class="searchedProd" v-if="!slice "id="inputBlock">
          <label>Sök
            <input class="search" placeholder="sök produkt" v-model="searchItem" type="text" />
          </label>
          <div v-if="searchItem" v-for="product in filteredProducts">
          </div> 
       </div>
        <product
          v-for="product in categoryFilteredProducts"
          v-bind:item="product"
          v-bind:key="product._id"
          ></product>       
      </div>
      </div>
    `
    ,
  
    created(){
      http.get('/rest/products').then((response) => {
    // Tar ut de 3 senaste produkterna
      if(this.slice){
	    this.products = response.data.splice(- Number(this.slice));
      } else {
      	this.products = response.data;
    } 

    http.get('/rest/category').then((response) =>{
      this.categories = response.data;
    });
 
      }).catch((error) => {
        console.error(error);
      });
    },

    data(){
      return{
        products: [],
        categories:[],
        searchItem:[]
      }
    },

    computed:{
      filteredProducts: function(){
        return this.products.filter((product)=> {
          return product.name.match(this.searchItem);
        });
      },

      categoryFilteredProducts: function(){
        console.log("this.$route.params.category", this.$route.params.category)
      
        return this.filteredProducts.filter((product)=>{
  
          if(!this.$route.params.category){
            return true;
          }
          for(let category of product.category){
            console.log(category.name, this.$route.params.category);
            if(category.name == this.$route.params.category){
              
              return true;
            }
          }
        });
      }
    }
  }