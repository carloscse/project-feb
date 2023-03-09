using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata;

namespace project_feb;

public class Wtg
{
    [Key]
    public long Uuid { get; set; }
    public string? Name { get; set; }
    public int ProjectId { get; set; }
    public Project? Project { get; set; }
    public bool Active { get; set; } = true;
    public bool Deleted { get; set; } = false;

}
