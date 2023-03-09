using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;

namespace project_feb;

public class Project
{
    [Key]
    public long Uuid { get; set; }
    public string? Project_name { get; set; }
    public string? Project_number { get; set; }
    public DateOnly? Acquisition_date { get; set; }
    public string? Number_3l_code { get; set; }
    public enum Project_deal_type_options
    {
        SHARE = 0,
        ASSET = 1
    };
    public Project_deal_type_options Project_deal_type { get; set; }
    public enum Project_group_options
    {
        RW1 = 1,
        RW2 = 2,
        RW3 = 3
    };
    public Project_group_options project_group { get; set; }
    public enum Project_status_options
    {
        Acquisition = 1,
        Developement = 2,
        Operating = 3
    };
    public Project_status_options Project_status { get; set; }

    //[ForeignKey("Company")]
    public int CompanyId { get; set; }
    public Company? Company { get; set; }
    //public List<int> WtgsIds { get; set; }

    //[ForeignKey("Wtg")]
    public List<Wtg> Wtgs { get; set; }
    public int KW { get; set; } = 0;
    public int Months_acquired { get; set; } = 0;
    public bool Active { get; set; } = true;
    public bool Deleted { get; set; } = false;

}
