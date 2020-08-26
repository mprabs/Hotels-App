<template>
  <div class="home">
    <Navbar />
    <p>
      {{ user.name }}
    </p>
    <div class="menu-bar">
      <div class="buttons">
        <button data-toggle="modal" data-target="#addHotel" class="btn btn-danger">
          Add new hotel
        </button>
        <button data-toggle="modal" data-target="#seeBookings" class="btn btn-danger">
          See my bookings
          <span class="badge badge-light">{{ myBookings.length }}</span>
        </button>
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
      <AddHotel :success="getHotels" />
    </div>
    <p class="error-message" v-if="isBooked">Successfully Booked !</p>
    <p class="error-message" v-else-if="isCancelled">
      Successfully Cancelled !
    </p>
    <br />
    <div class="container">
      <div class="row">
        <div
          v-for="hotel in hotels"
          :key="hotel._id"
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
              <small>
                <a
                  data-toggle="modal"
                  data-target="#updateHotel"
                  class="action update"
                  @click="updateHotel(hotel)"
                  >Update
                  </a>
                <a @click="deleteHotel(hotel)" class="action delete">Delete</a>
              </small>
            </div>
              <button
                @click="
                  !isHotelBooked ? bookHotel(hotel._id) : (isHotelBooked = false)
                "
                data-toggle="modal"
                data-target="#bookModal"
                class="btn btn-primary book-btn float-right btn-sm"
              >
                Book Now
              </button>
              <div v-if="hotelToUpdate">
                <div
                  class="modal fade"
                  id="updateHotel"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="updateHotelTitle"
                  aria-hidden="true"
                >
                  <AddHotel :hotel="hotelToUpdate" @success="onAddHotel" />
                </div>
              </div>
              <div v-if="isHotelBooked && hotelId === hotel._id">
                <div
                  class="modal fade"
                  id="bookModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="bookModalTitle"
                  aria-hidden="true"
                >
                  <BookingForm :user="user" :hotel="hotel" @new-booking="addBooking" />
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div class="paginations">
      <div class="prev">
        <a @click="goToPrev()" :style="this.prev ? 'color: white' : 'color: rgb(94, 68, 163)'">Previous</a>
      </div>
      <div class="page-number">
        <b>{{this.page}}</b>
      </div>
      <div class="next">
        <a @click="goToNext()" :style="this.next ? 'color: white' : 'color: rgb(94, 68, 163)'">Next</a>
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
      <Booking :bookings="myBookings" @cancelledItem="cancelBooking" />
    </div>
    <br />
    <br />
    <br />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/navigation";
import Booking from "../components/myBookings";
import BookingForm from "../components/bookingForm";
import AddHotel from "../components/addHotel";

const URL = "http://localhost:8081"

export default {
  components: {
    Booking,
    BookingForm,
    AddHotel,
    Navbar
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
      isBooked: false,
      isCancelled: false,
      errorMessage: "",
      hotelToUpdate: "",
      user_name: "",
      user: "",
      bookingList: [],
      myBookings: [],
      prev: "",
      next: "",
      page: 1,
      limit: 10
    };
  },
  methods: {
    onAddHotel(data) {
      console.log('Hotel Added', data)
      this.getHotels();
    },
    goToPrev() {
      this.page = this.prev.page;
      this.getHotels();
    },
    goToNext() {
      this.page = this.next.page;
      this.getHotels();
    },
    getHotels() {
      console.log('Get hotels')
      this.$axios
        .get(`${URL}/hotels?page=${this.page}&limit=${this.limit}`)
        .then(response => {
          this.hotels = response.data.results;
          this.prev = response.data.prev;
          this.next = response.data.next;
          this.getBookingsData();
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
    addBooking() {
      this.isBooked = true;
      if (this.isBooked) {
        setTimeout(() => {
          this.isBooked = false;
        }, 3000);
      }
      this.getHotels();
    },
    deleteHotel(hotelToDelete) {
      this.$axios.delete(`${URL}/hotels/${hotelToDelete._id}`).then(this.getHotels())
    },
    async cancelBooking(id) {
      this.$axios.delete(`${URL}/bookings/${id}`)
      this.isCancelled = true;
      this.getHotels();
      await setTimeout(() => {
        this.isCancelled = false;
      }, 3000);
    },
    async getBookingsData() {
      const user = JSON.parse(localStorage.getItem("user_data"))
      this.$axios.get('http://localhost:8081/bookings').then(response =>{
        this.bookingList = response.data;
        this.myBookings = this.bookingList.filter(item => item.user[0]._id == user.id)
      })
    }
  },
  mounted() {
    const token = JSON.parse(localStorage.getItem("user_data"));
    if (token) {
      this.$axios.defaults.headers.common["auth_token"] = token;
    } else {
      this.$router.replace({ name: "login" });
    }
    this.user = JSON.parse(localStorage.getItem("user_data"));
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

.home {
  margin-top: 20vh;
}
.home p {
  color: white;
  font-size: 20px;
}

.paginations {
  margin-top: 40px;
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
}

.paginations .prev a, .paginations .next a {
  color: #fff;
  cursor: pointer;
}

.paginations .page-number {
  color: #fff;
  width: 200px;
  list-style: none;
 justify-content: center;
}

.paginations .page-number b {
  background-color: rgb(113, 112, 116);
  margin-right: 20px;
  padding: 10px 20px;
}

.menu-bar {
  display: flex;
  justify-content: space-between;
  margin: 0 40px;
}

.book-btn {
  padding: 15px;
  border-radius: 30px;
  margin: 10px;
}

.row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  width: 95%;
}

.buttons button {
  margin: 10px;
}

@media screen and (max-width: 780px) {
 .buttons {
   flex-direction: column;
   align-items: center;
   justify-content: center;
 } 

 .buttons button {
    margin: 10px
 }

 .card {
   margin: 20px;
 }

 .row {
   grid-template-columns: 1fr;
 }
}

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

.modal-body {
  text-align: left;
}

.card-header {
  flex: 1;
}

.delete {
  color: red;
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
  object-fit: cover;
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
