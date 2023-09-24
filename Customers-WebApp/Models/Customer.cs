using System.ComponentModel.DataAnnotations;

namespace Customers_WebApp.Models
{
    public class Customer
    {
        public Customer()
        {
            AccountBalance  = 0.0m;
            Active = true;
        }
        public int Id { get; set; }

        [MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [MaxLength(50)]
        public string LastName { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? Email { get; set; }

        [MaxLength(20)]
        public string? Phone { get; set; }

        [MaxLength(6)]
        public string? Gender { get; set; }

        [MaxLength(250)]
        public string? Address { get; set; }

        [MaxLength(50)]
        public string? City { get; set; }

        [MaxLength(20)]
        public string? ZipCode { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public decimal AccountBalance { get; set; }

        [MaxLength(250)]
        public string? Image { get; set; }
        public bool Active { get; set; }

    }
}
