using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project_feb;
using project_feb.Data;

namespace project_feb.Controllers
{
    [Route("projects")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProjectsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/projects/all
        [HttpGet("/projects/all")]
        public async Task<ActionResult<IEnumerable<Project>>> All()
        {
            //if (_context.Project == null)
            //{
            //    return NotFound();
            //}
            return await _context.Project.ToListAsync();
        }
        // GET: api/projects/list
        [HttpGet("/projects/list")]
        public async Task<ActionResult<IEnumerable<Project>>> List()
        {
            //if (_context.Project == null)
            //{
            //    return NotFound();
            //}
            return await _context.Project.Where(e => !e.Deleted).Include(c => c.Company).ToListAsync();
        }

        // GET: api/projects/5
        [HttpGet("/projects/{uuid}")]
        public async Task<ActionResult<Project>> Get(long uuid)
        {
            if (_context.Project == null)
            {
                return NotFound();
            }
            var project = await _context.Project.FindAsync(uuid);

            if (project == null)
            {
                return NotFound();
            }

            return project;
        }

        // PUT: api/projects/update
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("/projects/{uuid}")]
        public async Task<ActionResult<Project>> Update(long uuid, Project project)
        {
            if (uuid != project.Uuid)
            {
                return BadRequest("Project does not exist");
            }

            _context.Entry(project).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return project;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(uuid))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }

        // POST: api/projects/create
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("/projects")]
        public async Task<ActionResult<Project>> Create(Project project)
        {
            if (_context.Project == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Project'  is null.");
            }
            _context.Project.Add(project);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", new { uuid = project.Uuid }, project);
        }

        // DELETE: api/projects/delete/5
        [HttpDelete("/projects/{uuid}")]
        public async Task<IActionResult> Delete(long uuid)
        {
            if (_context.Project == null)
            {
                return NotFound();
            }
            var project = await _context.Project.FindAsync(uuid);
            if (project == null)
            {
                return NotFound();
            }

            _context.Project.Remove(project);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProjectExists(long uuid)
        {
            return (_context.Project?.Any(e => e.Uuid == uuid)).GetValueOrDefault();
        }
    }
}
