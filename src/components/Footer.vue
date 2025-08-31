<script setup>
import ReverseIcon from '../components/icon/reverse.vue';
import Instagram from '../components/icon/Instagram.vue';
import WhatApp from '../components/icon/WhatApp.vue';

import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { useLang } from '../composables/useLang.js'

const { currentLang } = useLang()
const nav = ref([])

async function fetchData() {
  try {
    const base = `/data/${currentLang.value.code}`
    const res = await axios.get(`${base}/Navigation.json`)
    nav.value = res.data

  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error)
  }
} 


// Recalcul aussi au mount
onMounted(() => {
  fetchData()
})

watch(currentLang, fetchData)

</script>


<template>
    <footer>
        <section class="flex md:flex-row xs:flex-col py-8 px-10 2xl:px-80 ">
            <div class=" text-md xs:text-center  md:text-left basis-5/12 items-center">
                <ul  v-for="item in nav" :key="item.id" :to="item.lien">
                    <li> <router-link :to="item.lien">{{ item.titre }}</router-link></li>
                </ul>
            </div>
            <div class="md:py-3 flex flex-row basis-2/12 justify-center gap-2 xs:mt-5 md:mt-0">
                <a href="https://www.instagram.com/yl.graphiste3d/"  target="_blank" rel="noopener noreferrer"><Instagram/></a>
                <a href="https://wa.me/33666389355" target="_blank"><WhatApp/></a>
            </div>
            <div class="basis-5/12 flex flex-row items-center xs:justify-center md:justify-end xs:mt-5  md:mt-0">
              <div class=" flex flex-col">
                <a class="titre xs:text-xl md:text-2xl text-fond" href="/">YlGraphiste3D Developpement web</a>
                 <ul class="text-fond mt-2">
                    <li>Tel : + 33 6 66 38 93 55 </li>
                    <li>Email : yl.graphiste3d@gmail.com</li>
                </ul>
                

              </div>
                
            </div>
        </section>
        <p class="mt-2 text-xs text-center" style="color: #EDEDED;">YlGraphiste3D - Developpement Web - Copyright 2025</p>
    </footer>
</template>

