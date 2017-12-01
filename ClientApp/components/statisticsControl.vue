<template>
    <div class="panel panel-default">
        <div class="panel-heading text-center">
            <h3 class="panel-title">Result</h3>
        </div>
        <table class="table">
            <!--<thead>
                <tr>
                    <th>Vote</th>
                    <th>Count</th>
                </tr>
            </thead>-->
            <tbody>
                <tr><td class="text-right col-xs-6">Votes:</td><td>{{ labelCount }} votes</td></tr>
                <tr><td class="text-right col-xs-6">Min:</td><td>{{ labelMin }} points</td></tr>
                <tr><td class="text-right col-xs-6">Max:</td><td>{{ labelMax }} points</td></tr>
                <tr><td class="text-right col-xs-6">Result:</td><td>{{ labelResult }} points</td></tr>

            </tbody>
        </table>
        <div class="panel-footer">
            <div v-if="isConsensus" class="text-center"><strong>Consensus!</strong></div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'statisticsControl',
    props: [ 'histogram' ],
    computed: {
        isHistogramValid () {
            return this.histogram && Object.keys(this.histogram).length > 0;
        },
        labelCount () {
            return this.isHistogramValid ? this.countEntries(this.histogram) : '—';
        },
        labelMin () {
            return this.isHistogramValid ? this.labelForMinEntry(this.histogram) : '—';
        },
        labelMax () {
            return this.isHistogramValid ? this.labelForMaxEntry(this.histogram) : '—';
        },
        labelResult () {
            if (!this.isHistogramValid) {
                return '—'
            }
            let clipped = this.histogramByRemovingMinVoteAndMaxVote(this.histogram);
            let popular = this.histogramWithOnlyTheMostOccuringVotes(clipped);
            return this.labelForMaxEntry(popular);
        },
        isConsensus () {
            return this.countEntries(this.histogram) === 1;
        }

    },
    methods: {
        countEntries (histogram) {
            return Object.keys(histogram).reduce((sum, key) => sum += histogram[key], 0);
        },
        labelForMinEntry (histogram) {
            let value = Math.min(...Object.keys(histogram).map(key => this.$store.getters.valueForLabel(key)));
            return this.$store.getters.labelForValue(value);
        },
        labelForMaxEntry (histogram) {
            let value = Math.max(...Object.keys(histogram).map(key => this.$store.getters.valueForLabel(key)));
            return this.$store.getters.labelForValue(value);
        },
        histogramByRemovingMinVoteAndMaxVote (histogram) {
            let data = JSON.parse(JSON.stringify(histogram));

            if (data.length > 2) {
                let min = this.labelForMinEntry(data);
                if (data[min] === 1) {
                    delete data[min];
                } else {
                    data[min] -= 1;
                }

                let max = this.labelForMaxEntry(data);
                if (data[max] === 1) {
                    delete data[max];
                } else {
                    data[max] -= 1;
                }
            }

            return data;
        },
        histogramWithOnlyTheMostOccuringVotes (histogram)
        {
            let max = Math.max(...Object.keys(histogram).map(key => histogram[key]));
            let keys = Object.keys(histogram).filter(key => histogram[key] === max);

            return Object.keys(histogram)
                         .filter(key => keys.includes(key))
                         .reduce((obj, key) => {
                             obj[key] = histogram[key];
                             return obj;
                         }, {});
        }
    }
}
</script>
<style>
     
</style>
