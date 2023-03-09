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
    [Route("wtgs")]
    [ApiController]
    public class WtgsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WtgsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/wtgs/all
        [HttpGet("/wtgs/all")]
        public async Task<ActionResult<IEnumerable<Wtg>>> All()
        {
            //if (_context.Project == null)
            //{
            //    return NotFound();
            //}
            return await _context.Wtg.ToListAsync();
        }

        // GET: api/wtgs/list
        [HttpGet("/wtgs/list")]
        public async Task<ActionResult<IEnumerable<Wtg>>> List()
        {
            //if (_context.Wtg == null)
            //{
            //    return NotFound();
            //}
            return await _context.Wtg.Where(e => !e.Deleted).ToListAsync();
        }

        // GET: api/wtgs/5
        [HttpGet("/wtgs/{uuid}")]
        public async Task<ActionResult<Wtg>> Get(long uuid)
        {
            if (_context.Wtg == null)
            {
                return NotFound();
            }
            var wtg = await _context.Wtg.FindAsync(uuid);

            if (wtg == null)
            {
                return NotFound();
            }

            return wtg;
        }

        // PUT: api/wtgs/update
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("/wtgs/{uuid}")]
        public async Task<ActionResult<Wtg>> Update(long uuid, Wtg wtg)
        {
            if (uuid != wtg.Uuid)
            {
                return BadRequest("Wtg does not exist");
            }

            _context.Entry(wtg).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return wtg;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WtgExists(uuid))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }

        // POST: api/wtgs/create
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("/wtgs")]
        public async Task<ActionResult<Wtg>> Create(Wtg wtg)
        {
            if (_context.Wtg == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Wtg'  is null.");
            }
            _context.Wtg.Add(wtg);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", new { uuid = wtg.Uuid }, wtg);
        }

        // DELETE: api/wtgs/delete/5
        [HttpDelete("/wtgs/{uuid}")]
        public async Task<IActionResult> Delete(long uuid)
        {
            if (_context.Wtg == null)
            {
                return NotFound();
            }
            var wtg = await _context.Wtg.FindAsync(uuid);
            if (wtg == null)
            {
                return NotFound();
            }

            _context.Wtg.Remove(wtg);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WtgExists(long uuid)
        {
            return (_context.Wtg?.Any(e => e.Uuid == uuid)).GetValueOrDefault();
        }
    }
}
