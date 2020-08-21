<template>
  <div class="home">
    <a class="logout-button float-right" @click="logout()">Logout</a>
    <button
      data-toggle="modal"
      data-target="#addHotel"
      style="margin-left: 150px"
      class="btn btn-danger float-left"
    >
      Add new hotel
    </button>
    <div
      class="modal fade"
      id="addHotel"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addHotelTitle"
      aria-hidden="true"
    >
      <AddHotel :success="getHotels" />
    </div>
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
      <div class="row">
        <div
          v-for="hotel in hotels"
          :key="hotel.id"
          class="item-container col-sm"
        >
          <div class="card card-inverse card-info">
            <img class="card-img-top" :src="hotel.image" />
            <div class="card-block">
              <figure class="profile">
                <img :src="hotel.image" class="profile-avatar" alt="" />
              </figure>
              <h4 class="card-title mt-3">{{ "Hotel " + hotel.name }}</h4>
              <div class="meta card-text">
                <a>{{ hotel.address || "N/A" }}</a>
              </div>
              <div class="card-text">
                {{ hotel.description || "Description not available." }}
              </div>
            </div>
            <div class="card-footer">
              <small
                ><a
                  data-toggle="modal"
                  data-target="#updateHotel"
                  class="action update"
                  @click="updateHotel(hotel)"
                  >Update</a
                >
                <a @click="deleteHotel(hotel)" class="action delete"
                  >Delete</a
                ></small
              >
              <div v-if="hotelToUpdate">
                <div
                  class="modal fade"
                  id="updateHotel"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="updateHotelTitle"
                  aria-hidden="true"
                >
                  <AddHotel :hotel="hotelToUpdate" :success="getHotels" />
                </div>
              </div>
              <button
                @click="
                  !isHotelBooked ? bookHotel(hotel.id) : (isHotelBooked = false)
                "
                data-toggle="modal"
                data-target="#bookModal"
                class="btn btn-primary float-right btn-sm"
              >
                Book Now
              </button>
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
            </div>
          </div>
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
// import { instance } from "../views/axiosheader";

export default {
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
      book_user_name: "",
      book_user_number: "",
      bookFrom: "",
      bookTo: "",
      bookings: [],
      isBooked: false,
      isCancelled: false,
      errorMessage: "",
      hotelToUpdate: ""
    };
  },
  methods: {
    getHotels() {
      const token = JSON.parse(localStorage.getItem("user_token"));
      this.$axios.defaults.headers.common["auth_token"] = token;
      this.$axios
        .get("http://localhost:8081/hotels")
        .then(response => {
          this.hotels = response.data;
          console.log(this.hotels);
        })
        .catch(error => {
          this.errorMessage = error;
        });
    },
    bookHotel(id) {
      this.isHotelBooked = true;
      this.hotelId = id;
    },

    updateHotel(hotel) {
      this.hotelToUpdate = hotel;
    },
    addBooking(newBooking) {
      this.isBooked = true;
      if (this.isBooked) {
        setTimeout(() => {
          this.isBooked = false;
        }, 3000);
      }
      this.bookings = [...newBooking, ...this.bookings];
      console.log(this.bookings);
    },
    deleteHotel(hotelToDelete) {
      // alert(`Successfully deleted records of ${hotelToDelete.name}`);
      this.$axios.delete(URL + `/${hotelToDelete._id}`).then(response => {
        this.hotels = this.hotels.filter(
          hotel => hotelToDelete._id != hotel._id
        );
        console.log(response);
      });
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
      this.$router.replace({ name: "login" });
    }
    this.getHotels();
  },
  watch: {
    hotels: function() {
      // this.getHotels();
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
}

.update {
  color: blue;
}

.action:hover {
  color: rgb(102, 13, 90);
}

.action {
  padding: 20px;
  cursor: pointer;
  font-size: 15px;
}

h5 {
  font-size: 1.28571429em;
  font-weight: 700;
  line-height: 1.2857em;
  margin: 0;
}

.card {
  font-size: 1em;
  overflow: hidden;
  padding: 0;
  border: none;
  border-radius: 0.28571429rem;
  box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
}

.card-block {
  font-size: 1em;
  position: relative;
  margin: 0;
  padding: 1em;
  border: none;
  border-top: 1px solid rgba(34, 36, 38, 0.1);
  box-shadow: none;
}

.card-img-top {
  display: block;
  width: 100%;
  height: 300px;
}

.card-title {
  font-size: 1.28571429em;
  font-weight: 700;
  line-height: 1.2857em;
}

.card-text {
  clear: both;
  margin-top: 0.5em;
  color: rgba(0, 0, 0, 0.68);
}

.card-footer {
  font-size: 1em;
  position: static;
  top: 0;
  left: 0;
  max-width: 100%;
  padding: 0.75em 1em;
  color: rgba(0, 0, 0, 0.4);
  border-top: 1px solid rgba(0, 0, 0, 0.05) !important;
  background: #fff;
}

.card-inverse .btn {
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.profile {
  position: absolute;
  top: -12px;
  display: inline-block;
  overflow: hidden;
  box-sizing: border-box;
  width: 25px;
  height: 25px;
  margin: 0;
  border: 1px solid #fff;
  border-radius: 50%;
}

.profile-avatar {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.profile-inline {
  position: relative;
  top: 0;
  display: inline-block;
}

.profile-inline ~ .card-title {
  display: inline-block;
  margin-left: 4px;
  vertical-align: top;
}

.text-bold {
  font-weight: 700;
}

.meta {
  font-size: 1em;
  color: rgba(0, 0, 0, 0.4);
}

.meta a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.4);
}

.meta a:hover {
  color: rgba(0, 0, 0, 0.87);
}
</style>
