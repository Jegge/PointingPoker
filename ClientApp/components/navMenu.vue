<template>
    <nav class="navbar is-fixed-top is-dark" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="/">
                <span>Pointing Poker</span>
            </a>
        </div>
        <div class="navbar-item" v-for="route in visibleRoutes">
            <router-link :to="route.path">
                <span :class="route.style"></span> {{ route.display }}
            </router-link>
        </div>
    </nav>      
</template>

<script>
import { routes } from '../routes'

export default {
    name: 'navMenu',
    data() {
        return {
            routes
        }
    },
    computed: {
        visibleRoutes () {
            return this.routes.filter(route => !route.hidden);
        }
    }
}
</script>

<style>
</style>