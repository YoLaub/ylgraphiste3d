<script setup>
import Concept from '../components/Concept.vue'
import PortfolioGrid from '../components/PortfolioGrid.vue'
import Formulaire from '../components/Formulaire.vue'
import axios from 'axios'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLang } from '../composables/useLang.js'

const route = useRoute()

const showInfo = ref(false)


const showForm = ref(false)

const { currentLang } = useLang()
const pages = ref([])
const contents = ref([])
const pageWithContent = ref([])

const forms = ref([]);


function openForm() {
  showForm.value = true
}

function closeForm() {
  showForm.value = false
}

const carte = ref([])

async function fetchData() {
  try {
    const base = `/data/${currentLang.value.code}`
    const [pageRes, contentRes, catRes,formRes] = await Promise.all([
      axios.get(`${base}/page.json`),
      axios.get(`${base}/pageContain.json`),
      axios.get(`${base}/carte.json`),
      axios.get(`${base}/formulaire.json`)
    ])

    pages.value = pageRes.data
    contents.value = contentRes.data
    carte.value = catRes.data
    forms.value = formRes.data

    // Filtrer la page correspondant à la route
    const currentPages = pages.value.filter(p => p.nom === route.name)

    // Fusionner contenu avec les items associés
    pageWithContent.value = currentPages.map(page => ({
      ...page,
      items: contents.value.filter(c => c.pageId === page.id)
    }))
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error)
  }
}


onMounted(fetchData)
watch(currentLang, fetchData,)


</script>

<template>
  <div class="Homepage">
  <section  v-for="page in pageWithContent" :key="page.id">
  <div class="py-4">
    <h1 class="text-text text-start text-2xl lg:text-3xl xl:px-80 px-10">
      {{ page.titre.split('*')[0]?.trim() }}
      <span class="text-accent">{{ page.titre.split('*')[1]?.trim() }}</span>
    </h1>
  </div>


    <!--INTRO-->
    <section class=" mt-8 py-8 lg:py-0 px-10 xl:px-50 flex flex-wrap items-center">
      <Concept v-for="item in page.items.filter(i => i.type === 'concept')" :key="item.id" :cat="item" />
    </section>



    <!--Prestation-->
    <section class="my-10">
      <PortfolioGrid :cat="carte" v-for="item in page.items.filter(i => i.type === 'portfolio')" :key="item.id" :contain="item" />
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

          <section v-if="showForm" class="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-auto bg-text/70"
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
.menu {
  margin-top: 100px;
  margin-bottom: 100px;
}

.image-menu {
  position: relative;
  width: 848px;
  height: 536px;
}

.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.3s ease;
}

.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
