<template>
    <div class = 'header'>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container px-4 px-lg-5">
                <a class="navbar-brand"><routher-link :to = "{name: 'Home'}"></routher-link>{{sitename}}</a>
                
                    <form v-if="this.cart.length > 0"   class="d-flex">
                        <div v-on:click="showCheckout" class="btn btn-outline-dark" >
                            <i class="bi-cart-fill me-1"></i>
                            checkout
                            <span class="badge bg-dark text-white ms-1 rounded-pill">{{this.cart.length}}</span>
                        </div>
                    </form>
                </div>
        </nav>

    <div class="container px-4 px-lg-5 my-5">
      <div class="text-center text-white">
        <h1 class="display-4 fw-bolder">After School Lessons</h1>
        <p class="lead fw-normal text-white-50 mb-0">Make your child future bright!</p>
      </div>
    </div>
        
</div>
     
</template>

<script>
export default {
    name: 'my-header',
    data(){
        return{
            sitename: 'After School Lessons',
        }
    },

    props: ['cartCount'],
    methods: {
        showCheckout(){
            this.$router.push({name: 'Checkout'})
        },

        cartCount: function(id){
                        let count = 0;
                        for (let i = 0; i < this.cart.length; i++) {
                            if (this.cart[i] === id) {
                                count++;
                            }
                            
                        }
                        return count;
                    },
    },

}
</script>