<template>
    <div>
        <div class="container" v-if="!connectionIsEstablished">
            <div class="message is-danger" v-if="errorMessage && errorMessage !== ''">
                <div class="message-header">
                    <p>Error</p>
                </div>
                <div class="message-body">
                    {{errorMessage }}
                </div>
            </div>
            <div class="columns is-centered">
                <div class="column is-narrow">
                    <join-control @click="clickedJoin" />
                </div>
            </div>
        </div>
        <div class="container" v-if="connectionIsEstablished">
            <div class="columns is-multiline">
                <div class="column is-half">
                    <description-control :description="story" :player="player" @change="changedStory" @reset="clickedResetVotes" />
                </div>
                <div class="column is-half" v-if="canVote">
                    <vote-control @change="changedVote" />
                </div>
                <div class="column is-half">
                    <players-control :players="players" :showvotes="votingDone || !canVote" />
                </div>
                <div class="column is-half" v-if="votingDone">
                    <result-control :histogram="histogram" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import joinControl from './joinControl'
import descriptionControl from './descriptionControl'
import voteControl from './voteControl'
import playersControl from './playersControl'
import resultControl from './resultControl'

export default {
    name:'pokerPage',
    components: { joinControl, descriptionControl, voteControl, playersControl, resultControl },
    data () {
        return {
        }
    },
    computed: {
        connectionIsEstablished () {
            return this.$store.getters.connectionIsEstablished;
        },
        errorMessage () {
            return this.$store.getters.errorMessage;
        },
        players () {
            return this.$store.getters.players;
        },
        story () {
            return this.$store.getters.story;
        },
        canVote () {
            return this.$store.getters.canVote;
        },
        votingDone () {
            return this.$store.getters.votingDone;
        },
        player () {
            return this.$store.getters.me;
        },
        histogram () {
            return this.$store.getters.histogram
        }
    },
    methods: {
        clickedJoin (name, role) {
            this.$store.dispatch('joinPoker', { name: name, role: role });
        },
        changedStory (story) {
            this.$store.dispatch('changeStory', story);
        },
        changedVote (vote) {
            this.$store.dispatch('changeVote', vote);
        },
        clickedResetVotes () {
            this.$store.dispatch('resetPoker');
        }
    },
    beforeDestroy: function () {
        this.$store.dispatch('leavePoker');
    }
}
</script>

<style>

</style>
