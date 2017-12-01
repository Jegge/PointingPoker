namespace PointingPoker.Backend
{
    public class Player
    {
        public Player (string name, string connectionId, bool isObserver)
        {
            Name = name;
            ConnectionId = connectionId;
            IsObserver = isObserver;
        }
        public string ConnectionId { get; }
        public string Name { get; }
        public bool IsObserver { get; }
        public float? Vote { get; set; }
    }
}