using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;
using System.Threading.Tasks;
using AngularAndApi.Models;
using AngularAndApi.Services.Interfaces;

namespace AngularAndApi.Controllers
{
    [Route("api/[controller]")]
    public class UsuariosController : ApiControllerBase
    {
        #region ::Campos::
        private readonly IUsuarioService _usuarioService;
        #endregion

        #region ::Construtor::
        public UsuariosController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }
        #endregion

        [HttpGet]
        public IActionResult Get()
        {
            var usuarios = _usuarioService.ConsultarTodos();
           
            return Ok(UsuarioResourceModel.ToListResourceModel(usuarios));
        }

        [HttpGet("{idUsuario}")]
        public IActionResult Get(int idUsuario)
        {
            var usuario = _usuarioService.ConsultarPorId(idUsuario);

            return Ok(new UsuarioResourceModel(usuario));
        }

        [HttpPost]
        public IActionResult Post([FromBody] UsuarioResourceModel model)
        {
            _usuarioService.Inserir(model?.AsUsuario());

            return StatusCode((int) HttpStatusCode.Created);
        }

        [HttpPut("{idUsuario}")]
        public IActionResult Put(int idUsuario, [FromBody] UsuarioResourceModel model)
        {
            _usuarioService.Alterar(idUsuario, model?.AsUsuario());

            return Ok();
        }

        [HttpDelete("{idUsuario}")]
        public IActionResult Delete(int idUsuario)
        {
            _usuarioService.Excluir(idUsuario);

            return Ok();
        }
    }
}