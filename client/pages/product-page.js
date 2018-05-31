
const ProductPageComponent = {
  props:["slice"],
    template: `
    <div class="container">
    <div class="row">
    <category
          v-for="category in categories"
          v-bind:cat="category"
          v-bind:key="category._id"
          ></category> 
    <search 
    v-if="!slice"
    ></search> 
          
        <product
          v-for="product in products"
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
    this.products = response.data;
      if(this.slice){
	    this.products = response.data.splice(- Number(this.slice));
      } else {
      	this.products = response.data;
    }  

    http.get('/rest/category').then((response) =>{
      this.categories = response.data;
      console.log("Produkterna finns" + this.categories);
    });
  //  Kod för att filtrera och söka vidare, ex för att viosa 3 första produkterna på första sidan
        //      this.products = response.data.splice(0,1);
  
      }).catch((error) => {
        console.error(error);
      });
    },


    data(){
      return{
        products: [],
        categories:[]

      }
    }
  }