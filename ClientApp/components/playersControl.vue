<template>
    <div class="box">
        <table class="table is-fullwidth">
            <thead>
                <tr>                    
                    <th>Name</th>
                    <th class="has-text-right">Vote</th>
                </tr>
            </thead>
            <tbody>
                <player-item v-for="item in players" :key="item.name" :player="item" :showvote="showvotes" />
            </tbody>
        </table>
    </div>
</template>

<script>
import playerItem from './playerItem'

export default {
    name: 'playersControl',
    components: { playerItem },
    props: [ 'players', 'showvotes' ]
}
</script>

<style>
</style>
