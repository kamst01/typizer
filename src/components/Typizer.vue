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
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <!-- Main 3 column grid -->
        <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
            <!-- Left 2 column -->
            <div class="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="typizerRaceHeading">
                    <h2 class="sr-only" id="typizerRaceHeading">Typizer Race</h2>
                    <div class="rounded-lg bg-white overflow-hidden shadow">
                        <div class="p-6 space-y-6">
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

            <!-- Right 1 column -->
            <div class="grid grid-cols-1 gap-4">
                <section aria-labelledby="typizerRaceStatsHeading">
                    <div class="rounded-lg bg-white overflow-hidden shadow">
                        <div class="p-6 space-y-6">
                            <h3 
                                id="typizerRaceStatsHeading" 
                                class="not-sr-only text-lg leading-6 font-semibold text-gray-900" 
                                aria-hidden="true"
                            >
                                Race Stats
                            </h3>
                        </div>
                        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                            <dl class="sm:divide-y sm:divide-gray-200" aria-labelledby="typizerRaceStatsHeading">
                                <div class="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-semibold text-gray-500">
                                        Time Elapsed
                                    </dt>
                                    <dd class="mt-1 text-sm font-medium text-gray-900 sm:mt-0 sm:col-span-1">
                                        {{ timeElapsed }}
                                    </dd>
                                </div>
                                <div class="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-semibold text-gray-500">
                                        Words Per Minute
                                    </dt>
                                    <dd class="mt-1 text-sm font-medium text-gray-900 sm:mt-0 sm:col-span-1">
                                        {{ wpm }}
                                    </dd>
                                </div>
                                <div class="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-semibold text-gray-500">
                                        Characters Typed
                                    </dt>
                                    <dd class="mt-1 text-sm font-medium text-gray-900 sm:mt-0 sm:col-span-1">
                                        {{ charactersTyped }}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        <div class="p-6 space-y-6">
                            <h3 
                                id="typizerRaceStatsHeading" 
                                class="not-sr-only text-lg leading-6 font-semibold text-gray-900" 
                                aria-hidden="true"
                            >
                                Quote Information
                            </h3>
                        </div>
                        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                            <dl class="sm:divide-y sm:divide-gray-200" aria-labelledby="typizerRaceStatsHeading">
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
                </section>
            </div>
        </div>
    </div>
</template>