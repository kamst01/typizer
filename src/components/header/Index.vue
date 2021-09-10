<script setup>
import Logo from './Logo.vue';
import NavigationLinks from '../navigation/NavigationLinks.vue';
</script>

<script>
export default {
    data() {
        return {
            isOpen: false
        }
    }
}
</script>

<template>
    <header class="pb-24 bg-sky-600" aria-labelledby="headerHeading">
        <h2 id="headerHeading" class="sr-only" aria-hidden="true">Header with Navigation</h2>
        <!-- Desktop header -->
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div class="relative py-5 flex items-center justify-center lg:justify-between">
                <!-- Logo -->
                <div class="absolute left-0 flex-shrink-0 lg:static text-4xl font-bold text-white" aria-labelledby="logoHeading">
                    <h2 id="logoHeading" class="sr-only" aria-hidden="true">Logo</h2>
                    <Logo />
                </div>

                <!-- Github Repo Link -->
                <div class="hidden md:flex absolute right-0 flex-shrink-0 lg:static text-4xl font-bold text-white" aria-labelledby="githubHeading">
                    <h2 id="githubHeading" class="sr-only" aria-hidden="true">Github Repo</h2>
                    <a href="https://github.com/kamst01/typizer/">
                        <!-- feathericons: github  -->
                        <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                    </a>
                </div>

                <!-- Menu button -->
                <div class="absolute right-0 flex-shrink-0 lg:hidden">
                    <!-- Mobile menu button -->
                    <button type="button" class="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-sky-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white" @click="isOpen = !isOpen" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <!-- Heroicon name: outline/menu -->
                        <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <!-- Heroicon name: outline/x -->
                        <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
            <!-- Navigation -->
            <div class="hidden lg:block border-t border-white border-opacity-20 py-5">
                <div class="grid grid-cols-3 gap-8 items-center">
                    <div class="col-span-2">
                        <nav class="flex">
                            <NavigationLinks linksClass="text-white text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"/>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <!--
            Mobile header overlay, show/hide based on mobile menu state.

            TODO:
            Add Transition Elements:

            Entering: "duration-150 ease-out"
            From: "opacity-0"
            To: "opacity-100"
            Leaving: "duration-150 ease-in"
            From: "opacity-100"
            To: "opacity-0"
        -->
        <div :class="[isOpen ? '' : 'hidden']">
            <div class="z-20 fixed inset-0 bg-black bg-opacity-25" aria-hidden="true"></div>
            <div class="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top">
                <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                    <div class="pt-3 pb-2">
                        <div class="flex items-center justify-between px-4">
                            <div class="text-2xl font-bold text-black">
                                <Logo/>
                            </div>
                            <div class="-mr-2">
                                <button type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500" @click="isOpen = !isOpen">
                                    <span class="sr-only">Close menu</span>
                                    <!-- Heroicon name: outline/x -->
                                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="mt-3 px-2 space-y-1">
                            <NavigationLinks linksClass="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800" />
                        </div>
                    </div>
                    <!-- User Data - Not yet implemented -->
                    <!-- <div class="pt-4 pb-2">
                        <div class="flex items-center px-5">
                            <div class="flex-shrink-0">
                                <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                            </div>
                            <div class="ml-3 min-w-0 flex-1">
                                <div class="text-base font-medium text-gray-800 truncate">Tom Cook</div>
                                <div class="text-sm font-medium text-gray-500 truncate">tom@example.com</div>
                            </div>
                            <button type="button" class="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                                <span class="sr-only">View notifications</span>
                                Heroicon name: outline/bell
                                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </button>
                        </div>
                        <div class="mt-3 px-2 space-y-1">
                            <a href="#" class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">Your Profile</a>
                            <a href="#" class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">Settings</a>
                            <a href="#" class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">Sign out</a>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </header>
</template>