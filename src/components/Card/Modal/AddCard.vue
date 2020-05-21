<template>
  <q-card>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <q-card-section class="row">
        <div class="text-h6">Add Card</div>
        <q-space/>
        <q-btn flat round dense size="x-small" icon="close" v-close-popup/>
      </q-card-section>

      <q-card-section class="row justify-center" >
        <q-img
          :src="cardToSubmit.url === null ? 'error' : cardToSubmit.url"
          @click="showPhotoUpload('profile')"
          style="height: 140px"
        >
        <template v-slot:error>
          <div class="absolute-full flex flex-center bg-negative text-white">
            Cannot load image
          </div>
        </template>
        </q-img>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          readonly
          v-model="cardToSubmit.url"
          label="Image url"
          :rules="[val => !!val || 'Field is required']
        "/>
        <q-input
          outlined
          clearable
          autofocus
          v-model="cardToSubmit.text"
          label="Text"
          :rules="[val => !!val || 'Field is required']
        "/>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="SAVE" color="primary" type="submit"/>
      </q-card-actions>
    </q-form>
    <q-dialog v-model="photoUpload" transition-hide="scale" transition-show="scale" @before-hide="resetPhotoType">
      <my-q-uploader
        label="Please Upload a Photo"
        :prefixPath="prefixPath"
        @uploaded="uploadComplete">
      </my-q-uploader>
    </q-dialog>
  </q-card>
</template>
<script>
import { mapActions } from 'vuex'
import MyQUploader from 'src/components/uploader/MyQUploader'
import { uid } from 'quasar'

export default {
  components: {
    MyQUploader
  },
  props: ['card', 'id'],
  data () {
    return {
      cardToSubmit: {
        url: null,
        text: null,
        checked: false
      },
      photoUpload: false,
      photoType: '',
      imageUID: uid()
    }
  },
  methods: {
    ...mapActions('cards', ['addCard']),
    onSubmit () {
      this.addCard(this.cardToSubmit)
      this.$emit('close')
    },
    uploadComplete (info) {
      // const uid = firebase.auth().currentUser.uid
      const fileNames = []
      info.files.forEach(file => {
        fileNames.push(file.name)
        this.cardToSubmit.url = file.link
        // firebase.database().ref('users/' + uid).update({ image: file.link })
      })
      this.photoUpload = false
      // Object.assign(this.formData, this.user)
      /*
      this.$q.notify({
        message: 'Successfully uploaded your photo',
        color: 'positive'
      })
      */
    },
    showPhotoUpload (type) {
      this.photoUpload = true
      this.photoType = type
    },
    resetPhotoType () {
      this.photoType = ''
    }
  },
  computed: {
    prefixPath () {
      const path = `cards/${this.imageUID}.`
      return path
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
