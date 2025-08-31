<template>
  <section class="mx-auto max-w-7xl p-6">
    <header class="mb-6">
      <h2 class="text-2xl font-semibold tracking-tight">Instagram</h2>
      <p class="text-sm text-neutral-600 dark:text-neutral-300">
        Dernières photos publiées.
      </p>
    </header>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      <a
        v-for="photo in photos"
        :key="photo.id"
        :href="photo.link || '#'"
        target="_blank"
        rel="noopener"
        class="group relative block overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800 shadow-sm hover:shadow-md">
        <img
          :src="photo.src"
          :alt="photo.alt"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors"></div>
      </a>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  photos: {
    type: Array,
    default: () => [
      {
        id: 1,
        src: 'https://picsum.photos/seed/insta1/600/600',
        alt: 'Photo Instagram 1',
        link: '#',
      },
      {
        id: 2,
        src: 'https://picsum.photos/seed/insta2/600/600',
        alt: 'Photo Instagram 2',
        link: '#',
      },
      {
        id: 3,
        src: 'https://picsum.photos/seed/insta3/600/600',
        alt: 'Photo Instagram 3',
        link: '#',
      },
      {
        id: 4,
        src: 'https://picsum.photos/seed/insta4/600/600',
        alt: 'Photo Instagram 4',
        link: '#',
      },
      {
        id: 5,
        src: 'https://picsum.photos/seed/insta4/600/600',
        alt: 'Photo Instagram 4',
        link: '#',
      },
      {
        id: 6,
        src: 'https://picsum.photos/seed/insta4/600/600',
        alt: 'Photo Instagram 4',
        link: '#',
      },
    ],
  },
});
</script>

<!--
USAGE EXEMPLE (parent):

<template>
  <InstagramGrid :photos="instaPhotos" />
</template>

<script setup>
import InstagramGrid from '@/components/InstagramGrid.vue'

const instaPhotos = [
  { id: 'i1', src: '/images/insta1.jpg', alt: 'Brunch du dimanche', link: 'https://instagram.com/p/xxx' },
  { id: 'i2', src: '/images/insta2.jpg', alt: 'Nouvelle recette', link: 'https://instagram.com/p/yyy' },
  // ...
]
</script>

-->
