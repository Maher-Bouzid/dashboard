<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <form>
          <md-card>
            <md-card-header data-background-color="green">
              <h4 class="title">Edit Profile</h4>
              <p class="category">Complete your profile</p>
            </md-card-header>

            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-size-100">
                  <h2>General Info</h2>
                </div>
                <div class="md-layout-item md-size-100">
                  <md-field>
                    <label>Product title</label>
                    <md-input v-model="title" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100">
                  <md-field maxlength="5">
                    <label>Product description</label>
                    <md-textarea v-model="description"></md-textarea>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-25">
                  <md-field>
                    <label>Gender</label>
                    <md-input v-model="gender" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-25">
                  <md-field>
                    <label>Category</label>
                    <md-input v-model="category" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-25">
                  <md-field>
                    <label>Price</label>
                    <md-input v-model="price" type="number"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-25">
                  <md-field>
                    <label>Tags</label>
                    <md-input v-model="tags" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100">
                  <h2>Colors and Sizes variants</h2>
                </div>
                <div class="md-layout-item md-size-100" v-for="(item, index) in availability" :key="index">
                  <div class="md-layout">
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <div class="md-autocomplete">
                        <md-autocomplete class="search" v-model="item.color" :md-options="HTMLColors">
                          <label>Choose the color...</label>
                        </md-autocomplete>
                      </div>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <md-field>
                        <label>Size</label>
                        <md-input v-model="item.size" type="text"></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <md-field>
                        <label>Quantity</label>
                        <md-input v-model="item.quantity" type="number"></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <md-button @click="removeItem" class="md-danger md-just-icon md-small-size" style="height: 30px; min-width: 31px; width: 30px;">
                        <md-icon>close</md-icon>
                      </md-button>
                    </div>
                  </div>
                </div>

                <div class="md-layout-item md-size-100">
                  <md-button type="button" class="md-success md-round" @click="AddItem">Add variant</md-button>
                </div>
                <div class="md-layout-item md-size-100">
                  <h3>Images Upload</h3>
                </div>
                <div class="md-layout-item md-size-100">
                  <div class="md-layout">
                    <div class="md-layout-item md-size-25" v-for="(item, index) in images" :key="index">
                      <div class="fileinput fileinput-new text-center" data-provides="fileinput">
                        <div class="fileinput-new thumbnail">
                          <img :src="item.defaultImage" alt="..." />
                        </div>
                        <div class="fileinput-preview fileinput-exists thumbnail"></div>
                        <div>
                          <span class="btn btn-primary btn-round btn-file">
                            <span v-if="item.isDefault" class="fileinput-new">Select image</span>
                            <span v-else class="fileinput-new">Change</span>
                            <input :id="index" type="file" name="..." @change="imageChange" />
                          </span>
                          <span :id="index" v-if="!item.isDefault" @click="imageRemove" class="btn btn-danger btn-round btn-file">
                            <span :id="index" class="fileinput-new"><i class="fa fa-times"></i> Remove</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="md-layout-item md-size-50 text-left">
                  <md-button class="md-success md-round" @click="addImage">Add another image</md-button>
                </div>
                <div class="md-layout-item md-size-50 text-right">
                  <md-button class="md-raised md-success">Update Profile</md-button>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: null,
      description: null,
      price: null,
      tags: [],
      category: null,
      gender: null,
      imagecount: 1,
      images: [
        {
          isDefault: true,
          defaultImage: require("@/assets/img/image_placeholder.jpg")
        }
      ],
      isDefault1: true,
      isDefault2: true,
      isDefault3: true,
      isDefault4: true,
      defaultImage1: require("@/assets/img/image_placeholder.jpg"),
      defaultImage2: require("@/assets/img/image_placeholder.jpg"),
      defaultImage3: require("@/assets/img/image_placeholder.jpg"),
      defaultImage4: require("@/assets/img/image_placeholder.jpg"),
      selectedColor: null,
      availability: [
        {
          color: "",
          size: "",
          quantity: 0
        }
      ],
      HTMLColors: [
        "Pink",
        "LightPink",
        "HotPink",
        "DeepPink",
        "PaleVioletRed",
        "MediumVioletRed",
        "LightSalmon",
        "Salmon",
        "DarkSalmon",
        "LightCoral",
        "IndianRed",
        "Crimson",
        "Firebrick",
        "DarkRed",
        "Red",
        "OrangeRed",
        "Tomato",
        "Coral",
        "DarkOrange",
        "Orange",
        "Yellow",
        "LightYellow",
        "LemonChiffon",
        "LightGoldenrodYellow ",
        "PapayaWhip",
        "Moccasin",
        "PeachPuff",
        "PaleGoldenrod",
        "Khaki",
        "DarkKhaki",
        "Gold",
        "Cornsilk",
        "BlanchedAlmond",
        "Bisque",
        "NavajoWhite",
        "Wheat",
        "Burlywood",
        "Tan",
        "RosyBrown",
        "SandyBrown",
        "Goldenrod",
        "DarkGoldenrod",
        "Peru",
        "Chocolate",
        "SaddleBrown",
        "Sienna",
        "Brown",
        "Maroon",
        "DarkOliveGreen",
        "Olive",
        "OliveDrab",
        "YellowGreen",
        "LimeGreen",
        "Lime",
        "LawnGreen",
        "Chartreuse",
        "GreenYellow",
        "SpringGreen",
        "MediumSpringGreen ",
        "LightGreen",
        "PaleGreen",
        "DarkSeaGreen",
        "MediumAquamarine",
        "MediumSeaGreen",
        "SeaGreen",
        "ForestGreen",
        "Green",
        "DarkGreen",
        "Aqua",
        "Cyan",
        "LightCyan",
        "PaleTurquoise",
        "Aquamarine",
        "Turquoise",
        "MediumTurquoise",
        "DarkTurquoise",
        "LightSeaGreen",
        "CadetBlue",
        "DarkCyan",
        "Teal",
        "LightSteelBlue",
        "PowderBlue",
        "LightBlue",
        "SkyBlue",
        "LightSkyBlue",
        "DeepSkyBlue",
        "DodgerBlue",
        "CornflowerBlue",
        "SteelBlue",
        "RoyalBlue",
        "Blue",
        "MediumBlue",
        "DarkBlue",
        "Navy",
        "MidnightBlue",
        "Lavender",
        "Thistle",
        "Plum",
        "Violet",
        "Orchid",
        "Fuchsia",
        "Magenta",
        "MediumOrchid",
        "MediumPurple",
        "BlueViolet",
        "DarkViolet",
        "DarkOrchid",
        "DarkMagenta",
        "Purple",
        "Indigo",
        "DarkSlateBlue",
        "SlateBlue",
        "MediumSlateBlue ",
        "White",
        "Snow",
        "Honeydew",
        "MintCream",
        "Azure",
        "AliceBlue",
        "GhostWhite",
        "WhiteSmoke",
        "Seashell",
        "Beige",
        "OldLace",
        "FloralWhite",
        "Ivory",
        "AntiqueWhite",
        "Linen",
        "LavenderBlush",
        "MistyRose",
        "Gainsboro",
        "LightGray",
        "Silver",
        "DarkGray",
        "Gray",
        "DimGray",
        "LightSlateGray",
        "SlateGray",
        "DarkSlateGray",
        "Black"
      ].sort()
    };
  },
  methods: {
    imgCountFn() {
      if (this.imagecount < 5) {
        this.imagecount++;
      } else {
        //raise alert
      }
    },
    AddItem() {
      this.availability.push({
        name: "",
        quantity: 0,
        amount: 0,
        total: 0
      });
      console.log(this.availability);
    },
    removeItem() {
      this.availability.splice(this.availability, 1);
    },
    imageChange(e, arg) {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        this.images[e.target.id].defaultImage = reader.result;
      };
      this.images[e.target.id].isDefault = false;
      reader.readAsDataURL(file);
    },
    imageRemove(e) {
      this.images[e.path[0].id].defaultImage = require("@/assets/img/image_placeholder.jpg");
      this.images[e.path[0].id].isDefault = true;
    },
    addImage() {
      if (this.images.length < 4) {
        this.images.push({
          isDefault: true,
          defaultImage: require("@/assets/img/image_placeholder.jpg")
        });
      } else {
        //notif max limit
      }
    }
  }
};
</script>

