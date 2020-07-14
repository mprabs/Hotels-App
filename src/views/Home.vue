<template>
  <div class="home">
    <a class="logout-button float-right" @click="logout()">Logout</a>
    <button
      data-toggle="modal"
      class="btn btn-danger float-left"
      style="margin-left: 150px"
      data-target="#addHotel"
    >
      Add new hotel
    </button>
    <button
      data-toggle="modal"
      data-target="#seeBookings"
      style="margin-left: 20px"
      class="btn btn-danger float-left"
    >
      See my bookings</button
    ><br />
    <p class="error-message" v-if="isBooked">Successfully Booked !</p>
    <p class="error-message" v-else-if="isCancelled">
      Successfully Cancelled !
    </p>
    <br />
    <div class="container">
      <div class="col" v-for="column in columns" :key="column">
        <div v-for="hotel in column" :key="hotel.id" class="item-container">
          <hr />
          <div class="card-header">
            <h3 class="hotel-name">{{ "Hotel " + hotel.name }}</h3>
          </div>
          <br /><br />
          <p>{{ "Address : " + hotel.address || "N/A" }} Yoo</p>
          <p>{{ "Number : " + hotel.number || "N/A" }}</p>
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
          <a @click="deleteHotel(hotel)" class="delete">Delete</a>
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

const URL = "http://localhost:8080/hotels";

export default {
  name: "Home",
  components: {
    Booking,
    BookingForm,
    AddHotel
  },
  data() {
    return {
      hotels: [],
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
      isCancelled: false,
      errorMessage: ""
    };
  },
  methods: {
    getHotels() {
      this.$axios
        .get(URL)
        .then(response => {
          this.hotels = response.data;
        })
        .catch(error => {
          this.errorMessage = error;
        });
    },
    addHotel(item) {
      this.hotels.push(item);
      this.$axios
        .post(URL, item)
        .then(response => {
          console.log(response);
          this.getHotels();
        })
        .catch(error => {
          console.log(error);
        });
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
    deleteHotel(hotelToDelete) {
      // alert(`Successfully deleted records of ${hotelToDelete.name}`);
      this.hotels = this.hotels.filter(hotel => hotelToDelete._id != hotel._id);
      console.log(hotelToDelete._id);
      this.$axios.delete(URL + `/${hotelToDelete._id}`);
      // window.location.reload();
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
      console.log("User token found !");
    } else {
      this.$router.replace({ name: "Login" });
    }
    this.getHotels();
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
  color: rgb(250, 246, 246);
  margin-right: 150px;
  cursor: pointer;
}

.logout-button:hover {
  color: rgb(205, 81, 50);
}

.modal-body {
  text-align: left;
}

.card-header {
  flex: 1;
}

.delete {
  color: red;
  text-decoration: underline;
  cursor: pointer;
  font-size: 15px;
}
</style>
