const MenuComponent = {
props:['cat'],
    template: `
      <div class="nav">
      <ul class="nav-item">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Hem</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/products">Produkter</router-link>
        </li>


        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Kategorier
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <category class="dropdown-item" href="#"
          v-for="category in categories"
          v-bind:cat="category"
          v-bind:key="category._id"
          ></category>
        </div>
      </li>



        <li class="nav-item">
          <router-link class="nav-link" to="/admin">Admin</router-link>
       </li>
        </ul>

        <ul class="nav-item">
        <router-link class="nav-link" to="/login"><i class="fas fa-user fa-2x"></i>

        </router-link>
      </li>
      <li class="nav-item" id="cartLink">
        <router-link class="nav-link" to="/cart"><i class="fas fa-shopping-bag fa-2x"></i></router-link>
      </li>
      </ul>
      </div>
    `,
   async created(){
    /*  
    http.get('/rest/category').then((response) =>{
      this.categories = response.data;
      console.log("Produkterna finns" + this.categories);
    });*/
    let categories = await http.get('/rest/category');
        if(categories.data)
        {
          this.categories = categories.data;
        }
    }
    ,
    data(){
    return{
      categories:[]

    }
  }
}

  