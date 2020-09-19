<template>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">Booking Form for {{ hotel.name }}</div>
      <div class="modal-body book-container">
        <div class="input-group book-form">
          <div class="name">
            <!-- <label for="name">Name</label> -->
            <input
              id="name"
              type="text"
              v-model="book_user_name"
              placeholder="Name"
            />
          </div>
          <div class="number">
            <!-- <label for="name">Number</label> -->
            <input
              id="number"
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
            <div class="selection">
              <div class="title">Select the number of rooms</div>
              <div class="rooms-select">
                <div class="item" @click="select(1)">1</div>
                <div class="item" @click="select(2)">2</div>
                <div class="item" @click="select(3)">3</div>
                <div class="item" @click="select(4)">4</div>
              </div>
            </div>
          </div>
        </div>
        <div class="infos">
          <div v-if="numberOfRooms"
            >Selected number of rooms: <span>{{ numberOfRooms }}</span></div
          >
          <div v-if="book_user_name">Your name: <span>{{ book_user_name }}</span></div>
          <div v-if="book_user_number">Your number: <span>{{ book_user_number }}</span></div>
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
    },
    select(val) {
      this.numberOfRooms = val;
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


.input-group {
  display: flex;
  flex-direction: column;
}

.input-group .name, .input-group .number {
  display: flex;
  flex-direction: column;
}

.book-form input {
  border: none;
  border-bottom: 2px solid black;
}

.book-form input:focus {
  outline: none;
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
  background-color: rgb(68, 119, 228);
  color: rgb(231, 237, 243);
  border: 2px solid rgb(59, 58, 58);
  padding: 20px;
  margin-top: 20px;
}

.infos span {
  color: rgb(169, 240, 77);
}

option{
    font-size:18px;
    color: rgb(59, 58, 58);
}

.selection {
  display: flex;
  flex-direction: column;
}

.selection .title {
  display: flex;
  justify-content: center;
  align-items: center;
}

.rooms-select {
  flex: 0.5;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
}

.rooms-select .item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  color: white;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  font-weight: bold;
}

.item:nth-child(1) {
  background-color: rgb(250, 124, 124);
  border-right: 1px solid rgb(255, 255, 255);
  border-bottom: 1px solid  rgb(255, 255, 255);
}
.item:nth-child(2) {
  background-color: rgb(159, 159, 241);
  border-bottom: 1px solid  rgb(255, 255, 255);

}
.item:nth-child(3) {
  background-color: goldenrod;
  border-right: 1px solid  rgb(255, 255, 255);
}
.item:nth-child(4) {
  background-color: violet;
}

.item:hover {
  border: 3px solid rgb(255, 255, 255);
  border-radius: 10px;
}


</style>
