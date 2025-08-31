<template>
  <div class=" flex-auto lg:flex-2/4 lg:p-20">
    <h2 class=" text-lg text-start">{{ cat.titre }}</h2>
    <p class="text-start" v-html="cat.texte"></p>
    <button class="bg-primaire xs:text-xs rounded-2xl text-fond my-10"><router-link to="/menu_et_prestation">{{ cat.button }}</router-link></button>
  </div>

  <div class=" flex-auto lg:flex-2/4 lg:p-10">
    <img v-if="cat.images" class="aspect-video object-cover" :src="cat.images" alt="image engageante">
  </div>
</template>

<script setup>

defineProps({
  cat: Object
})

</script>