<template>
  <div class="fixed-center text-center">
    <p class="text-faded">
      {{ $t('index.welcome') }}
    </p>
    <p>
      <q-img
        src="~assets/index.png"
        style="width:50vw"
      >
        <div class="absolute-bottom">
          <q-btn outline icon="touch_app" class="full-width" to="/game">{{$t('index.goToTheGame')}}</q-btn>
        </div>
      </q-img>
    </p>
  </div>
</template>

<script >
export default {
  name: 'Error404'
}
</script>
