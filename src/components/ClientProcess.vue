<template>
  <section class="mx-auto max-w-6xl p-6">
    <header class="mb-10 text-center">
      <h2 class="text-3xl font-semibold tracking-tight">{{ cat.titre }}</h2>
      <p class="mt-2 text-neutral-600">{{ cat.texte }}</p>
    </header>

    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="(step, index) in process" :key="step.id" class="flex flex-col items-center text-center relative">
        <!-- Image/Icon -->
        <div
          class="h-24 w-24 flex items-center justify-center rounded-full bg-neutral-100  mb-4 overflow-hidden shadow">
          <img :src="step.image" :alt="step.title" class="h-16 w-16 object-contain" />
        </div>

        <!-- Title -->
        <h3 class="text-lg font-semibold text-neutral-900">{{ step.title }}</h3>

        <!-- Description -->
        <p class="mt-2 text-sm text-neutral-600 max-w-xs">{{ step.description }}</p>

        <!-- Connector line -->
        <div v-if="index < process.length - 1"
          class="hidden lg:block absolute top-12 right-[-50%] h-0.5 w-full bg-neutral-200 "></div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  process: Object,
  cat: Object
  
})
</script>

<!--
USAGE EXEMPLE :

<template>
  <ClientProcess />
</template>

<script setup>
import ClientProcess from '@/components/ClientProcess.vue'
</script>

-->
