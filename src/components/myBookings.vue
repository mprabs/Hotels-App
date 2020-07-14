<template>
  <div class="modal-dialog" role="document">
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
        Hotel: {{ booking.hotel }} <br /><br />
        Date from: {{ booking.from }} <br /><br />
        Date to: {{ booking.to }} <br /><br />
        Number of rooms: {{ booking.room }} <br /><br />
        <br />
        <button
          class="btn btn-outline-danger"
          data-dismiss="modal"
          @click="$emit('cancelledItem', index)"
        >
          Cancel Booking
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
</style>
