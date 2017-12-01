<template>
    <tr>
        <td>
            <div class="has-text-left">
                <span v-if="!player.isObserver" class="icon is-small is-left">
                    <i class="fa fa-user"></i>
                </span>
                <span v-if="player.isObserver" class="icon is-small is-left">
                    <i class="fa fa-eye"></i>
                </span>
                &nbsp;{{ player.name }}
            </div>

        </td>
        <td>
            <div class="has-text-right">
                <span class="fa fa-check-circle" v-if="!showvote && voteValid && !player.isObserver" />
                <span class="fa fa-clock-o" v-if="!showvote && !voteValid && !player.isObserver" />
                <span v-if="showvote && voteValid && !player.isObserver">{{ vote }} points</span>
                <span v-if="showvote && !voteValid && !player.isObserver">— points</span>
            </div>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'playerItem',
    props: [ 'player', 'showvote' ],
    computed: {
        vote () {
            return this.$store.getters.labelForValue(this.player.vote);
        },

        voteValid () {
            return typeof(this.player.vote) === 'number';
        }
    }
}
</script>

<style>
</style>
