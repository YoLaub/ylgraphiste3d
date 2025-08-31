<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import Formulaire from '../components/Formulaire.vue'
import { useRoute } from 'vue-router'
import { useLang } from '../composables/useLang.js'
import PricingCards from '../components/PricingCards.vue'
import ClientProcess from '../components/ClientProcess.vue'

const { currentLang } = useLang()

const showForm = ref(false)

const categories = ref([])
const contenus = ref([])

const route = useRoute()

const pages = ref([])
const contents = ref([])
const pageWithContent = ref([])
const processBlock = ref([])

const forms = ref([]);


const categoriesAvecContenus = ref([])


function openForm() {
  showForm.value = true
}

function closeForm() {
  showForm.value = false
}



async function fetchData() {
  try {
    const base = `/data/${currentLang.value.code}`
    const [catRes, contentRes, pageRes, contentPageRes, formRes, processRes] = await Promise.all([
      axios.get(`${base}/categorie.json`),
      axios.get(`${base}/carte.json`),
      axios.get(`${base}/page.json`),
      axios.get(`${base}/pageContain.json`),
      axios.get(`${base}/formulaire.json`),
      axios.get(`${base}/process.json`)
    ])

    categories.value = catRes.data

    // CARTE
    contenus.value = contentRes.data

    contenus.value = contenus.value.sort((a, b) => a.order - b.order)

    pages.value = pageRes.data
    contents.value = contentPageRes.data

    forms.value = formRes.data

    processBlock.value = processRes.data

    // Fusionner les contenus dans les catégories
    categoriesAvecContenus.value = categories.value.map(cat => ({
      ...cat,
      items: contenus.value.filter(item => item.catId === cat.id)
    }));

    // Filtrer la page correspondant à la route
    const currentPages = pages.value.filter(p => p.nom === route.name)

    // Fusionner contenu avec les items associés
    pageWithContent.value = currentPages.map(page => ({
      ...page,
      items: contents.value.filter(c => c.pageId === page.id)
    }))

  } catch (error) {
    console.error('Erreur de chargement des données :', error)
  }
}

onMounted(fetchData)
watch(currentLang, fetchData, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})


</script>

<template>
  <div class="Homepage">
    <section v-for="page in pageWithContent" :key="page.id">
      <div class="py-4">
        <h1 class="text-text text-start text-2xl lg:text-3xl xl:px-80 px-10">
          {{ page.titre.split('*')[0]?.trim() }}
          <span class="text-accent">{{ page.titre.split('*')[1]?.trim() }}</span>
        </h1>
      </div>

      <!--INTRO-->

      <section class=" px-10 2xl:px-80 my-2 py-5 gap-5 ">

        <PricingCards :cat="categories" v-for="item in page.items.filter(i => i.type === 'prestation')" :key="item.id"
          :contain="item" />

      </section>

      <section class=" px-5 2xl:px-80 gap-5 ">
        <ClientProcess :process="processBlock" v-for="item in page.items.filter(i => i.type === 'process')"
          :key="item.id" :cat="item" />
      </section>

      <!-- ACCES FORMULAIRE EVENEMENT-->

      <section class=" my-20">

        <div>
          <button v-for="item in page.items.filter(i => i.type === 'event-bouton')" :key="item.id" @click="openForm"
            class=" bg-primaire text-fond my-5">
            <h4 class=" text-3xl">{{ item.titre }}</h4>
          </button>

        </div>

        <!-- Détail plein écran -->
        <Teleport to="body">
          <transition name="zoom">

            <section v-if="showForm"
              class="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-auto bg-text/70"
              role="dialog" aria-modal="true">
              <button @click="closeForm" class=" relative top-17 text-accent z-15">
                ✕
              </button>
              <div class="max-w-3xl w-full relative">

                <Formulaire v-for="item in forms.filter(i => i.type === 'evenement')" :key="item.id" :form="item" />
              </div>
            </section>


          </transition>
        </Teleport>

      </section>

    </section>
  </div>
</template>

<style scoped>
.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.3s ease;
}

.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.test {
  background-color: rgba(250, 228, 206, 0.8);
  padding: 0;
  width: 80%;
  border-radius: 15% 15% 0 0;
}
</style>
