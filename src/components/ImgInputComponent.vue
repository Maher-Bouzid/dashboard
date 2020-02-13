<template>
  <div class="md-layout-item md-size-25">
    <div class="fileinput fileinput-new text-center" data-provides="fileinput">
      <div class="fileinput-new thumbnail">
        <img :src="defaultImage" alt="..." />
      </div>
      <div class="fileinput-preview fileinput-exists thumbnail"></div>
      <div>
        <span class="btn btn-rose btn-round btn-file">
          <span v-if="isDefault" class="fileinput-new">Select image</span>
          <span v-else class="fileinput-new">Change</span>
          <input type="file" name="..." @change="imageChange" />
        </span>
        <span v-if="!isDefault" @click="imageRemove" class="btn btn-danger btn-round btn-file">
          <span class="fileinput-new"><i class="fa fa-times"></i> Remove</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "input image component",
  props: {
    isDefault: {
      type: Boolean
    },
    defaultImage: {
      type: String
    }
  },
  methods: {
    imageChange(e) {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        this.defaultImage = reader.result;
      };
      this.isDefault = false;
      reader.readAsDataURL(file);
      console.log(this.defaultImage);
    },
    imageRemove(e) {
      this.defaultImage = require("@/assets/img/image_placeholder.jpg");
      this.isDefault = true;
    }
  }
};
</script>
