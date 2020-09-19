<template>
  <div class="modal-dialog modal-dialog-centered add__hotel" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title w-100 text-center">
           {{ hotel ? `Update details for ${hotel.name} ` : "Add a hotel" }}
        </div>
      </div>
      <div class="modal-body">
        <form class="input-group" @submit.prevent>
          <div class="field">
            <label for="hotelName">Hotel Name</label>
            <div class="input__field">
              <i class="fas fa-hotel"></i> 
              <input id="hotelName" v-model="new_hotel_name" />
            </div>
          </div>
          <div class="hotel__address field">
            <label for="hotelAddress">Address</label>
            <div class="input__field">
              <i class="fas fa-map-marker"></i> 
              <input id="hotelAddress" v-model="new_hotel_address" />
            </div>
          </div>
          <div class="hotel__number field">
            <label for="hotelNumber">Number</label>
            <div class="input__field">
              <i class="fas fa-phone"></i> 
              <input id="hotelNumber" v-model="new_hotel_number" />
            </div>
          </div>
          <div class="hotel__description field">
            <label for="hotelDescription"><i class="fas fa-info-circle"></i> Description (optional)</label>
            <textarea id="hotelDescription" rows="3" v-model="new_hotel_description" />
          </div>
          <div class="image">
            <label class="custom-file-upload">
              <input type="file" accept="image/*" @change="onFileChange" />
              Click here to upload a picture
            </label>
            <div v-if="image">
              <img :src="image" height="100" width="100" />
            </div>
            <div v-else>
              <img src="../images/not-available.png" height="100" width="100" />
            </div>  
          </div>

          <p class="error-message" v-if="isDataEmpty">
            {{ errorMessage }}
          </p>

          <button
            class="btn btn-primary add-btn"
            type="submit"
            @click="addHotel()"
            :data-dismiss="isDataEmpty == false ? 'modal' : 0"
          >
            {{ hotel ? "Update" : "Add" }}
          </button>
        </form>
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

.add__hotel .input__field {
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: rgb(252, 250, 250);
}

.add__hotel .input__field input {
  border: none;
  flex: 1;
  font-size: 22px;
}

.add__hotel .input__field input:focus {
  outline: none;
}

.add__hotel textarea {
  width: 95%;
  margin: 0 auto;
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
  padding: 20px;
  background-color: rgb(241, 240, 240);
}

.add__hotel .field {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  width: 100%;
  position: relative;
}
</style>
