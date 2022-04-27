<template>

     <div>
        <div v-for='lesson in cart' :key="lesson.id">

                    <!-- Binding an image -->
                    <div>
                        <img v-bind:src="lesson.image" alt="Lesson Image">
                    </div>

                    <!-- Adding the details -->
                    <div><p>{{lesson.subject}}</p></div>
                    <div>Location: {{lesson.location}}</div>
                    <div>{{lesson.price}} AED </div>
                    

                    <!-- Adding a "Remove" button to remove the lesson from cart -->
                    <button class="btn btn-outline-dark" @click ="remove(lesson)" >
                        Remove 
                    </button>
                <!-- End of lesson card -->
        </div>
    <!-- Checkout Form -->
        <div>
            <strong>{{successfulCheckout}}</strong>
            <!-- Name input field -->
            <strong>Name: </strong>
            <span>
                <input class="form-control" id="cName" type="text" v-model="name"  placeholder="Enter Name..." v-on:keypress="isLetter($event)">
            </span>
            
            <!-- Phone number field -->
            <strong>Phone: </strong>
            <span>
                <input class="form-control" id="cPhone" type="text" v-model="phone" placeholder="0123" v-on:keypress="isNumber($event)"> <p></p>
            </span>
            
            <!-- Checkout button. Only enabled if values to Name and Phone are added -->
            <button class="btn btn-primary disabled" v-if="name == '' || phone == ''" disabled = "disabled">Checkout</button>
            <button class="btn btn-primary" v-else @click="CheckoutLessons()">Checkout</button>
            <p>{{errorMessage}}</p>
            
        </div>
  </div>
</template>

<script>
export default {
  name: "CheckoutPage",
  
  props:['cart'],
  data() {
    return {
      name: "",
      phone: 0,
      errorMessage: "",
      successfulCheckout: "",
    };
  },
  methods: {
      isLetter(e){
            //for every character input
            let char = String.fromCharCode(e.keyCode); 
            //if the character is an alphabet
            if(/^[A-Za-z]+$/.test(char)){
                this.errorMessage = "";
                return true;
            }  
            else{
                //displaying error message
                this.errorMessage = "Please enter only characters";
            } 
            
    },
    //function to check if the user input for phone has only numbers
        isNumber(e){
            //matching the user input with the character code of 0-9
            if(e.charCode >= 48 && e.charCode <= 57 ){
                this.errorMessage = "";
                return true;
            }
            else{
                //displaying error message
                this.errorMessage = "Please enter only numbers";
            }
        },
        CheckoutLessons(){
                    if(this.errorMessage == "" && this.cart.length > 0){
                        alert("Successfully placed order!");
                        this.successfulCheckout = "Thank you for purchasing!";
                        this.name = "";
                        this.phone = "";
                        this.cart.splice(0, this.cart.length);

                    }
                    else if(this.cart.length == 0){
                        alert("No products in cart!")
                    }
                    else{
                        alert("Please enter the correct values.");
                    }
                    
                },
        remove(lesson){
            console.log("removing lesson from cart");
            this.$emit('removeLesson', lesson);
        }
  }
  
};
</script>