using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Data;

namespace WebApplication.Controllers
{
    [DisableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        ApplicationDbContext _context;

        public QuestionController(ApplicationDbContext context)
        {
            _context = context;
        }

        [DisableCors]
        [HttpGet]
        public IEnumerable<Question> Get()
        {
            return _context.Questions?.ToList();
        }

        [HttpPost]
        public IActionResult Post([FromForm]Question question)
        {           
            _context.Questions.Add(question);
            _context.SaveChanges();

            return Ok(question);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Question question = _context.Questions.FirstOrDefault(x => x.Id == id);
            if (question == null)
            {
                return NotFound();
            }
            _context.Questions.Remove(question);
            _context.SaveChanges();

            return Ok(question);
        }
    }
}