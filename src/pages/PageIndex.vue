<template>
  <q-page class="flex flex-center bg-image">
    <div class="absolute-bottom q-pb-xl q-pl-sm q-pr-sm">
      <q-btn size="medium" color="blue-10" icon="touch_app" class="full-width" to="/game">{{$t('index.goToTheGame')}}</q-btn>
    </div>
  </q-page>
</template>

<script >
export default {
  name: 'Error404'
}
</script>
<style scope>
.bg-image {
  background-image: url('~assets/index.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.eighty-vertical-hight{
  width: 100vh !important;
  height: 100vh !important;
}
</style>
