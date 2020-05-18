<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar rounded>
        <img :src="card.url">
      </q-avatar>
    </q-item-section>
    <q-item-section>{{card.checked ? card.text : 'Pending to resolve'}}</q-item-section>
    <q-item-section>
      <div class="row q-gutter-sm justify-end">
        <q-btn outline round disable :color="card.checked? 'green' : 'orange-5'" :icon="card.checked ? 'lock_open' : 'lock'"></q-btn>
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: ['card', 'id']
}
</script>
