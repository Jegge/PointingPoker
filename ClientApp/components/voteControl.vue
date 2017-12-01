<template>
    <div class="box">
        <div class="columns is-mobile">
            <div class="column is-3">
                <div class="field">
                    <div class="control">
                        <button type="button" class="button is-medium is-info is-fullwidth" :disabled="disabled" value="0" @click="change">{{ label(0) }}</button>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button type="button" class="button is-medium is-info is-fullwidth" :disabled="disabled" value="3" @click="change">{{ label(3) }}</button>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button type="button" class="button is-medium is-info is-fullwidth" :disabled="disabled" value="20" @click="change">{{ label(20) }}</button>
                    </div>
                </div>
            </div>
            <div class="column is-3">
                <div class="field">
                    <div class="control">
                        <button type="button" class="button is-medium is-info is-fullwidth" :disabled="disabled" value="0.5" @click="change">{{ label(0.5) }}</button>
                        
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button type="button" class="button is-medium is-info is-fullwidth" :disabled="disabled" value="5" @click="change">{{ label(5) }}</button>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button type="button" class="button is-medium is-info is-fullwidth" :disabled="disabled" value="40" @click="change">{{ label(40) }}</button>
                    </div>
                </div>
            </div>
            <div class="column is-3">
                <div class="field">
                    <div class="control">
                        <button type="button" class="button is-medium is-info is-fullwidth" :disabled="disabled" value="1" @click="change">{{ label(1) }}</button>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button type="button" class="button is-medium is-info is-fullwidth" :disabled="disabled" value="8" @click="change">{{ label(8) }}</button>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button type="button" class="button is-medium is-info is-fullwidth" :disabled="disabled" value="100" @click="change">{{ label(100) }}</button>
                    </div>
                </div>
            </div>
            <div class="column is-3">
                <div class="field">
                    <div class="control">
                        <button type="button" class="button is-medium is-info is-fullwidth" :disabled="disabled" value="2" @click="change">{{ label(2) }}</button>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button type="button" class="button is-medium is-info is-fullwidth" :disabled="disabled" value="13" @click="change">{{ label(13) }}</button>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button type="button" class="button is-medium is-info is-fullwidth" :disabled="disabled" value="1000000" @click="change">{{ label(1000000) }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
export default {
    name: 'voteControl',
    props: [ 'values', 'disabled' ],
    methods: {
        change (event) {
            this.$emit('change', event.target.value);
        },
        label (value) {
            return this.$store.getters.labelForValue(value);
        }
    }
}
</script>

<style>
</style>
