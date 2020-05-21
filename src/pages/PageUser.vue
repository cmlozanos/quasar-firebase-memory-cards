<template>
  <q-page padding>
    <q-form
      @submit="onSubmit"
      class="q-mt-md"
    >
      <div class="row">
        <div class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
          <div class="q-pa-sm">
            <q-img :src="formData.image" @click="showPhotoUpload('profile')">
            </q-img>
          </div>
        </div>
        <div class="col-xs-12 col-sm-8 col-md-19 col-lg-10">
          <div class="q-pa-sm">

            <q-input
              filled
              v-model="formData.mail"
              label="Your email *"
              disable
              type="email"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type an email']"
            />

            <q-input
              filled
              v-model="formData.name"
              label="Your Name"
              type="text"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type a name']"
            />

          </div>
        </div>
      </div>
      <div class="row justify-end">
        <q-btn label="Save" type="submit" color="primary" class="q-ml-sm"/>
      </div>
    </q-form>
    <q-dialog v-model="photoUpload" transition-hide="scale" transition-show="scale" @before-hide="resetPhotoType">
      <my-q-uploader
        label="Please Upload a Photo"
        :prefixPath="prefixPath"
        @uploaded="uploadComplete">
      </my-q-uploader>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import MyQUploader from 'src/components/uploader/MyQUploader'
import { firebase } from 'boot/firebase'

export default {
  components: {
    MyQUploader
  },
  data () {
    return {
      formData: {
        mail: null,
        image: null,
        name: null
      },
      photoUpload: false,
      photoType: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['user']),
    prefixPath () {
      const uid = firebase.auth().currentUser.uid
      const path = `${uid}/${this.photoType}Photo/${this.photoType}Photo.`
      return path
    }
  },
  mounted () {
    Object.assign(this.formData, this.user)
  },
  methods: {
    ...mapActions('auth', ['updateUser']),
    onSubmit () {
      this.updateUser(this.formData)
    },
    uploadComplete (info) {
      const fileNames = []
      info.files.forEach(file => fileNames.push(file))
      this.photoUpload = false
      Object.assign(this.formData, this.user)
      this.$q.notify({
        message: `Successfully uploaded your photo: ${fileNames}`,
        color: 'positive'
      })
    },
    showPhotoUpload (type) {
      this.photoUpload = true
      this.photoType = type
    },
    resetPhotoType () {
      this.photoType = ''
    }
  }
}
</script>
