<script setup>
import { ref } from 'vue';

defineProps({
    text: String,
})

const compteur = ref(0);


const AddCompteur = () => {
    compteur.value++
    console.log(compteur.value)
}

</script>
<template>
<p>
    {{ compteur }}
</p>
<button @click="AddCompteur" value={{bouton1}}>
    {{text = "You can assing the text from the componement"}}
</button>
<br>
<button value={{bouton2}}>
    {{text = "Another one "}}
</button>
<form>
    
</form>
<br>
</template>