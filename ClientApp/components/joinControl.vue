<template>

    <div class="panel">
        <div class="panel-heading">
            Join Pointing Poker
        </div>
        <div class="panel-block">
            <div class="control">
                <div class="field">
                    <div class="control has-icons-left has-icons-right">
                        <input class="input is-info"
                               type="text"
                               aria-label="Name"
                               placeholder="Name"
                               maxlength="32"
                               v-model="name"
                               @keyup.enter="clickedJoin" />
                        <span class="icon is-small is-left">
                            <i class="fa fa-user"></i>
                        </span>
                        <!--<span class="icon is-small is-right">
                            <i class="fa fa-check"></i>
                        </span>-->
                        <!--<p class="help is-success">This username is available</p>
                        <p class="help is-danger">This email is invalid</p>-->
                    </div>
                </div>

                <div class="field has-addons">
                    <div class="control is-expanded">
                        <div class="select is-fullwidth">
                            <select v-model="role">
                                <option value="player">Join as Player</option>
                                <option value="observer">Join as Observer</option>
                            </select>
                        </div>
                    </div>
                    <div class="control">
                        <button type="button" 
                                class="button is-info"
                                :disabled="isClickDisabled"
                                @click="clickedJoin">
                                Go!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>   

export default {
    name: 'joinControl',
    data () {
        return {
            role: 'player',
            name: ''
        }
    },
    computed: {
        isClickDisabled () {
            return !this.name || this.name === '';
        }
    },
    methods: {
        clickedJoin (event) {
            if (!this.isClickDisabled) {
                this.$emit('click', this.name, this.role);
            }
        }
    }
}
</script>

<style>
</style>
