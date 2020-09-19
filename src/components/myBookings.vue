<template>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">My bookings</div>
      <div v-if="bookings.length === 0">
        <img src="../images/not-found.png" width="400" height="400" />
        <h4 class="error-message">No Bookings Available !</h4>
      </div>
      <div
        v-else
        v-for="(booking, index) in bookings"
        :key="index"
        class="modal-body"
      >
        <div class="container bookings-container">
          <div class="row">
            <div class="col-md-6">
              <div class="book__details">
                <div class="book__hotel">
                  <i class="fas fa-hotel"></i>
                   <span>{{ booking.hotel[0].name }}</span>
                </div>
                <div class="book__date">
                  <i class="fas fa-calendar-day"></i>
                  From <span>{{ booking.bookFrom }}</span>
                  to <span>{{ booking.bookTo }}</span>
                </div>
                <div class="book__numberOfRooms">
                  <i class="fas fa-door-open"></i>
                  Number of rooms: <span>{{ booking.numberOfRooms }}</span>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <img :src="booking.hotel[0].image" alt=""><br />
            </div>
            <button
              class="cancel-button"
              data-dismiss="modal"
              @click="$emit('cancelleditem', booking._id)"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bookings: {
      type: Array,
      required: true
    }
  }
};
</script>

<style>
.error-message {
  color: red;
}

.modal-header {
  font-size: 1.5em;
  background-color: royalblue;
  color: white;
}

img {
  height: 150px;
  width: 200px;
  object-fit: contain;
}

.row {
  position: relative;
}

.cancel-button {
  height: 30px;
  width: 30px;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(10px, -35px);
  border-radius: 50%;
  border: none;
  background-color: red;
  color: white;
  box-shadow: 0 0 3px 1px rgb(163, 159, 159);
}

.cancel-button:hover {
  background-color: rgb(170, 1, 1);
}

.bookings-container {
  color: rgb(49, 47, 47);
  margin: 20px;
  padding: 20px;
  background-color: rgb(245, 245, 245);
  border-radius: 5px;
  box-shadow: 0 0 5px 0 rgb(161, 158, 158);
  border: 2px solid transparent;
}

.bookings-container:hover {
  border: 2px solid rgb(151, 151, 238);
}

.book__details .fas {
  opacity: 0.5;
}

.book__details .book__hotel {
  font-size: 20px;
  color: rgb(75, 75, 116);
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.book__hotel::after {
  content: "";
  height: 2px;
  width: 75%;
  margin: 0 auto;
  background-color: rgb(197, 190, 190);
  margin-bottom: 10px;
}

.book__details span {
  font-weight: bold;
}

.book__details {
  margin-bottom: 20px;
}



</style>
