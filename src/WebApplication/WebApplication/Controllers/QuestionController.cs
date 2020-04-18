﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Data;

namespace WebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        ApplicationDbContext _context;

        public QuestionController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Question> Get()
        {
            return _context.Questions.ToList();
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

            return Ok(question);
        }
    }
}