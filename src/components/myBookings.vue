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
              Hotel: {{ booking.hotel[0].name }} <br /><br />
              Date from: {{ booking.bookFrom }} <br /><br />
              Date to: {{ booking.bookTo }} <br /><br />
              Number of rooms: {{ booking.numberOfRooms }} <br /><br />
              <br />
            </div>
            <div class="col-md-6">
              <img :src="booking.hotel[0].image" alt=""><br />
            </div>
            <div class="col-md-12">
              <button
                class="btn btn-danger cancel-button"
                data-dismiss="modal"
                @click="$emit('cancelleditem', booking._id)"
              >
                Cancel Booking
              </button>
            </div>
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

.cancel-button {
  width: 80%;
}

.bookings-container {
  color: white;
  margin: 20px;
  padding: 20px;
  background-color: rgb(47, 47, 71);
  border-radius: 30px;
}
</style>
