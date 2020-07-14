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
        <!-- <file-pond
          name="test"
          ref="pond"
          class-name="my-pond"
          label-idle="Drop hotel image here..."
          allow-multiple="false"
          accepted-file-types="image/jpeg, image/png, image/jpg"
          v-bind:files="myFiles"
          v-on:init="onFileChange"
        /> -->

        <input type="file" accept="image/*" @change="onFileChange" />
        <div v-if="image">
          <img :src="image" height="100" width="100" />
        </div>

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
        <button
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="isDataEmpty = false"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import vueFilePond, { setOptions } from "vue-filepond";
// import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
// import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// import FilePondPluginImageResize from "filepond-plugin-image-resize";
// import "filepond/dist/filepond.min.css";
// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

export default {
  data() {
    return {
      new_hotel_name: "",
      new_hotel_address: "",
      new_hotel_number: "",
      new_hotel: {},
      isDataEmpty: false,
      file: "",
      image: "",
      myFiles: []
    };
  },
  methods: {
    addHotel() {
      if (this.new_hotel_name == "" || this.new_hotel_address == "") {
        this.isDataEmpty = true;
        return;
      }
      this.isDataEmpty = false;
      this.new_hotel = {
        name: this.new_hotel_name,
        address: this.new_hotel_address,
        number: this.new_hotel_number,
        img: this.image
      };
      this.$emit("new-hotel", this.new_hotel);
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      // var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style>
.error-message {
  color: rgb(255, 0, 0);
}
</style>
