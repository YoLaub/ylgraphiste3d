<template>
  <div class="page min-h-350 flex flex-col">
    <Header />

    <main class="flex-1 relative overflow-hidden pt-8">
      <Reseau />
      <Language />

      <!-- Animation entre routes -->
      <router-view v-slot="{ Component }">
        <transition name="slide" mode="out-in">
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>

      <Up />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Up from '../components/icon/Up.vue'
import Reseau from '../components/ReseauComponent.vue'
import Language from '../components/Language.vue'
</script>

<style scoped>
/* Animation slide gauche → droite */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
