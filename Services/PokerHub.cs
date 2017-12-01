using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using PointingPoker.Backend;

namespace PointingPoker.Services
{
    public class PokerHub : Hub
    {
        readonly IPoker _State;

        const int MaxNameLength = 32;
        const int MaxStoryLength = 255;

        public PokerHub (IPoker state)
        {
            _State = state ?? throw new ArgumentNullException(nameof(state));            
        }

        //public override async Task OnConnectedAsync ()
        //{
        //    await base.OnConnectedAsync();   
        //}

        public override async Task OnDisconnectedAsync (Exception exception)
        {
            Player player = _State.GetPlayerByConnectionId(Context.ConnectionId);
            if (player != null)
            {
                _State.Players.Remove(player);
                await Clients.All.InvokeAsync("PlayerLeft", player);
            }
            await base.OnDisconnectedAsync(exception);
        }

        public async Task Join (string name, bool isObserver)
        {
            name = name.Length > MaxNameLength ? name.Substring(0, MaxNameLength) : name;

            if (_State.GetPlayerByName(name) != null)
            {   
                await Clients.Client(Context.ConnectionId)
                             .InvokeAsync("PlayerCannotJoin", $"Player '{name}' already has joined.");
            }
            else
            {
                foreach (Player player in _State.Players)
                {
                    await Clients.Client(Context.ConnectionId)
                                 .InvokeAsync("PlayerJoined", player);
                    await Clients.Client(Context.ConnectionId)
                                 .InvokeAsync("ChangedVote", player);
                }

                await Clients.Client(Context.ConnectionId)
                             .InvokeAsync("ChangedStory", _State.StoryDescription);

                Player newPlayer = new Player(name, Context.ConnectionId, isObserver);
                _State.Players.Add(newPlayer);

                await Clients.All.InvokeAsync("PlayerJoined", newPlayer);
            }
        }

        public async Task ChangeStory (string description)
        {
            description = description.Length > MaxNameLength ? description.Substring(0, MaxNameLength) : description;

            _State.StoryDescription = description;
            await Clients.All.InvokeAsync("ChangedStory", _State.StoryDescription);
        }

        public async Task ChangeVote (float vote)
        {
            Player player = _State.GetPlayerByConnectionId(Context.ConnectionId);
            if (player == null)
                return;
            player.Vote = vote;

            await Clients.All.InvokeAsync("ChangedVote", player);                                
        }

        public async Task ResetPoker () 
        {
            _State.Reset();

            foreach (Player player in _State.Players)
                await Clients.All.InvokeAsync("ChangedVote", player);

            await Clients.All.InvokeAsync("ChangedStory", _State.StoryDescription);
        }
    }
}