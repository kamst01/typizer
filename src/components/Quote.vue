<script setup>
import { fetchRandomQuote, quote } from './api/fetchRandomQuote';
// get the intial quote, on page load.
fetchRandomQuote();
</script>

<template>
    <div>
        <p id="quote" class="text-2xl text-gray-900 font-semibold">
            <span v-for="(character, i) in quote.content.value.split('')" :key='`character-${i}`'>{{ character }}</span>
        </p>
    </div>
</template>