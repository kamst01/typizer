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
        // TODO: can these methods go into seperate modules/files?
        // TODO: how can I refactor these methods?
        startRace() {
            const inputElement = document.getElementById('typedText');
            // reset the race before each race start
            this.resetRace();
            // focus, 
            inputElement.focus();
            // remove disabled attribue,
            inputElement.removeAttribute('disabled');
            // then automatically select the input so the user doesn't have to
            inputElement.select();
            // start a stop watch
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
            // reset the race before each race start
            this.resetRace();
            // remove the maxlength attribute that limits the user typing more after a race finish, or messup
            inputElement.removeAttribute('maxlength');
            // get the next quote from api
            nextQuote();
        },
        resetRace() {
            const quoteElement = document.getElementById('quote');
            const arrayOfQuote = quoteElement.querySelectorAll('span');
            const inputElement = document.getElementById('typedText');
            // clear stop watch
            clearInterval(this.stopWatch);
            // reset time elapsed data
            this.timeElapsed = 0;
            // reset wpm data
            this.wpm = 0;
            // reset the input html element's inner value
            inputElement.value = '';
            // for each span element within the paragraph quote element 
            // & remove any stylings
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
