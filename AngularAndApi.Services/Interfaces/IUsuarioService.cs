using System.Collections.Generic;
using AngularAndApi.Models;

namespace AngularAndApi.Services.Interfaces
{
    public interface IUsuarioService
    {
        IEnumerable<Usuario> ConsultarTodos();

        Usuario ConsultarPorId(int idUsuario);

        void Inserir(Usuario usuario);

        void Alterar(int idUsuario, Usuario usuario);

        void Excluir(int idUsuario);

    }
}
