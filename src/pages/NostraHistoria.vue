<script setup>
import axios from 'axios'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLang } from '../composables/useLang.js'
import InstagramGrid from '../components/InstagramGrid.vue'
import Formulaire from '../components/Formulaire.vue'

const route = useRoute()

const { currentLang } = useLang()

const pages = ref([])
const contents = ref([])
const pageWithContent = ref([])

const forms = ref([]);


const showForm = ref(false)


function openForm() {
  showForm.value = true
}

function closeForm() {
  showForm.value = false
}

async function fetchData() {
  try {
    const base = `/data/${currentLang.value.code}`
    const [pageRes, contentRes, formRes] = await Promise.all([
      axios.get(`${base}/page.json`),
      axios.get(`${base}/pageContain.json`),
      axios.get(`${base}/formulaire.json`)
    ])

    pages.value = pageRes.data
    contents.value = contentRes.data
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
watch(currentLang, fetchData)


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

    <section class="lg:h-100 mt-10 px-10 gap-3 2xl:px-80 flex flex-wrap items-center">
      <div v-for="item in page.items.filter(i => i.type === 'nostra-concept')" :key="item.id"
        class=" flex-auto lg:flex-2/5 lg:py-10 px-5">
        <h2 class="py-4 text-start ">{{ item.titre }}</h2>
        <p class="text-start" v-html="item.texte"></p>
      </div>

      <div v-for="item in page.items.filter(i => i.type === 'mission')" :key="item.id"
        class=" py-10 flex-auto lg:flex-2/5 px-5">
        <h2 class="py-4 text-start ">{{ item.titre }}</h2>
        <p class="text-start" v-html="item.texte"></p>
      </div>

    </section>

    <section v-for="item in page.items.filter(i => i.type === 'valeur')" :key="item.id"
      class="flex flex-row p-10  mt-10 mx-auto 2xl:px-80 items-center justify-center">
      <div class=" flex-auto p-10  bg-primaire rounded-4xl">
        <h2 class=" text-fond pb-4 text-start ">{{ item.titre }}</h2>
        <p class=" text-fond text-start" v-html="item.texte"></p>
        
      </div>
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
            class="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-auto bg-text/70" role="dialog"
            aria-modal="true">
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


    <!--INSTAGRAM-->
    <section class="flex flex-row p-10 m-auto 2xl:px-80 gap-10 items-center justify-center">
      <InstagramGrid />
    </section>

  </section>
  </div>


</template>

<style scoped>
.concept p,
.concept h2 {
  color: #FAE4CE;
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
