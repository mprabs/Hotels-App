<template>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">Add a new hotel</div>
      <div class="modal-body">
        <input v-model="new_hotel_name" placeholder="Hotel Name" />
        <br />
        <input v-model="new_hotel_address" placeholder="Address" />
        <br />
        <input v-model="new_hotel_number" placeholder="Number" />
        <br />

        <p class="error-message" v-if="isDataEmpty">
          Please add a hotel name and an address.
        </p>

        <button
          class="btn btn-primary"
          :data-dismiss="isDataEmpty == false ? 'modal' : 0"
          @click="addHotel()"
        >
          Add
        </button>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-dismiss="modal" @click="isDataEmpty = false">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      new_hotel_name: "",
      new_hotel_address: "",
      new_hotel_number: "",
      new_hotel: {},
      isDataEmpty: false
    };
  },
  methods: {
    addHotel() {
      if (this.new_hotel_name == "" || this.new_hotel_address == "") {
        this.isDataEmpty = true;
        return;
      }
      this.new_hotel = {
        name: this.new_hotel_name,
        address: this.new_hotel_address,
        number: this.new_hotel_number
      };
      this.$emit("new-hotel", this.new_hotel);
    }
  }
};
</script>

<style>
.error-message {
  color: rgb(255, 0, 0);
}
</style>
