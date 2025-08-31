<script setup>
import { ref } from 'vue'
import axios from 'axios'

defineProps({
  form: Object
})


// État d'envoi
const success = ref(false)
const error = ref(false)
const loading = ref(false)

const consent = ref(false);

// Référence au formulaire
const formRef = ref(null)

const envoyerFormulaire = async () => {
  loading.value = true
  success.value = false
  error.value = false

  try {
    const formData = new FormData(formRef.value)

    await axios.post('https://formsubmit.co/ajax/yl.graphiste3d@gmail.com', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    success.value = true
    formRef.value.reset()
  } catch (err) {
    error.value = true
    console.error(err)
  } finally {
    loading.value = false
  }
}


</script>

<template>
  <form @submit.prevent="envoyerFormulaire" ref="formRef"
    class="max-w-3xl mx-auto p-10 rounded-lg shadow space-y-6 form">

    <h3 class=" text-3xl">{{ form?.titre }}</h3>
    <!-- Email -->
    <div>
      <input type="email" name="email" v-if="form.champ_1" :placeholder="form.champ_1"
        class="w-full bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
        required />
    </div>

    <div>
      <input type="text" name="object" v-if="form.champ_2" :placeholder="form.champ_2"
        class="w-full bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
        required />
    </div>

    <div>
      <textarea type="text" name="contain" v-if="form.champ_3" :placeholder="form.champ_3"
        class="w-full bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
        required></textarea>
    </div>

    <input type="text" name="_honey" style="display:none">


    <div>
      <label class="inline-flex items-center space-x-2" for="consent">
        <input type="checkbox" id="consent" v-model="consent" class="form-checkbox" required />
        <span>{{ form?.champ_7 }}</span>
      </label>
    </div>

    <div class="text-right">
      <button type="submit" :disabled="loading || !consent"
        class=" bg-primaire text-white rounded hover:bg-primaire/80 transition disabled:opacity-50">
        {{ loading ? form.etat_1 : form.etat_2 }}
      </button>
    </div>

    <!-- Message de confirmation -->
    <p v-if="success" class="text-green-600 font-medium mt-2">
      {{ form.success }}
    </p>

    <!-- Message d'erreur -->
    <p v-if="error" class="text-red-600 font-medium mt-2">
      {{ form.erreur }}
    </p>
  </form>

</template>

<style scoped>
.form {
  background-color: #EDEDED;
  border-radius: 5px;
  margin-bottom: 2em;
  width: 80%;
}
</style>