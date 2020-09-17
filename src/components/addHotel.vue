<template>
  <div class="modal-dialog modal-dialog-centered add__hotel" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title w-100 text-center">
           {{ hotel ? `Update details for ${hotel.name} ` : "Add a hotel" }}
        </div>
      </div>
      <div class="modal-body">
        <!-- {{ hotel.name }} -->
        <div class="input-group">
          <label for="hotelName">Hotel Name</label>
          <input id="hotelName" v-model="new_hotel_name" />
          <br />
          <label for="hotelAddress">Address</label>
          <input id="hotelAddress" v-model="new_hotel_address" />
          <br />
          <label for="hotelNumber">Number</label>
          <input id="hotelNumber" v-model="new_hotel_number" />
          <br />
          <label for="hotelDescription">Description (optional)</label>
          <textarea id="hotelDescription" rows="3" v-model="new_hotel_description" />
          <br />
          <div class="image">
            <label class="custom-file-upload">
              <input type="file" accept="image/*" @change="onFileChange" />
              Upload A Picture
            </label>
            <div v-if="image">
              <img :src="image" height="100" width="100" />
            </div>  
          </div>

          <p class="error-message" v-if="isDataEmpty">
            {{ errorMessage }}
          </p>

        </div>
          <button
            class="btn btn-primary add-btn"
            :data-dismiss="isDataEmpty == false ? 'modal' : 0"
            @click="addHotel()"
          >
            {{ hotel ? "Update" : "Add" }}
          </button>
      </div>
      <div class="modal-footer">
        <button
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="(isDataEmpty = false), clear()"
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

// import getArrayofBase from '../helper/base64decoder';

const URL = "https://hotels-api-deploy.herokuapp.com/hotels";

export default {
  data() {
    return {
      new_hotel_name: "",
      new_hotel_address: "",
      new_hotel_number: "",
      new_hotel_description: "",
      new_hotel: {},
      isDataEmpty: "",
      file: "",
      image: "",
      myFiles: [],
      errorMessage: "Please add all fields."
    };
  },
  props: ["hotel"],
  methods: {
    addHotel() {
      if (!this.new_hotel_name || !this.new_hotel_address ||!this.new_hotel_number || !this.image ) {
        this.isDataEmpty = true;
        return;
      }
      this.new_hotel = {
        name: this.new_hotel_name,
        address: this.new_hotel_address,
        number: this.new_hotel_number,
        image: this.image,
        description: this.new_hotel_description
      };
      if (this.hotel) {
        this.$axios
          .patch(URL + `/${this.hotel._id}`, this.new_hotel)
          .catch(error => {
            this.isDataEmpty = true;
            this.errorMessage = error.message;
          });
      } else {
        this.$axios
          .post(URL, this.new_hotel)
          .catch(error => {
            this.isDataEmpty = true;
            this.errorMessage = error.message;
          });
      }
      this.$emit('success')
    },
    clear() {
      this.new_hotel_name = this.new_hotel_address = this.new_hotel_number = this.image ="";
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    updateField() {
      (this.new_hotel_name = this.hotel.name),
      (this.new_hotel_address = this.hotel.address),
      (this.new_hotel_number = this.hotel.number),
      (this.new_hotel_description = this.hotel.description),
      (this.image = this.hotel.image);
    }
  },
  async mounted() {
    if (this.hotel) {
     await this.updateField();
    } else {
      this.hotel = "";
    }
  },
  watch: {
    hotel: function() {
      this.updateField();
    }
  }
};
</script>

<style>
.add__hotel .error-message {
  color: rgb(255, 0, 0);
}

.add__hotel .input-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
}

.add__hotel .input-group input, .add__hotel textarea {
  padding: 10px;
  border: 2px solid rgb(194, 194, 196);
  text-align: center;
}

.add__hotel .custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
}

.add__hotel input:focus{
    outline: none;
    border: 2px solid blueviolet;
    background-color: rgb(238, 244, 246);
}

.add__hotel input[type="file"] {
    display: none;
}

.add__hotel .image {
  display: flex;
  justify-content: space-between;
}

.add__hotel .add-btn {
  width: 100%;
  margin-top: 30px;
}

.add__hotel .image label {
  padding: 40px;
}
</style>
