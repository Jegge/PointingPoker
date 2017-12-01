<template>
    <div id="app">
        <nav-menu params="route: route"></nav-menu>
        <router-view/>                
    </div>
</template>

<script>
import Vue from 'vue'
import pokerPage from './pokerPage'
import navMenu from './navMenu'

export default {
    name: 'appRoot',
    components: { pokerPage, navMenu },
    data() {
        return {
        }
    }
}
</script>

<style>
    body {
        padding-top: 65px;
    }
</style>