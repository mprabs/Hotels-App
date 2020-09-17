<template>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">Booking Form for {{ hotel.name }}</div>
      <div class="modal-body">
        <div class="input-group">
          <div class="name">
            <input
              type="text"
              v-model="book_user_name"
              placeholder="Enter your name"
            />
          </div>
          <div class="number">
            <input
              type="text"
              v-model="book_user_number"
              placeholder="Enter your number"
            />
          </div>
          <div class="book-details">
            <div class="period">
              From
              <input type="date" v-model="bookFrom" />
              to
              <input type="date" v-model="bookTo" />
            </div>
            <select class="custom-select" size="3" v-model="numberOfRooms">
              <option disabled value>Number of rooms</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
        </div>
        <div class="infos">
          <span v-if="numberOfRooms"
            >Selected number of rooms: {{ numberOfRooms }}</span
          >
          <span v-if="book_user_name">Your name: {{ book_user_name }}</span>
          <span v-if="book_user_number">Your number: {{ book_user_number }}</span>
        </div>
        <p v-if="displayErrorMessage" class="error-message">
          Please fill up all the fields !
        </p>
        <br />
        <button
          class="btn btn-primary"
          @click="verifyBooking()"
          :data-dismiss="displayErrorMessage ? 0 : 'modal'"
        >
          Verify booking !
        </button>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookings: [],
      book_user_number: "",
      book_user_name: this.user.name,
      bookTo: "",
      bookFrom: "",
      numberOfRooms: "",
      displayErrorMessage: false
    };
  },
  props: {
    hotel: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    verifyBooking() {
      if (
        !this.book_user_name ||
        !this.book_user_number ||
        !this.bookFrom ||
        !this.bookTo ||
        !this.numberOfRooms
      ) {
        this.displayErrorMessage = true;
        setTimeout(() => {
          this.displayErrorMessage = false;
        }, 2000);
        return;
      }
      const newBooking = {
        hotel: this.hotel._id,
        user: this.user._id,
        contact: this.book_user_number,
        bookFrom: this.bookFrom,
        bookTo: this.bookTo,
        numberOfRooms: this.numberOfRooms
      }
      this.$axios.post('https://hotels-api-deploy.herokuapp.com/bookings', newBooking);
      this.bookings.push(newBooking);
      this.$emit("new-booking", this.bookings);
    }
  },
  watch: {
    hotel: function() {
      console.log(this.hotel);
    }
  }
};
</script>

<style>
.error-message {
  color: red;
}

.input-group select {
  margin: 20px;
  padding: 10px;
  border-radius: 20px;
}

.input-group select:focus {
  outline: none;
  border-color: chartreuse;
}

.input-group input {
  margin: 10px;
}

.book-details {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.infos {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  background-color: rgb(209, 228, 241);
  color: rgb(39, 40, 41);
  border: 2px solid rgb(59, 58, 58);
  padding: 20px;
}

/* select { 
  text-align-last: center;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding-right: 29px;
  direction: rtl;
}

option{
    font-size:18px;
    background-color:#000000;
    color: rgb(255, 255, 255);
}
option:before{
  background-color: rgb(163, 151, 204);
    content: ">";
    font-size:20px;
    display:none;
    padding-right:10px;
    padding-left:5px;
    color:#fff;
}
option:hover:before{
    display:inline;
} */


</style>
