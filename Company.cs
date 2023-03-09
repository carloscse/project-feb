using System.ComponentModel.DataAnnotations;

namespace project_feb;

public class Company
{
    [Key]
    public long Uuid { get; set; }
    public string? Name { get; set; }
    public bool Active { get; set; } = true;
    public bool Deleted { get; set; } = false;

}
