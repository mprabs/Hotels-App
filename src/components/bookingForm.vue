<template>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">Booking Form for {{ hotel.name }}</div>
      <div class="modal-body">
        Name :
        <input
          type="text"
          v-model="book_user_name"
          placeholder="Enter your name"
        />
        <br />
        <br />
        Number :
        <input
          type="number"
          v-model="book_user_number"
          placeholder="Enter your number"
        />
        <br />
        <br />
        <select v-model="numberOfRooms">
          <option disabled value>Number of rooms</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
        <br />From
        <br />
        <input type="date" v-model="bookFrom" />
        <br />to
        <br />
        <input type="date" v-model="bookTo" />
        <br />
        <br />
        <span v-if="numberOfRooms"
          >Selected number of rooms: {{ numberOfRooms }}</span
        >
        <br />
        <span v-if="book_user_name">Your name: {{ book_user_name }}</span>
        <br />
        <span v-if="book_user_number">Your number: {{ book_user_number }}</span>
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
        user: this.user.id,
        contact: this.book_user_number,
        bookFrom: this.bookFrom,
        bookTo: this.bookTo,
        numberOfRooms: this.numberOfRooms
      }
      this.$axios.post('http://localhost:8081/bookings', newBooking);
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
</style>
