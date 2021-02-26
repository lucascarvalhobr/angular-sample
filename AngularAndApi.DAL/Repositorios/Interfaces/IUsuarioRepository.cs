using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using AngularAndApi.Models;

namespace AngularAndApi.DAL.Repositorios.Interfaces
{
    public interface IUsuarioRepository
    {
        IEnumerable<Usuario> ConsultarTodos();

        IEnumerable<Usuario> Consultar(Expression<Func<Usuario, bool>> filter = null, Func<IQueryable<Usuario>, IOrderedQueryable<Usuario>> orderBy = null, string includeProperties = "");

        Usuario ConsultarPorID(int idUsuario);

        void Inserir(Usuario entity);

        void Apagar(int idUsuario);

        void Apagar(Usuario entityToDelete);

        void Atualizar(Usuario entityToUpdate);

        void Salvar();
    }
}
