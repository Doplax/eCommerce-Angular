namespace Backend.Models
{
    public class Product
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string price { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }

    }
}
