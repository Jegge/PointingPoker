<template>
    <div class="box">
        <p class="title">
            <span class="icon is-small">
                <i v-if="this.player.isObserver" class="fa fa-eye"></i>
                <i v-else class="fa fa-user"></i>
            </span>
            &nbsp;{{ player.name }}
        </p>
        <div class="control">
            <div class="field">
                <div class="control has-icons-left">
                    <input class="input"
                           type="text"
                           aria-label="Story description"
                           placeholder="Story description"
                           maxlength="255"
                           @change="changed"
                           @input="changed"
                           @paste="changed"
                           :value="description" />
                    <span class="icon is-small is-left">
                        <i class="fa fa-comment-o"></i>
                    </span>
                </div>
            </div>
            <div class="field is-grouped is-grouped-right">
                <div class="control">
                    <button type="button" class="button is-danger" @click="clickedResetVotes">Reset votes</button>
                </div>
            </div>
        </div>
    </div>           
</template>

<script>
export default {
    name: 'descriptionControl',
    props: [ 'description', 'player' ],
    methods: {
        changed (event) {
            this.$emit('change', event.target.value);
        },
        clickedResetVotes (event) {
            this.$emit('reset');
        }
    }
}
</script>

<style>
</style>
