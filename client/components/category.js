const CategoryComponent = {
  props: ["cat"],
    template: `
   
   <div>
     <h1>{{cat.name}}</h1> 
   </div>
    `
   /* created(){
        // ladda in litta data
        this.loading = true;
        http.get('/rest/category').then(response => {
          console.log('category', response.data.categories)
          this.items = response.data.categories;
          this.loading = false;
        }).catch(e => {
          //console.error(e);
          this.loading = false;
        });
      },
      data(){
        return{
          loading: false,
          category: [],
          title: "Varukorg"
        }
      }*/
    }