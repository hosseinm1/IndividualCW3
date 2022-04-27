<template>


  <div>
    <link rel = "shortcut icon" href ="#">
    
            <!--  navigation bar -->
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container px-4 px-lg-5">
                    <a class="navbar-brand">{{sitename}}</a>
                <ul>
                    <!-- the checkout button -->
            <div @click="showCheckout" v-if="cartItemCount >= 1" class="btn btn-outline-dark">
                <i class="bi-cart-fill me-1"></i> Checkout
                <span class="badge bg-dark text-white ms-1 rounded-pill">{{cartItemCount}}</span>
            </div>

            <!-- disbaling the checkout button if no items are added -->
            <div class="btn btn-outline-dark disabled" disabled='disabled' v-else>
                <i class="bi-cart-fill me-1"></i> Checkout
            </div>
                </ul>
                </div>
            </nav>
            <header>            

            
        </header>
        
        <div v-if="showLessons">
            <div class="bg-dark py-5">
            <div class="container px-4 px-lg-5 my-5">
                <div class="text-center text-white">
                    <h1 class="display-4 fw-bolder">After School Lessons</h1>
                    <p class="lead fw-normal text-white-50 mb-0">Make your child future bright!</p>
                </div>
            </div>
            </div>
                
                <section id="courses">
                <h1>Club Activities to Choose From</h1> <br><br>

                <main class="container px-4 px-lg-5 mt-5">
                    <lesson-list class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center" :lessons="lessons" @addLesson="addLessonToCart"></lesson-list>
                </main>
                </section>
            </div>
            <div v-else>
                <div>
            <div class="bg-dark py-5">
            <div class="container px-4 px-lg-5 my-5">
                <div class="text-center text-white">
                    <h1 class="display-4 fw-bolder">Checkout</h1>
                    <p class="lead fw-normal text-white-50 mb-0">Grab your seat!</p>
                </div>
            </div>
                </div>
                

                <!-- Displaying the lessons in the cart, if the cart is not empty -->
                <div v-if ="this.cart.length > 0" >
                    <checkout :cart="cart" @removeLesson="removeLessonFromCart"></checkout>
                </div>
                <!-- If all products are removed from cart, button is displayed to take back to the products page -->
                <div v-else>
                    <button @click ="showCheckout()" class="btn btn-outline-dark mt-auto">
                        <span >&nbsp; Back To Lessons</span>
                    </button>
                </div>
            </div>
  </div>
  </div>
</template>

<script>
import LessonList from './components/LessonsList.vue';
import Checkout from './components/CheckoutPage.vue';
export default {
  name: "App",
  //sitename:'After School Club',
  components: {
    LessonList,
    Checkout
  },
  data() {
    return {
      cart: [],
      lessons :[],
      showLessons: true,
    };
  },
   mounted(){            //created function fetches the lessons
    //fetching the lessons from server
    fetch('https://hg423webdevcw2.herokuapp.com/collection/lessons').then( response => {
        response.json().then(json => {
            this.lessons = json;
            console.log(json);
        } )
    });
        
    },
  methods: {
    // showCheckout() {},
    addLessonToCart(lesson) {
     console.log("addLesson event received by the root component.");
      //reduce the spaces by 1
      lesson.numberOfSpace -= 1;
      this.cart.push(lesson);
    },
    showCheckout(){             
        this.showLessons = this.showLessons ? false : true;
    },
    removeLessonFromCart(lesson){
        //increase the spaces by one on the main page
        lesson.numberOfSpace += 1;
        for(let i = 0; i <= this.cart.length; i++){
                if(this.cart[i].id === lesson.id){
                    this.cart.splice(i, 1);
                    break;
                }
        }
    }
    
  },
  computed: {
    //function to return cart length                
    cartItemCount(){
        return this.cart.length || '';
    }
  },
};
</script>