<style scoped>
/deep/ .btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.46875rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
/deep/ .btn:not(:disabled):not(.disabled) {
  cursor: pointer;
}
/deep/ .btn-link {
  font-weight: 400;
  color: #9c27b0;
  background-color: transparent;
}
/deep/ .btn-lg,
/deep/ .btn-group-lg > .btn {
  padding: 1.125rem 2.25rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
}
/deep/ .btn {
  position: relative;
  padding: 12px 30px;
  margin: 0.3125rem 1px;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.428571;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  border-radius: 0.2rem;
  outline: 0;
  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: box-shadow, transform;
}
/deep/ .btn.btn-rose {
  color: #fff;
  background-color: #e91e63;
  border-color: #e91e63;
  box-shadow: 0 2px 2px 0 rgba(233, 30, 99, 0.14), 0 3px 1px -2px rgba(233, 30, 99, 0.2), 0 1px 5px 0 rgba(233, 30, 99, 0.12);
}
/deep/ .btn.btn-rose.btn-link {
  background-color: transparent;
  color: #e91e63;
  box-shadow: none;
}
/deep/ .btn.btn-danger {
  color: #fff;
  background-color: #f44336;
  border-color: #f44336;
  box-shadow: 0 2px 2px 0 rgba(244, 67, 54, 0.14), 0 3px 1px -2px rgba(244, 67, 54, 0.2), 0 1px 5px 0 rgba(244, 67, 54, 0.12);
}
/deep/ .btn,
/deep/ .btn.btn-default {
  color: #fff;
  background-color: #999999;
  border-color: #999999;
  box-shadow: 0 2px 2px 0 rgba(153, 153, 153, 0.14), 0 3px 1px -2px rgba(153, 153, 153, 0.2), 0 1px 5px 0 rgba(153, 153, 153, 0.12);
}
/deep/ .btn.btn-link,
/deep/ .btn.btn-default.btn-link {
  background-color: transparent;
  color: #999999;
  box-shadow: none;
}
/deep/ .btn.btn-white,
/deep/ .btn.btn-white:focus,
/deep/ .btn.btn-white:hover {
  background-color: #fff;
  color: #999999;
}
/deep/ .btn.btn-white.btn-link {
  color: #fff;
  background: transparent;
  box-shadow: none;
}
/deep/ .btn.btn-lg,
/deep/ .btn-group-lg > .btn,
/deep/ .btn-group-lg .btn {
  padding: 1.125rem 2.25rem;
  font-size: 0.875rem;
  line-height: 1.333333;
  border-radius: 0.2rem;
}
/deep/ .btn.btn-sm,
/deep/ .btn-group-sm > .btn,
/deep/ .btn-group-sm .btn {
  padding: 0.40625rem 1.25rem;
  font-size: 0.6875rem;
  line-height: 1.5;
  border-radius: 0.2rem;
}
/deep/ .btn.btn-round {
  border-radius: 30px;
}
/deep/ .btn.btn-fab,
/deep/ .btn.btn-just-icon {
  font-size: 24px;
  height: 41px;
  min-width: 41px;
  width: 41px;
  padding: 0;
  overflow: hidden;
  position: relative;
  line-height: 41px;
}
/deep/ .btn.btn-fab .material-icons,
/deep/ .btn.btn-fab .fa,
/deep/ .btn.btn-just-icon .material-icons,
/deep/ .btn.btn-just-icon .fa {
  margin-top: 0;
  position: absolute;
  width: 100%;
  transform: none;
  left: 0;
  top: 0;
  height: 100%;
  line-height: 41px;
  font-size: 20px;
}
/deep/ .navbar form .btn {
  margin-bottom: 0;
}
/deep/ .login-page .card-login .social-line .btn {
  margin-left: 5px;
  margin-right: 5px;
}

