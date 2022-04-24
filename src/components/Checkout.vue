<template>
    <div>
        <my-header :cartCount = "cartCount"></my-header> <!--mybe "cart"-->

        <section>

        <div :v-for='item in cart'>
            <div :v-for='lesson in lessons'>
                <div v-if='lesson.id === item'>
                    
                    <img v-bind:src="lesson.image" alt="" width="100" height="100">
                    <h2 v-text="lesson.subject"></h2>
                    <p>Location: {{lesson.location}} </p>
                    <p>Price:{{lesson.price}}</p>
                    

                    
                    <button v-on:click="removeItem(item,cart.indexOf(item))">Remove</button>
                    
                </div>
            </div>
        </div>

        <form>
            
            <div class="form-group">
              <label for="firstName">First Name:</label>
              <input id= "firstName" class="form-control" v-model = "order.firstName"/>
              

              <label for="lastName">Last Name:</label>
              <input id="lastName" v-model = "order.lastName"/>
            
              <label for="phone">Phone:</label>
              <input id="phone" v-model="order.phone">

              <label for="email">Email:</label>
              <input id="email" type="email" v-model="order.email">
            
            
            <button v-on:click = 'submitForm(cart)' class="btn btn-primary">Submit</button>
            </div>
          </form>
        
        </section>
    </div>

    

</template>

<script>
import Header from './Header.vue';
export default {
    name: 'Checkout',
    props: ['cartCount'],

    data() {
        return {
            order: {
                firstName: '',
                lastName: '',
                phone:'',
                email:'',
                products:[],
            },
        }
        
    },

    //components
    components: {Header},
    //Methods

    methods: {
        submitForm() {
                    
                    this.order.products.push(cart)
                        
                        var cPhone = document.getElementById("phone").value;
                        var cFName = document.getElementById("firstName").value;
                        var cLName = document.getElementById("lastName").value;
                        var cEmail = document.getElementById("emial").value;
                        var cItem = this.order.products[0];

                        const newOrder = { Name: cFName , lastName: cLName, email: cEmail,phone: cPhone,Item: cItem  };
                        alert(newOrder);
                        // set the url to your server and route
                        fetch('https://hg423webdevcw2.herokuapp.com/collection/order', {
                            method: 'POST', // set the HTTP method as 'POST'
                            headers: {
                                'Content-Type': 'application/json', // set the data type as JSON
                            },
                            body: JSON.stringify(newOrder), // need to stringify the JSON object
                        })
                        .then(response => response.json())
                        .then(responseJSON => {
                        });

                        for (let i = 0; i < cItem.length; i++) {
                            var itemId = cItem[i]._id;
                            var oldSpace=cItem[i].numberOfSpace;

                            var newSpace=oldSpace-1;

                            const updateLesson = { numberOfSpace: newSpace };

                            fetch("https://hg423webdevcw2.herokuapp.com/collection/lessons"+itemId, {
                            method: 'PUT', // set the HTTP method as 'PUT'
                            headers: {
                                'Content-Type': 'application/json', // set the data type as JSON 
                            },
                            body: JSON.stringify(updateLesson), // need to stringify the JSON object
                            })
                            .then(response => response.json())
                            .then(responseJSON => {
                            });

                            alert('Order submitted!')
                        }
        },
         removeItem(lessons, index) {
            this.cart.splice(index, 1); //Removing item from cart and readding back to lesson attribute:space.
            lessons.numberOfSpace += 1;
            
        },
    },//May be Extra Bracket OR collon
}
</script>