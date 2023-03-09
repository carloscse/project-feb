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
    [Route("companies")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CompaniesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/companies/all
        [HttpGet("/companies/all")]
        public async Task<ActionResult<IEnumerable<Company>>> All()
        {
            //if (_context.Project == null)
            //{
            //    return NotFound();
            //}
            return await _context.Company.ToListAsync();
        }

        // GET: api/companies/list
        [HttpGet("/companies/list")]
        public async Task<ActionResult<IEnumerable<Company>>> List()
        {
            //if (_context.Company == null)
            //{
            //    return NotFound();
            //}
            return await _context.Company.Where(e => !e.Deleted).ToListAsync();
        }

        // GET: api/companies/5
        [HttpGet("/companies/{uuid}")]
        public async Task<ActionResult<Company>> Get(long uuid)
        {
          if (_context.Company == null)
          {
              return NotFound();
          }
            var company = await _context.Company.FindAsync(uuid);

            if (company == null)
            {
                return NotFound();
            }

            return company;
        }

        // PUT: api/companies/update
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("/companies/{uuid}")]
        public async Task<ActionResult<Company>> Update(long uuid, Company company)
        {
            if (uuid != company.Uuid)
            {
                return BadRequest("Company does not exist");
            }

            _context.Entry(company).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return company;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(uuid))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }

        // POST: api/companies/create
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("/companies")]
        public async Task<ActionResult<Company>> Create(Company company)
        {
          if (_context.Company == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Company'  is null.");
          }
            _context.Company.Add(company);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", new { uuid = company.Uuid }, company);
        }

        // DELETE: api/companies/delete/5
        [HttpDelete("/companies/{uuid}")]
        public async Task<IActionResult> Delete(long uuid)
        {
            if (_context.Company == null)
            {
                return NotFound();
            }
            var company = await _context.Company.FindAsync(uuid);
            if (company == null)
            {
                return NotFound();
            }

            _context.Company.Remove(company);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CompanyExists(long uuid)
        {
            return (_context.Company?.Any(e => e.Uuid == uuid)).GetValueOrDefault();
        }
    }
}
