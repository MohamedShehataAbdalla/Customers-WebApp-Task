using Customers_WebApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Linq.Dynamic.Core;

namespace Customers_WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CustomersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult GetCustomers()
        {
            int pageSize = int.Parse(Request.Form["length"]);
            int skip = int.Parse(Request.Form["start"]);
            var searchString = Request.Form["search[value]"];
            var sortColumn = Request.Form[string.Concat("columns[", Request.Form["order[0][column]"], "][name]")]; //columns[order[0][column]][name]
            var sortColumnDir = Request.Form["order[0][dir]"];


            // Get All Data of Table
            IQueryable<Customer> customers = _context.Customers;

            // filtering and Searching Data of Table
            if (!string.IsNullOrEmpty(searchString))
                customers = customers.Where(x => string.IsNullOrEmpty(searchString) ? true :

                    x.FirstName.Contains(searchString) ||
                    x.LastName.Contains(searchString) ||
                    x.City.Contains(searchString) ||
                    x.Email.Contains(searchString) ||
                    x.Phone.Contains(searchString) ||
                    x.DateOfBirth.ToString().Contains(searchString)
                );

            // Sorting Data of Table
            if (!(string.IsNullOrEmpty(sortColumn) || string.IsNullOrEmpty(sortColumnDir)))
                customers = customers.OrderBy(sortColumn + " " + sortColumnDir);  /// install and using backage System.Linq.Dynamic.Core;

            // paging Table
            var data = customers.Skip(skip).Take(pageSize).ToList();

            // Get Count of Rows in Table
            var recordsTotal = customers.Count();

            var jsonData = new { recordsFiltered = recordsTotal, recordsTotal, data };

            return Ok(jsonData);
        }
    }
}
