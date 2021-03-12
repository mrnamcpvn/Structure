namespace SmartTool_API.Helpers
{
    public abstract class DomainEntity<K>
    {
        public K Id { get; set; }

        public bool IsTransient()
        {
            return Id.Equals(default(K));
        }
    }
}