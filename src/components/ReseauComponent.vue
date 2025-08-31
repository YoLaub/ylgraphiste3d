<script setup>
import Instagram from '../components/icon/Instagram.vue';
import WhatApp from '../components/icon/WhatApp.vue';
import { useLang } from '../composables/useLang.js'

const { currentLang } = useLang()
</script>

<template>
    <aside  class="fixed top-10 right-0 z-50 bg-text p-2 rounded-s-sm flex flex-col gap-2">
        <a href="https://www.instagram.com/yl.graphiste3d/"  target="_blank" rel="noopener noreferrer"><Instagram/></a>
        <a href="https://wa.me/33666389355" target="_blank"><WhatApp/></a>
    </aside>
</template>