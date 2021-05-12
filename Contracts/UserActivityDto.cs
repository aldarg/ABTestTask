using System;
using System.ComponentModel.DataAnnotations;

namespace ABTestTask.Contracts
{
    public class UserActivityDto
    {
        [Required(ErrorMessage = "User ID is required.")]
        [Range(0, int.MaxValue, ErrorMessage = "User ID should be positive number.")]
        public int UserId { get; set; }
        [Required(ErrorMessage = "Registration date is required.")]
        public DateTime DateRegistration { get; set; }
        [Required(ErrorMessage = "Last activity date is required.")]
        public DateTime DateLastActivity { get; set; }
    }
}
