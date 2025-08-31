// useLang.js
import { ref } from 'vue'

const currentLang = ref({
  code: 'FR',
  img: '/images/lang/FR.png',
  alt: 'drapeau français'
})

export function useLang() {
  return {
    currentLang
  }
}