<template>
  <section class="mx-auto max-w-7xl p-6">
    <header class="mb-6 flex items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl md:text-3xl">{{ contain.titre }}</h1>
      </div>
      <div class="hidden sm:block text-sm text-neutral-500">{{ cat.length }} {{ contain.texte }}</div>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <article
        v-for="p in cat"
        :key="p.id"
        class="group rounded-2xl bg-white/70  ring-black/5  overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <!-- Image -->
        <div class="relative aspect-video overflow-hidden">
          <img
            :src="p.image"
            :alt="p.title"
            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <div class="absolute left-3 top-3 flex flex-wrap gap-2">
            <span
              v-if="p.featured"
              class="rounded-full bg-amber-500/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow">
              {{ contain.texte2 }}
            </span>
          </div>
        </div>

        <!-- Content -->
        <div class="flex flex-col gap-3 p-5">
          <h2 class="text-md font-semibold leading-tight">
            <a :href="p.link || p.repo || '#'" class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 rounded">
              {{ p.title }}
            </a>
          </h2>
          <p class="text-sm text-neutral-700 line-clamp-3">
            {{ p.description }}
          </p>

          <!-- Tags -->
          <ul class="mt-1 flex flex-wrap gap-2">
            <li v-for="tag in p.tags" :key="tag" class="rounded-full bg-neutral-100  px-2.5 py-1 text-[11px] font-medium text-neutral-700">
              {{ tag }}
            </li>
          </ul>

          <!-- Links -->
          <div class="mt-2 flex flex-wrap items-center gap-3">
            <a v-if="p.link" :href="p.link" target="_blank" rel="noopener" class="inline-flex items-center gap-1 text-sm font-medium hover:underline">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4"><path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-7.5 6L21 6m0 0h-5.25M21 6v5.25"/></svg>
              {{ contain.texte3 }}
            </a>
           
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
defineProps({
  cat: Object,
  contain: Object
})

</script>

<style scoped>
/* Clamp de texte sans plugin Tailwind line-clamp */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

<!--
USAGE EXEMPLE (parent):

<template>
  <PortfolioGrid :projects="myProjects" />
</template>

<script setup>
import PortfolioGrid from '@/components/PortfolioGrid.vue'

const myProjects = [
  {
    id: 'p1',
    title: 'Site vitrine artisan',
    description: 'Refonte complète avec performance & SEO.',
    image: '/images/projets/artisan.jpg',
    tags: ['Vue 3', 'Tailwind', 'SEO'],
    link: 'https://exemple.com',
    repo: 'https://github.com/you/repo',
    featured: true,
  },
  // ...
]
</script>

-->
