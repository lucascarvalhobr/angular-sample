using System.Net;

namespace AngularAndApi.Models
{
    public class ApiResponse
    {
        public HttpStatusCode Status_code { get; private set; } = HttpStatusCode.OK;

        public object Data { get; set; }

        public string Mensagem_validacao { get; set; }


        public ApiResponse()
        {

        }

        public ApiResponse(object data)
        {
            Data = data;
        }

        public ApiResponse(string mensagemValidacao, HttpStatusCode statusCode = HttpStatusCode.OK)
        {
            Mensagem_validacao = mensagemValidacao;

            Status_code = statusCode;
        }
    }
}
