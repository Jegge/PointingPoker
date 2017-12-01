import Vue from 'vue'
import Vuex from 'vuex'
var signalR = require('./signalr-client.min.js');

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        signalR: signalR,
        connection: null,
        established: false,
        players: [],
        me: null,
        errorMessage: null,
        story: '',
        points: [
            { label: '0', value: 0 },
            { label: '½', value: 0.5 },
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '5', value: 5 },
            { label: '8', value: 8 },
            { label: '13', value: 13 },
            { label: '20', value: 20 },
            { label: '40', value: 40 },
            { label: '100', value: 100 },
            { label: '?', value: 1000000 }
        ]
    },
    getters: {
        connectionIsEstablished (state) {
            return state.connection && state.players.length > 0 && state.me;
        },
        errorMessage (state) {
            return state.errorMessage;
        },
        players (state) {
            return state.players.sort(function (a, b) {
                if (a.isObserver == b.isObserver) {
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
                } else {
                    return a.isObserver ? 1 : -1;
                }
            });
        },
        story (state) {
            return state.story;
        },
        canVote (state) {
            return !state.me.isObserver;
        },
        votingDone (state, getters) {
            let a = getters.players.filter(p => !p.isObserver).length;
            let b = getters.players.filter(p => !p.isObserver && typeof(p.vote) === 'number').length;
            return a === b;
        },
        me (state) {
            return state.me;
        },
        labelForValue (state) {
            return function (value) {
                return state.points.filter(p => p.value === value)[0].label;
            };
        },
        valueForLabel (state) {
            return function (label) {
                return state.points.filter(p => p.label === label)[0].value;
            };
        },
        histogram (state, getters) {
            let counts = {};

            for (var i = 0; i < state.players.length; i++) {
                if (typeof(state.players[i].vote) === 'number') {
                    let key = getters.labelForValue(state.players[i].vote);
                    counts[key] = typeof(counts[key]) === 'number' ? counts[key] + 1 : 1;
                } 
            }

            return counts;
        }
    },
    actions: {
        joinPoker ({ state, commit }, data) {

            console.log('Join poker as "' + data.name + '" with role ' + data.role);

            commit('setErrorMessage', null);

            let connection = new state.signalR.HubConnection('/poker');

            connection.on('changedVote', player => commit('changedVote', player));

            connection.on('changedStory', story => commit('changedStory', story));

            connection.on('playerJoined', player => commit('addPlayer', player));

            connection.on('playerLeft', player => commit('removePlayer', player));

            connection.on('playerCannotJoin', message => {
                commit('setErrorMessage', 'Player cannot join: ' + message);
                commit('closeConnection');
            });

            //connection.logging = true;

            connection.start().then(success => {
                commit('openConnection', { connection: connection, player: { name: data.name, isObserver: data.role === 'observer' }});
            }, failure => {
                commit('setErrorMessage', 'Cannot start connection: ' + failure);
                commit('closeConnection');
            });
        },

        leavePoker ({ commit }) {
            console.log('Leave poker');
            commit('closeConnection');
        },

        changeStory ({commit}, story) {
            commit('changeStory', story);
        },

        changeVote ({commit}, vote) {
            commit('changeVote', vote);
        },

        resetPoker ({commit}) {
            commit('resetPoker');
        }
    },
    mutations: {
        openConnection (state, change) {
            state.connection = change.connection;
            state.me = change.player
            state.connection.invoke('join', change.player.name, change.player.isObserver);
        },

        closeConnection (state) {
            state.connection.stop();
            state.connection = null;
            state.me = null;
            state.players = [];
            state.story = '';
        },

        setErrorMessage (state, message) {
            state.errorMessage = message;
            if (message) {
                console.error(message);
            }
        },

        addPlayer (state, player) {
            console.log('Player "' + player.name + '" joined as ' + (player.isObserver ? 'observer' : 'player'));
            state.players.push(player);
        },

        removePlayer (state, player) {
            console.log('Player "' + player.name + '" left.');
            state.players = state.players.filter (p => p.name !== player.name);
        },

        changeStory (state, story) {
            state.connection.invoke('changeStory', story);
        },

        changedStory (state, story) {
            state.story = story;
        },

        changeVote (state, vote) {
            state.me.vote = vote;
            state.connection.invoke('changeVote', vote);
        },

        changedVote (state, player) {       
            state.players = state.players.map (p => {
                if (p.name === player.name) {
                    console.log('Player "' + player.name + '" changed vote to ' + player.vote); 
                    p.vote = player.vote;
                }
                return p;
            });
        },

        resetPoker (state) {
            state.connection.invoke('resetPoker');
        }
    }
});
