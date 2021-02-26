using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using AngularAndApi.Models;

namespace AngularAndApi.Controllers
{
    public class ApiControllerBase : ControllerBase
    {

        public override OkObjectResult Ok([ActionResultObjectValue] object value)
        {
            if(value is ApiResponse)
            {
                return base.Ok(value);
            }
            else
            {
                return base.Ok(new ApiResponse(value));
            }
        }
    }
}
