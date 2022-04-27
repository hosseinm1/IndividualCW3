<template>

    <div>
        <link rel="stylesheet" type="text/css" href="style.css">
        <div  v-for="lesson in lessons" :key="lesson.id" class="col mb-5">

          <div class="card h-100">
            <!--product image -->
            <div class="card-body p-4">
            <img class="card-img-top"  v-bind:src="lesson.image" width="200" height="200">
            
          
            <!-- Displaying the product details -->
            <p class="fw-bolder">{{lesson.subject}}</p>
            <p>Location: {{lesson.location}}</p>
            <p>Spaces Left: {{lesson.numberOfSpace}}</p>
            <p>{{lesson.price}} AED </p>
            

            <!--  "Add to Cart" Button -->
            <button class="btn btn-outline-dark mt-auto" @click="addLessonToCart(lesson)" v-if="canAddToCart(lesson)">Add to Cart</button>

            <!-- Disabling the button if the lessons cannot be added -->
            <button class="btn btn-outline-dark mt-auto" disabled = "disabled" v-else>Add to Cart</button>

            <!-- Showing the remaining spaces for the lesson -->
            <span  v-if ="lesson.numberOfSpace == 0">All Out!</span>
            <span  v-if ="lesson.numberOfSpace < 5 && lesson.numberOfSpace > 0">Only {{lesson.numberOfSpace}} left!</span>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "ProductList",
  props: ['lessons'],
  data() {
      
    return {
        //fetching the lessons from server
    // lessons: [],
    };
  },
//   mounted(){            //created function fetches the lessons
//     //fetching the lessons from server
//     fetch('https://cst3145cwhadassah.herokuapp.com/collection/lessons').then( response => {
//         response.json().then(json => {
//             this.lessons = json;
//             console.log(json);
//         } )
//     });
        
//     },
  methods: {
    addLessonToCart(lesson) {
      console.log("added product", lesson.id);
      this.$emit('addLesson',lesson);
    },
    canAddToCart(lesson){
      console.log(lesson.numberOfSpace);
        return lesson.numberOfSpace > 0;
    },
    fetchlessons(){
        //fetching the lessons from server
    fetch('https://hg423webdevcw2.herokuapp.com/collection/lessons').then(
        function(response){
            response.json().then(
                function(json){
                    return json;
                });
        });
    }
  },
};
</script>