<template>
  <section class="mx-auto max-w-7xl p-6">
    <header class="mb-8 text-center">
      <h2 class="text-3xl font-semibold tracking-tight">{{ contain.titre }}</h2>
      <p class="mt-2 text-neutral-600">{{ contain.texte }}</p>
    </header>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="plan in cat"
        :key="plan.id"
        class="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
      >
        <div class="p-6 flex flex-col gap-4">
          <h3 class="text-xl font-semibold text-neutral-900">{{ plan.title }}</h3>
          <p class="text-3xl font-bold text-neutral-900">{{ plan.price }}</p>
          <ul class="mt-2 space-y-2">
            <li
              v-for="(feature, idx) in plan.features"
              :key="idx"
              class="flex items-center gap-2 text-sm text-neutral-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-4 w-4 text-green-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {{ feature }}
            </li>
          </ul>
        </div>

      
      </article>
    </div>
  </section>
</template>

<script setup>
defineProps({
  contain: Object,
  cat: Object
  
})
</script>

<!--
USAGE EXEMPLE :

<template>
  <PricingCards :plans="offers" />
</template>

<script setup>
import PricingCards from '@/components/PricingCards.vue'

const offers = [
  {
    id: 'conseil',
    title: 'Conseil',
    price: '49€',
    features: ['Audit rapide', '1h de call', 'Rapport PDF'],
  },
  {
    id: 'starter',
    title: 'Starter',
    price: '199€',
    features: ['Setup technique', 'Design landing', 'Support 1 mois'],
  },
  {
    id: 'premium',
    title: 'Premium',
    price: '499€',
    features: ['Site complet', 'SEO', 'Maintenance 3 mois'],
  },
]
</script>

-->