<script>
export default {
    data() {
        return {
            prestartStopWatch: ref(undefined),
            prestartTimeElapsed: ref(3),
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
        prestartRace() {
            this.resetRace();
            this.prestartStopWatch = setInterval(() => {
                this.prestartTimeElapsed--;
                if(this.prestartTimeElapsed === 0) {
                    setTimeout(() => {
                        this.startRace();
                    });
                }
            }, 1000);
        },
        startRace() {
            const inputElement = document.getElementById('typedText');
            // reset the race before each race start
            this.resetRace();
            this.prestartTimeElapsed = 0;
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
            // clear stop watches
            clearInterval(this.stopWatch);
            clearInterval(this.prestartStopWatch);
            // reset time elapsed data
            this.timeElapsed = 0;
            // reset prestart time data
            this.prestartTimeElapsed = 3;
            // reset wpm data
            this.wpm = 0;
            // reset characters typed
            this.charactersTyped = 0;
            // reset the input html element's inner value
            inputElement.value = '';
            // disable the input element again
            inputElement.setAttribute('disabled', true);
            // for each span element within the paragraph quote element 
            // & remove any stylings
            arrayOfQuote.forEach((characterElement) => {
                characterElement.classList.remove('text-green-400');
                characterElement.classList.remove('text-red-500', 'bg-red-200', 'underline', 'font-semibold')
            });
        },
        watchRace() {
            const inputElement = document.getElementById('typedText');
            // increment the amount of characters typed, to reference for wpm
            this.charactersTyped++;
            // if the input value typed is equal
            // to the quote provided by the api
            if (inputElement.value === quote.content.value) {
                // run stop race method function
                this.stopRace();
            }
        }
    },
};
</script>

<script setup>
import {ref} from 'vue';
import {nextQuote, quote} from './api/fetchRandomQuote.js';
import Quote from "./Quote.vue";
import UserTypedText from "./UserTypedText.vue";
import Button from './Button.vue';
</script>

<template>
    <div class="max-w-3xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
        <!-- Main 3 column grid -->
        <div class="grid items-start grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            <!-- Left 2 column -->
            <div class="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="typizerRaceHeading">
                    <h2 class="sr-only" id="typizerRaceHeading">Typizer Race</h2>
                    <div class="overflow-hidden bg-white rounded-lg shadow">
                        <div class="p-6 space-y-6">
                            <Quote/>
                            <UserTypedText @input="watchRace"/>
                            <div class="flex flex-row items-center justify-start mt-4 space-x-4">
                                <Button @clickTarget="prestartRace()">{{ startRaceText }}</Button>
                                <Button @clickTarget="nextRace()">{{ nextRaceText }}</Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="bg-white rounded-lg shadow" aria-labelledby="typizerRaceStatsHeading">
                    <h2 
                        id="typizerRaceStatsHeading" 
                        class="p-6 text-lg font-semibold leading-6 text-gray-900 border-b not-sr-only" 
                        aria-hidden="true"
                    >
                        Race Stats
                    </h2>
                    <dl class="sm:grid sm:grid-cols-4" aria-labelledby="typizerRaceStatsHeading">
                        <div class="flex flex-col p-6 text-center border-b border-blue-100 sm:border-0 sm:border-r">
                            <dt class="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                                Starting In
                            </dt>
                            <dd 
                                class="order-1 text-5xl font-extrabold opacity-90"
                                :class="{'text-red-600': prestartTimeElapsed < 3}"
                            >
                                {{ prestartTimeElapsed }}
                            </dd>
                        </div>
                        <div class="flex flex-col p-6 text-center border-b border-blue-100 sm:border-0 sm:border-r">
                            <dt class="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                                Time Elapsed
                            </dt>
                            <dd class="order-1 text-5xl font-extrabold opacity-90">
                                {{ timeElapsed }}
                            </dd>
                        </div>
                        <div class="flex flex-col p-6 text-center border-b border-blue-100 sm:border-0 sm:border-r">
                            <dt class="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                                WPM
                            </dt>
                            <dd class="order-1 text-5xl font-extrabold opacity-90">
                                {{ wpm }}
                            </dd>
                        </div>
                        <div class="flex flex-col p-6 text-center border-b border-blue-100 sm:border-0 sm:border-r">
                            <dt class="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                                Characters Typed
                            </dt>
                            <dd class="order-1 text-5xl font-extrabold opacity-90">
                                {{ charactersTyped }}
                            </dd>
                        </div>
                    </dl>
                </section>
            </div>

            <!-- Right 1 column -->
            <section aria-labelledby="typizerQuoteInformationHeading">
                <div class="grid grid-cols-1 gap-4">
                    <div class="overflow-hidden bg-white rounded-lg shadow">
                        <!-- Quote Information -->
                        <div class="p-6 space-y-6">
                            <h2 
                                id="typizerQuoteInformationHeading" 
                                class="text-lg font-semibold leading-6 text-gray-900 not-sr-only" 
                                aria-hidden="true"
                            >
                                Quote Information
                            </h2>
                        </div>
                        <div class="px-4 py-5 border-t border-gray-200 sm:p-0">
                            <dl class="sm:divide-y sm:divide-gray-200" aria-labelledby="typizerQuoteInformationHeading">
                                <div class="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-semibold text-gray-500">
                                        Author
                                    </dt>
                                    <dd class="mt-1 text-sm font-medium text-gray-900 sm:mt-0 sm:col-span-1">
                                        {{ quote.author.value }}
                                    </dd>
                                </div>
                                <div class="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-semibold text-gray-500">
                                        Total Characters
                                    </dt>
                                    <dd class="mt-1 text-sm font-medium text-gray-900 sm:mt-0 sm:col-span-1">
                                        {{ quote.length.value }}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>