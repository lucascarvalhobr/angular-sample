using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using AngularAndApi.DAL;
using AngularAndApi.DAL.Repositorios.Interfaces;
using AngularAndApi.Models;
using AngularAndApi.Models.Enums;
using AngularAndApi.Services.Interfaces;

namespace AngularAndApi.Services
{
    public class UsuarioService : IUsuarioService
    {
        #region ::Campos::
        private readonly IUsuarioRepository _repo;
        #endregion

        #region ::Construtor::
        public UsuarioService()
        {
            _repo = new UsuarioRepository();
        }
        #endregion

        #region ::Consultar todos::
        public IEnumerable<Usuario> ConsultarTodos()
        {
            return _repo.ConsultarTodos();
        }
        #endregion

        #region ::Consultar por id::
        public Usuario ConsultarPorId(int idUsuario)
        {
            return _repo.ConsultarPorID(idUsuario);
        }
        #endregion

        #region ::Inserir::
        public void Inserir(Usuario usuario)
        {
            ValidarUsuario(usuario);

            ValidarSeJaExisteUsuarioComMesmoEmailCadastrado(usuario);

            _repo.Inserir(usuario);

            _repo.Salvar();
        }
        #endregion

        #region ::Alterar::
        public void Alterar(int idUsuario, Usuario usuario)
        {
            ValidarUsuario(usuario);

            ValidarSeJaExisteUsuarioComMesmoEmailCadastrado(usuario, idUsuario);

            usuario.Id = idUsuario;

            _repo.Atualizar(usuario);

            _repo.Salvar();
        }
        #endregion

        #region ::Excluir::
        public void Excluir(int idUsuario)
        {
            _repo.Apagar(idUsuario);

            _repo.Salvar();
        }
        #endregion

        #region ::Validar dados do usuário::
        private void ValidarUsuario(Usuario usuario)
        {
            if (usuario == null)
            {
                throw new ValidationException("Dados do usuário não recebidos.");
            }

            if (usuario.Escolaridade == null || usuario.Escolaridade == Escolaridade.Desconhecida)
            {

                throw new ValidationException("Escolaridade do usuário não informada.");
            }

            if (!usuario.Nome.VericarSeFoiPreenchidoCorretamente(100))
            {

                throw new ValidationException("Nome do usuário é de preenchimento obrigatório e deve possuir até 100 caracteres.");
            }

            if (!usuario.Sobrenome.VericarSeFoiPreenchidoCorretamente(100))
            {

                throw new ValidationException("Sobrenome do usuário é de preenchimento obrigatório e deve possuir até 100 caracteres.");
            }

            if (!usuario.DataNascimento.VerificarSeDataNascimentoFoiPreenchidaCorretamente())
            {
                throw new ValidationException($"Data de nascimento informada é inválida.");
            }


            if (!usuario.Email.VerificarSeEmailEhValido())
            {
                throw new ValidationException("E-mail informado é inválido.");

            }
        }
        #endregion

        #region ::Validar se já existe usuário com mesmo e-mail cadastrado::
        private void ValidarSeJaExisteUsuarioComMesmoEmailCadastrado(Usuario usuario, int? idUsuarioSendoAtualizado = null)
        {
            string email = usuario.Email.ToUpper();

            var exc = new ValidationException($"Já existe um usuário cadastrado com o e-mail {email}");

            var usuariosJaExistentes = _repo.Consultar(x => x.Email.ToUpper() == email);

            if (idUsuarioSendoAtualizado.HasValue)
            {
                if (usuariosJaExistentes.Any(x => x.Id != idUsuarioSendoAtualizado.Value))
                {
                    throw exc;
                }

                return;
            }

            if (usuariosJaExistentes.Any())
            {
                throw exc;
            }
        }
        #endregion
    }
}
