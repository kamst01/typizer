<script setup>
import Quote from "./components/Quote.vue";
import UserTypedText from "./components/UserTypedText.vue";
import Button from './components/Button.vue';
</script>

<script>
export default {
    data() {
        return {
            nextRaceText: 'Next Race',
            startRaceText: 'Start Race',
        }
    },
}
</script>

<template>
<Quote/>
<UserTypedText/>
<div class="flex flex-col lg:flex-row items-center justify-start space-x-4 mt-4">
    <Button @clickTarget="startRace()" buttonText="start race" />
    <Button @clickTarget="nextRace()" buttonText="next race" />
</div>
</template>
