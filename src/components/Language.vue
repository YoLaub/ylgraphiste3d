<script setup>
import { ref } from 'vue'
import { useLang } from '../composables/useLang.js'

const showLanguages = ref(false)
const { currentLang } = useLang()

function toggleLangMenu() {
  showLanguages.value = !showLanguages.value
}

function setLang(code) {
  const langs = {
    ES: { code: 'ES', img: '/images/lang/ES.png', alt: 'drapeau espagnol' },
    EN: { code: 'EN', img: '/images/lang/UK.png', alt: 'drapeau anglais' },
    FR: { code: 'FR', img: '/images/lang/FR.png', alt: 'drapeau français' },
    PG: { code: 'PG', img: '/images/lang/PG.png', alt: 'drapeau portugais' },
  }

  currentLang.value = langs[code]
  showLanguages.value = false
}

</script>

<template>
  <aside class="fixed top-55 right-0 z-50 bg-text p-2 rounded-s-sm flex flex-col gap-1.5 font-bold">
    <!-- Bouton principal -->
    <div style="color: #FAE4CE">
      <img @click="toggleLangMenu" class="cursor-pointer w-6" :src="currentLang.img" :alt="currentLang.alt" />

    </div>

    <!-- Transition des langues -->
    <Transition name="fade">
      <div v-if="showLanguages" class="flex flex-col gap-1">
        <a v-show="currentLang.code != 'ES'" @click.prevent="setLang('ES')" style="color: #FAE4CE"><img
            class=" object-cover w-5" src="/images/lang/ES.png" alt="drapeau espagnole"></a>
        <a v-show="currentLang.code != 'EN'" @click.prevent="setLang('EN')" style="color: #FAE4CE"><img
            class=" object-cover w-5" src="/images/lang/UK.png" alt="drapeau anglais"></a>
        <a v-show="currentLang.code != 'FR'" @click.prevent="setLang('FR')" style="color: #FAE4CE"><img
            class=" object-cover w-5" src="/images/lang/FR.png" alt="drapeau français"></a>
        <a v-show="currentLang.code != 'PG'" @click.prevent="setLang('PG')" style="color: #FAE4CE"><img
            class=" object-cover w-5" src="/images/lang/PG.png" alt="drapeau portugais"></a>
      </div>
    </Transition>
  </aside>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
