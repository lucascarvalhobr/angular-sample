using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.ComponentModel.DataAnnotations;
using System.Net;
using AngularAndApi.Models;

namespace AngularAndApi.Filters
{
    public class ApiExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            ApiResponse apiResponse;

            var exception = context.Exception;

            if(exception is ValidationException)
            {
                apiResponse = new ApiResponse(exception.Message, HttpStatusCode.UnprocessableEntity);//status code para fins de testes
            }
            else
            {
                apiResponse = new ApiResponse("Erro interno do servidor. Tente novamente mais tarde.");
            }

            context.Result = new ObjectResult(apiResponse)
            {
                StatusCode = (int) apiResponse.Status_code
            };
        }
    }
}
