using System;
using System.Linq;
using System.Collections.Generic;

namespace PointingPoker.Backend
{
    public interface IPoker
    {
        List<Player> Players { get; }
        string StoryDescription { get; set; }
        Player GetPlayerByConnectionId (string connectionId);
        Player GetPlayerByName (string name);
        void Reset ();
    }

    public class Poker : IPoker
    {
        public List<Player> Players { get; } = new List<Player>();
        public string StoryDescription { get; set; } = string.Empty;

        public Player GetPlayerByConnectionId (string connectionId) => Players.FirstOrDefault(p => string.Equals(p.ConnectionId, connectionId, StringComparison.OrdinalIgnoreCase));
        public Player GetPlayerByName (string name) => Players.FirstOrDefault(p => string.Equals(p.Name, name, StringComparison.OrdinalIgnoreCase));

        public void Reset () 
        {
            StoryDescription = string.Empty;
            foreach (Player player in Players)
                player.Vote = null;
        }
    }
}