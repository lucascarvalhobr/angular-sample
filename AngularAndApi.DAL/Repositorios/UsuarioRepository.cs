using AngularAndApi.DAL.Repositorios.Interfaces;
using AngularAndApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace AngularAndApi.DAL
{
    public class UsuarioRepository : IUsuarioRepository
    {
        #region ::Campos::
        internal UsuarioContext context;
        internal DbSet<Usuario> dbSet;
        #endregion

        #region ::Construtor::
        public UsuarioRepository()
        {
            this.context = new UsuarioContext();
            this.dbSet = context.Set<Usuario>();
        }
        #endregion

        #region ::Consultar::
        public virtual IEnumerable<Usuario> Consultar(
            Expression<Func<Usuario, bool>> filter = null,
            Func<IQueryable<Usuario>, IOrderedQueryable<Usuario>> orderBy = null,
            string includeProperties = "")
        {
            IQueryable<Usuario> query = dbSet;
            if (filter != null)
            {
                query = query.Where(filter);
            }
            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }
            if (orderBy != null)
            {
                return orderBy(query).ToList();
            }
            else
            {
                return query.ToList();
            }
        }
        #endregion

        #region ::Consultar todos::
        public IEnumerable<Usuario> ConsultarTodos()
        {
            return Consultar(x => 1 == 1);
        }
        #endregion

        #region ::Consultar por ID:: 
        public Usuario ConsultarPorID(int idUsuario)
        {
            return dbSet.Find(idUsuario);
        }
        #endregion

        #region ::Inserir::
        public void Inserir(Usuario usuario)
        {
            dbSet.Add(usuario);
        }
        #endregion

        #region ::Apagar::
        public void Apagar(int idUsuario)
        {
            Usuario entityToDelete = dbSet.Find(idUsuario);
            Apagar(entityToDelete);
        }

        public void Apagar(Usuario usuario)
        {
            if (context.Entry(usuario).State == EntityState.Detached)
            {
                dbSet.Attach(usuario);
            }

            dbSet.Remove(usuario);
        }
        #endregion

        #region ::Atualizar::
        public void Atualizar(Usuario usuario)
        {
            CheckNecessaryDetach(usuario);

            dbSet.Attach(usuario);
            context.Entry(usuario).State = EntityState.Modified;
        }
        private void CheckNecessaryDetach(Usuario usuario)
        {
            var local = context.Set<Usuario>().Local.FirstOrDefault(entry => entry.Id.Equals(usuario.Id));

            if (local != null)
            {
                context.Entry(local).State = EntityState.Detached;
            }
        }
        #endregion

        #region ::Salvar::
        public void Salvar()
        {
            context.SaveChanges();
        }
        #endregion
    }
}
