using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Service.IdentityService
{
    public interface IUserService
    {
        ValidationResult Authenticate(string username, string password);
    }
}