img {
  vertical-align: middle;
  border-style: none;
}

::-webkit-file-upload-button {
  font: inherit;
  -webkit-appearance: button;
}
/deep/ .btn-file {
  position: relative;
  overflow: hidden;
  vertical-align: middle;
}
/deep/ .thumbnail {
  border: 0 none;
  border-radius: 4px;
  padding: 0;
}

/deep/ .btn-file > input {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  font-size: 23px;
  cursor: pointer;
  filter: alpha(opacity=0);
  opacity: 0;
  direction: ltr;
}

/deep/ .fileinput {
  display: inline-block;
  margin-bottom: 9px;
}

/deep/ .fileinput .thumbnail {
  display: inline-block;
  margin-bottom: 10px;
  overflow: hidden;
  text-align: center;
  vertical-align: middle;
  max-width: 250px;
  box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
}
/deep/ .fileinput .thumbnail > img {
  max-height: 100%;
  width: 100%;
}
/deep/ .fileinput .btn {
  vertical-align: middle;
}
/deep/ .fileinput-exists .fileinput-new,
/deep/ .fileinput-new .fileinput-exists {
  display: none;
}
/deep/ .fileinput .thumbnail.img-circle {
  border-radius: 50%;
  max-width: 100px;
}
/deep/ .fileinput .thumbnail > img {
  max-height: 100%;
  width: 100%;
}
/deep/ .fileinput .btn {
  vertical-align: middle;
}
/deep/ .fileinput-exists .fileinput-new,
/deep/ .fileinput-new .fileinput-exists {
  display: none;
}
/deep/ .thumbnail {
  border: 0 none;
  border-radius: 4px;
  padding: 0;
}
/deep/ .btn.btn-rose {
  color: #fff;
  background-color: #e91e63;
  border-color: #e91e63;
  box-shadow: 0 2px 2px 0 rgba(233, 30, 99, 0.14), 0 3px 1px -2px rgba(233, 30, 99, 0.2), 0 1px 5px 0 rgba(233, 30, 99, 0.12);
}
/deep/ .btn.btn-rose.btn-link {
  background-color: transparent;
  color: #e91e63;
  box-shadow: none;
}
/deep/ .btn.btn-danger {
  color: #fff;
  background-color: #f44336;
  border-color: #f44336;
  box-shadow: 0 2px 2px 0 rgba(244, 67, 54, 0.14), 0 3px 1px -2px rgba(244, 67, 54, 0.2), 0 1px 5px 0 rgba(244, 67, 54, 0.12);
}
/deep/ .btn,
/deep/ .btn.btn-default {
  color: #fff;
  background-color: #999999;
  border-color: #999999;
  box-shadow: 0 2px 2px 0 rgba(153, 153, 153, 0.14), 0 3px 1px -2px rgba(153, 153, 153, 0.2), 0 1px 5px 0 rgba(153, 153, 153, 0.12);
}
</style>
