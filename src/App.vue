<script setup>
import {ref} from 'vue';
import {nextQuote, quote} from './components/api/fetchRandomQuote.js';
import Quote from "./components/Quote.vue";
import UserTypedText from "./components/UserTypedText.vue";
import Button from './components/Button.vue';
import Header from "./components/header/Index.vue";
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
        // TODO: is having a second `@input` on UserTypedText component, while inner input element also has `@input` attribue which watches it's own scoped method, bad?
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
            const inputElement = document.getElementById('typedText');
            const quoteElement = document.getElementById('quote');
            const arrayOfQuote = quoteElement.querySelectorAll('span');
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
    <div class="min-h-screen bg-gray-100">
        <!-- Header -->
        <Header />
        <!-- Main Content -->
        <main class="-mt-24 pb-8" aria-labelledby="contentHeading">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 id="contentHeading" class="sr-only" aria-hidden="true">Content</h1>
                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <!-- Left column -->
                    <div class="grid grid-cols-1 gap-4 lg:col-span-2">
                        <section aria-labelledby="typizerRaceHeading">
                            <h2 class="sr-only" id="typizerRaceHeading">Typizer Race</h2>
                            <div class="rounded-lg bg-white overflow-hidden shadow">
                                <div class="p-6 space-y-4">
                                    <Quote/>
                                    <UserTypedText @input="watchRace"/>
                                    <div class="flex flex-row items-center justify-start space-x-4 mt-4">
                                        <Button @clickTarget="startRace()">{{ startRaceText }}</Button>
                                        <Button @clickTarget="nextRace()">{{ nextRaceText }}</Button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <!-- Right column -->
                    <div class="grid grid-cols-1 gap-4">
                        <section aria-labelledby="typizerRaceStatsHeading">
                            <h2 class="sr-only" id="typizerRaceStatsHeading">Typizer Stats</h2>
                            <div class="rounded-lg bg-white overflow-hidden shadow">
                                <div class="p-6">
                                    <!-- Your content -->
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
        <!-- Footer -->
        <footer>
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
                <div class="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left">
                    <span class="block sm:inline">Typizer. </span> 
                    <span class="block sm:inline">MIT License.</span>
                </div>
            </div>
        </footer>
    </div>
</template>
