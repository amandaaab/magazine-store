const CategoryComponent = {
  props: ["cat"],
    template: `
   
   <router-link :to="'/products/' + cat.name" class="col-sm-3 mt-4">
     {{cat.name}} 
   </router-link>
    `
}