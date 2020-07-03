<template>
  <div class="home">
    <p v-if="isBooked"> Successfully Booked !</p><br />
    <button
      @click="seeBookings()"
      data-toggle="modal"
      data-target="#seeBookings"
      style="margin-right: 150px"
      class="btn btn-outline-danger float-right"
    >
      See my bookings
    </button>

    <button data-toggle="modal" 
      class="btn btn-outline-danger float-right"
      style="margin-right: 20px"
     data-target="#addHotel">Add new hotel</button><br />
    <h1
      class="float-left"
      style="margin-left: 100px"
    >Name of Hotels</h1>
    <div class="container">
      <div class="col" v-for="column in columns" :key="column">
        <div v-for="hotel in column" :key="hotel.id" class="item-container">
          <hr />
          <h3>{{ 'Hotel ' + hotel.name }}</h3>
          <p>{{ 'Address : ' + hotel.address || "N/A" }}</p>
          <p>{{ "Number : " + hotel.number || "N/A" }}</p>
          <p>
            <img :src="hotel.img" class="rounded-lg" style="height: 200px; width: 250px;" />
          </p>
          <button
            @click="
              !isHotelBooked ? bookHotel(hotel.id) : (isHotelBooked = false)
            "
            data-toggle="modal"
            data-target="#bookModal"
            class="btn btn-primary"
          >
            Book now
          </button>
          <br />
          <br />
          <div v-if="isHotelBooked && hotelId === hotel.id">
            <div
              class="modal fade"
              id="bookModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="bookModalTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">Booking for {{ hotel.name }}</div>
                  <div class="modal-body">
                    <input
                      type="text"
                      v-model="book_user_name"
                      placeholder="Enter your name"
                    />
                    <br />
                    <input
                      type="number"
                      v-model="book_user_number"
                      placeholder="Enter your number"
                    />
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
                    <span v-if="book_user_name"
                      >Your name: {{ book_user_name }}</span
                    >
                    <br />
                    <span v-if="book_user_number"
                      >Your number: {{ book_user_number }}</span
                    >
                    <br />
                    <br />
                    <button
                      @click="verifyBooking(hotel.name)"
                      data-dismiss="modal"
                    >
                      Verify booking !
                    </button>
                    <button data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr />
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="seeBookings"
      tabindex="-1"
      role="dialog"
      aria-labelledby="seeBookingsTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">Bookings made by me</div>
          <div v-if="bookings.length === 0">
            <h4>You have no any bookings right now !</h4>
          </div>
          <div
            v-else
            v-for="(booking, index) in bookings"
            :key="index"
            class="modal-body"
          >
            Hotel: {{ booking.hotel }} <br />
            Date from: {{ booking.from }} <br />
            Date to: {{ booking.to }} <br />
            Number of rooms: {{ booking.room }} <br />
            <br />
            <button class="btn btn-danger" data-dismiss="modal" @click="cancelBooking(index)" > Cancel </button>
          </div>
          <div class="modal-footer">
            <button data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="addHotel"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addHotelTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">Add a new hotel</div>
          <div class="modal-body">
            <input v-model="new_hotel" placeholder="Hotel Name" />
            <br />
            <input v-model="new_address" placeholder="Address" />
            <br />
            <input v-model="new_number" placeholder="Number" />
            <br />

            <button @click="addHotel()">Add</button>
          </div>
          <div class="modal-footer">
            <button data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <br />
    <br />
    <br />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      hotels: [
        {
          id: 1,
          name: "Hayat",
          address: "Japan",
          number: "123232",
          img: require("../images/hotel1.jpeg"),
        },
        {
          id: 2,
          name: "Sangrila",
          address: "Japan",
          number: "123232",
          img: require("../images/hotel2.jpeg"),
        },
        {
          id: 3,
          name: "Radison",
          address: "Japan",
          number: "123232",
          img: require("../images/hotel3.jpeg"),
        },
        {
          id: 4,
          name: "Everest",
          address: "Japan",
          number: "123232",
          img: require("../images/hotel1.jpeg"),
        },
        {
          id: 5,
          name: "Newww",
          address: "Japan",
          number: "123232",
          img: require("../images/hotel2.jpeg"),
        },
      ],
      new_hotel: "",
      new_address: "",
      new_number: "",
      isHotelBooked: false,
      hotelId: "",
      numberOfRooms: "",
      cols: 3,
      book_user_name: "",
      book_user_number: "",
      bookFrom: "",
      bookTo: "",
      bookings: [],
      isBooked: false,
    };
  },
  methods: {
    addHotel() {
      this.hotels.push({
        name: this.new_hotel,
        address: this.new_address,
        number: this.new_number,
      });
    },
    bookHotel(id) {
      this.isHotelBooked = true;
      this.hotelId = id;
    },
    verifyBooking(hotel) {
      console.log(hotel)
      this.isBooked = hotel.length > 1 ? true : false;
      this.bookings.push({
        hotel: hotel,
        user: this.book_user_name,
        number: this.book_user_number,
        from: this.bookFrom,
        to: this.bookTo,
        room: this.numberOfRooms,
      });
    },
    cancelBooking(id) {
      this.bookings.splice(id, 1)
      alert(this.bookings)
    }
  },
  computed: {
    columns() {
      let columns = [];
      let mid = Math.ceil(this.hotels.length / this.cols);
      for (let col = 0; col < this.cols; col++) {
        columns.push(this.hotels.slice(col * mid, col * mid + mid));
      }
      return columns;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
}
.col {
  margin: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.item-container {
  border: 1px solid;
  padding: 5px;
  margin: 5px;
  background-color: rgb(230, 225, 225);
  border-radius: 12px;
}
.calendarHeader {
  width: 20%;
  color: #25255c;
}
</style>
