<template>
  <div class="home">
    <a class="logout-button float-right" @click="logout()">Logout</a>
    <button
      data-toggle="modal"
      class="btn btn-outline-danger float-left"
      style="margin-left: 150px"
      data-target="#addHotel"
    >
      Add new hotel
    </button>
    <button
      data-toggle="modal"
      data-target="#seeBookings"
      style="margin-left: 20px"
      class="btn btn-outline-danger float-left"
    >
      See my bookings</button
    ><br />
    <p v-if="isBooked">Successfully Booked !</p>
    <p v-else-if="isCancelled">Successfully Cancelled !</p>
    <br />
    <div class="container">
      <div class="col" v-for="column in columns" :key="column">
        <div v-for="hotel in column" :key="hotel.id" class="item-container">
          <hr />
          <h3>{{ "Hotel " + hotel.name }}</h3>
          <br /><br />
          <p>{{ "Address : " + hotel.address || "N/A" }} Yoo</p>
          <br />
          <p>{{ "Number : " + hotel.number || "N/A" }}</p>
          <br />
          <p>
            <img
              :src="hotel.img"
              class="rounded-lg img-fluid"
              style="height: 200px; width: 250px;"
            />
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
              <BookingForm :hotel="hotel" @new-booking="addBooking" />
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
      <Booking :bookings="bookings" @cancelledItem="cancelBooking" />
    </div>
    <div
      class="modal fade"
      id="addHotel"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addHotelTitle"
      aria-hidden="true"
    >
      <AddHotel @new-hotel="addHotel" />
    </div>

    <br />
    <br />
    <br />
  </div>
</template>

<script>
// @ is an alias to /src

import Booking from "../components/myBookings";
import BookingForm from "../components/bookingForm";
import AddHotel from "../components/addHotel";

export default {
  name: "Home",
  components: {
    Booking,
    BookingForm,
    AddHotel
  },
  data() {
    return {
      hotels: [
        {
          id: 1,
          name: "Hayat",
          address: "Japan",
          number: "123232",
          img: require("../images/hotel1.jpeg")
        },
        {
          id: 2,
          name: "Sangrila",
          address: "Japan",
          number: "123232",
          img: require("../images/hotel2.jpeg")
        },
        {
          id: 3,
          name: "Radison",
          address: "Japan",
          number: "123232",
          img: require("../images/hotel3.jpeg")
        },
        {
          id: 4,
          name: "Everest",
          address: "Japan",
          number: "123232",
          img: require("../images/hotel1.jpeg")
        },
        {
          id: 5,
          name: "Newww",
          address: "Japan",
          number: "123232",
          img: require("../images/hotel2.jpeg")
        }
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
      isCancelled: false
    };
  },
  methods: {
    addHotel(item) {
      this.hotels.push(item);
    },
    bookHotel(id) {
      this.isHotelBooked = true;
      this.hotelId = id;
    },
    addBooking(newBooking) {
      this.isBooked = true;
      if (this.isBooked) {
        setTimeout(() => {
          this.isBooked = false;
        }, 3000);
      }
      this.bookings = [...newBooking, ...this.bookings];
    },
    logout() {
      this.$router.replace({ name: "login" });
      localStorage.removeItem("user_token");
    },
    async cancelBooking(id) {
      this.bookings.splice(id, 1);
      this.isCancelled = true;
      await setTimeout(() => {
        this.isCancelled = false;
      }, 3000);
    }
  },
  mounted() {
    if (localStorage.getItem("user_token")) {
      // do nothing
      console.log("User token found !");
    } else {
      console.log("No user token");
      this.$router.replace({ name: "Login" });
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
    }
  }
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

.logout-button {
  color: black;
  margin-right: 150px;
  cursor: pointer;
}

.logout-button:hover {
  color: rgb(205, 81, 50);
}

.modal-body {
  text-align: left;
}
</style>
