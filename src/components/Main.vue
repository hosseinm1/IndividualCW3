<template>
    <div>
        <my-header :cartCount="cartCount"></my-header>


        <!----------------            Section                ------------->
        <div>
            <p><input type="radio" id="subject" value="Subject" v-model="sort.first">
                <label for="subject">Subject</label>
                <input type="radio" id="location" value="Location" v-model="sort.first">
                <label for="location">Location</label>
                <input type="radio" id="price" value="Price" v-model="sort.first">
                <label for="price">Price</label>
                <input type="radio" id="availability" value="Availability" v-model="sort.first">
                <label for="availability">Availability</label></p>
            <p><input type="radio" id="ascending" value="Ascending" v-model="sort.second">
                <label for="ascending">Ascending</label>
                <input type="radio" id="descending" value="Descending" v-model="sort.second">
                <label for="descending">Descending</label></p>
        <section class="py-5">
            
            <div class="container px-4 px-lg-5 mt-5">
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    <!-----------MY PRODUCTS----------->
                    <div  :v-for = "lesson in sortedLessons"   class="col mb-5">
                        
                        <div card h-100>
                            <!-- Product image-->
                            <!-- <img class="card-img-top" v-bind:src="lesson.image"  width="100" height="100" /> -->
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder" v-text="lesson.subject"></h5>
                                    <h6 class="fw-bolder" v-text= "lesson.location"></h6>
                    
                                    <h6 class="fw-bolder">Space: {{lesson.numberOfSpace}}</h6>
                                    <!-- Product price-->
                                    {{lesson.price}}
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <button class="btn btn-outline-dark mt-auto"  v-if="canAddToCart(lesson)" v-on:click="addToCart(lesson)" :class="text-center"  >Add to cart</button>
                                <button class="btn btn-outline-dark mt-auto" disabled='disabled' v-else>Add to cart</button>

                                <span v-if='lesson.numberOfSpace === cartCount(lesson.id)'>All out!</span>
                                <span v-else-if="lesson.numberOfSpace - cartCount(lesson.id) < 5"> Only
                                    {{lesson.numberOfSpace - cartCount(lesson.id)}} left! </span>
                                <span v-else>Add now!</span> 
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        
        </section>
        
        </div>
           <!--------------END OF MY PRODUCTS-------------->
    </div>

</template>

<script>
import Header from './Header.vue';
export default {
    name: 'iHome',
    props: ['lesson'],
    data() {
        return {
        sitename:'Home | After School',
        lessons: [],
        cart: [],
        //showLessons: true,
        sort:{
                    first: 'Subject',
                    second: 'Ascending',
                    },

        }
    },
    
        created:function(){
            console.log('Fetching data form server..')

            fetch('https://hg423webdevcw2.herokuapp.com/collection/lessons').then(
                function (res) {
                    res.json().then(
                            function (json) {       
                                website.lessons = json;
                                }
                            );
                        }
                    )
                },
        components: {Header},
        methods: {
            addToCart: function(lesson){
                        console.log("comes here add to cart");
                        this.cart.push(lesson.id)

                        
                    },

            canAddToCart: function(lesson){
                        console.log("comes here can add to cart");
                        console.log(lesson.numberOfSpace > this.cartCount(lesson.id))
                        return lesson.numberOfSpace > this.cartCount(lesson.id)
                        
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

    computed: {
                    sortedLessons: function(){
                        if (this.sort.first == "Subject" && this.sort.second == "Ascending") {
                        function compare(a, b) {
                            if (a.subject > b.subject) return 1;
                            if (a.subject < b.subject) return -1;
                            return 0;
                        }
                        return this.lessons.sort(compare);
                    }
                    if (this.sort.first == "Subject" && this.sort.second == "Descending") {
                        function compare(a, b) {
                            if (a.subject < b.subject) return 1;
                            if (a.subject > b.subject) return -1;
                            return 0;
                        }
                        return this.lessons.sort(compare);
                    }
                    if (this.sort.first == "Location" && this.sort.second == "Ascending") {
                        function compare(a, b) {
                            if (a.location > b.location) return 1;
                            if (a.location < b.location) return -1;
                            return 0;
                        }
                        return this.lessons.sort(compare);
                    }
                    if (this.sort.first == "Location" && this.sort.second == "Descending") {
                        function compare(a, b) {
                            if (a.location < b.location) return 1;
                            if (a.location > b.location) return -1;
                            return 0;
                        }
                        return this.lessons.sort(compare);
                    }
                    if (this.sort.first == "Price" && this.sort.second == "Ascending") {
                        function compare(a, b) {
                            if (a.price > b.price) return 1;
                            if (a.price < b.price) return -1;
                            return 0;
                        }
                        return this.lessons.sort(compare);
                    }
                    if (this.sort.first == "Price" && this.sort.second == "Descending") {
                        function compare(a, b) {
                            if (a.price < b.price) return 1;
                            if (a.price > b.price) return -1;
                            return 0;
                        }
                        return this.lessons.sort(compare);
                    }
                    if (this.sort.first == "Availability" && this.sort.second == "Ascending") {
                        function compare(a, b) {
                            if (a.availability > b.availability) return 1;
                            if (a.availability < b.availability) return -1;
                            return 0;
                        }
                        return this.lessons.sort(compare);
                    }
                    if (this.sort.first == "Availability" && this.sort.second == "Descending") {
                        function compare(a, b) {
                            if (a.availability < b.availability) return 1;
                            if (a.availability > b.availability) return -1;
                            return 0;
                        }
                        return this.lessons.sort(compare);
                    }
                }
    }

}     
</script>
