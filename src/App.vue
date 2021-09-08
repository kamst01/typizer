<script setup>
import {ref} from 'vue';
import {nextQuote, quote} from './components/api/fetchRandomQuote.js';
import Quote from "./components/Quote.vue";
import UserTypedText from "./components/UserTypedText.vue";
import Button from './components/Button.vue';
</script>

<script>
export default {
    data() {
        return {
            stopWatch: ref(undefined),
            timeElapsed: ref(0),
            charactersTyped: ref(0),
            wpm: ref(0),
            nextRaceText: 'Next Race',
            startRaceText: 'Start Race',
        }
    },
    methods: {
        startRace() {
            const inputElement = document.getElementById('typedText');
            this.resetRace();
            inputElement.focus();
            inputElement.removeAttribute('disabled');
            inputElement.select();
            this.stopWatch = setInterval(() => {
                this.timeElapsed++;
            }, 1000);
        },
        stopRace() {
            const inputElement = document.getElementById('typedText');
            // clear the stop watch
            clearInterval(this.stopWatch);
            // disable anymore typing
            inputElement.setAttribute('disabled', true);
            // calculate wpm
            this.wpm = Math.round((((this.charactersTyped / 5) / this.timeElapsed) * 60));
            console.log(`completed the race! congrats! amount of chacters typed: ${this.charactersTyped}. while your wpm: ${this.wpm}.`);
        },
        nextRace() {
            const inputElement = document.getElementById('typedText');
            this.resetRace();
            inputElement.removeAttribute('maxlength');
            nextQuote();
        },
        resetRace() {
            const quoteElement = document.getElementById('quote');
            const arrayOfQuote = quoteElement.querySelectorAll('span');
            const inputElement = document.getElementById('typedText');
            clearInterval(this.stopWatch);
            this.timeElapsed = 0;
            this.wpm = 0;
            inputElement.value = '';
            arrayOfQuote.forEach((characterElement) => {
                characterElement.classList.remove('text-green-400');
                characterElement.classList.remove('text-red-500', 'bg-red-100', 'underline', 'font-semibold')
            });
        },
        watchRace() {
            const inputElement = document.getElementById('typedText');
            // increment the amount of characters typed, to reference for wpm
            this.charactersTyped++;
            // if the input value typed is equal
            // to the quote provided by the api
            if ((inputElement.value === quote.content.value)) {
                // run stop race method function
                this.stopRace();
            }
        }
    }
}
</script>

<template>
    <div class="container mx-auto">
        <Quote/>
        <UserTypedText @input="watchRace"/>
        <div class="flex flex-row items-center justify-start space-x-4 mt-4">
            <Button @clickTarget="startRace()">{{ startRaceText }}</Button>
            <Button @clickTarget="nextRace()">{{ nextRaceText }}</Button>
        </div>
    </div>
</template>
