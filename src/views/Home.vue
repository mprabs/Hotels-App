<template>
  <div class="home">
    <Navbar @profile="viewProfileSideBar" :showProfile="showProfile" />
    <div class="body">
      <div class="content">
      <p>
        {{ `Good ${timeOfTheDay}, ${user.name} !` }}
      </p>
      <div class="menu-bar">
        <div class="buttons">
          <button data-toggle="modal" data-target="#addHotel" class="btn btn-danger">
            <i class="fas fa-plus"></i>
            Add new hotel
          </button>
          <button data-toggle="modal" data-target="#seeBookings" class="btn btn-danger">
            <i class="fas fa-eye"></i>
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
      <div class="toasts">
        <transition name="slide-fade">
          <p class="error-message" :style="[snackBar]" v-if="isBooked">Successfully Booked !</p>
          <p class="error-message" :style="[snackBar]" v-else-if="isCancelled" >
            Successfully Cancelled !
          </p>
        </transition>
      </div>
      <br />
      <div class="container">
        <div class="loading" v-if="loading">
          <Loader />
        </div>
        <div v-else class="card-row">
          <div
            v-for="hotel in hotels"
            :key="hotel._id"
            class="item-container col-xs-4"
          >
            <div class="card card-inverse card-info">
              <img class="card-img-top" :src="hotel.image" />
              <div class="card-block">
                <figure class="profile">
                  <img :src="hotel.image" class="profile-avatar" alt="" />
                </figure>
                <h4 class="card-title mt-3">{{ "Hotel " + hotel.name }}</h4>
                <div class="meta card-text">
                  <a> <i class="fas fa-map-marker-alt"></i> {{ hotel.address || "N/A" }}</a>
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
                    >
                    <i class="fas fa-edit"></i>
                    Update
                    </a>
                  <a @click="deleteHotel(hotel)" class="action delete">
                    <i class="fas fa-trash"></i>
                    Delete</a>
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
      <div v-if="loading == false" class="paginations">
        <div class="prev">
          <a @click="goToPrev()" :style="this.prev ? 'color: white' : 'color: rgb(94, 68, 163)'">
                    <i class="fas fa-arrow-left"></i>
          </a>
        </div>
        <div class="page-number">
          <b>{{this.page}}</b>
        </div>
        <div class="next">
          <a @click="goToNext()" :style="this.next ? 'color: white' : 'color: rgb(94, 68, 163)'">
                    <i class="fas fa-arrow-right"></i>
          </a>
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
        <Booking :bookings="myBookings" @cancelleditem="cancelBooking" />
      </div>
      <br />
      <br />
      <br />
      </div>
      <transition name="fade">
        <div v-if="showProfile" class="sidebar">
            <ProfileBadge />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/navigation";
import Booking from "../components/myBookings";
import BookingForm from "../components/bookingForm";
import AddHotel from "../components/addHotel";
import ProfileBadge from "../components/profileBadge";
import Loader from "../components/loader";
// import instance from "../helper/instance"

const URL = "https://hotels-api-deploy.herokuapp.com"

export default {
  components: {
    Booking,
    BookingForm,
    AddHotel,
    Navbar,
    ProfileBadge,
    Loader
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
      loading: false,
      limit: 10,
      timeOfTheDay: "",
      showProfile: false,
      snackBar: {
        padding: '15px',
        margin: '0 auto',
        color: 'white',
        backgroundColor: 'green',
      }
    };
  },
  methods: {
    calculateCurrentTime() {
      var date = new Date();
      var h = date.getHours();
      if(h<12 && h>= 5) {
        this.timeOfTheDay = "Morning"
      } else if(h>=12 && h<=17) {
        this.timeOfTheDay = "Afternoon"
      } else if(h>=17 && h<=24 || h>=1 && h<=4) {
        this.timeOfTheDay = "Night"
      }
    },
    onAddHotel(data) {
      console.log('Hotel Added', data)
      this.getHotels();
    },
    viewProfileSideBar() {
      this.showProfile = !this.showProfile;
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
      this.loading = true;
      this.$axios
        .get(`${URL}/hotels?page=${this.page}&limit=${this.limit}`)
        .then(response => {
          this.hotels = response.data.results;
          this.prev = response.data.prev;
          this.next = response.data.next;
          this.getBookingsData();
          this.loading = false;
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
      console.log(user)
      this.$axios.get(`${URL}/bookings`).then(response =>{
        this.bookingList = response.data;
        console.log(this.bookingList)
        this.myBookings = this.bookingList.filter(item => item.user[0]._id === user._id)
        console.log(this.myBookings)
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
    this.calculateCurrentTime();
    // window.document.body.onscroll = () => this.showProfile = false;
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.home p {
  color: rgb(90, 89, 89);
  font-size: 20px;
}

h4 {
  font-family: 'Poppins';
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
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

.card-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  width: 100vw;
  place-items: center;
}

figure img {
  object-fit: cover;
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
   flex-wrap: wrap;
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
  padding: 2px;
  border: none;
  border-radius: 0.28571429rem;
  box-shadow: 0 3px 5px 0 #7c7c7e, 0 0 0 1px #d4d4d5;
  background-color: #ececf0;
}

/* .card:hover{
  padding: 0;
  border: 2px solid rgb(150, 150, 223);
  transform: scale(1.05);
} */

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
  height: 300px;
  width: 300px;
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

.toasts {
  position: fixed;
  margin: 10px;
  top: 10vh;
  right: 0;
  width: 30%;
  z-index: 9999;
}

.slide-fade-enter-active {
  transition: all .7s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.body {
  display: flex;
}

.sidebar {
  background:#161616;
  color: #ececf0;
  overflow: hidden;
  position: fixed;
  top: 10;
  right: 0;
  min-width: 400px;
  height: 100vh;
  transform: translateY(-70px);
}

.content {
  flex: 0.6;
  flex-grow: 1;
}

.loading {
  margin: 0 auto;
}
</style>
