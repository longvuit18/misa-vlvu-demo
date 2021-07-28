using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.Api.Controllers
{
    [Route("api/v1/employees")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("hello world");
        }
    }
}
