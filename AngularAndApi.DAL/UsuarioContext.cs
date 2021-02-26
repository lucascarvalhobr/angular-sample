using Microsoft.EntityFrameworkCore;
using System;
using AngularAndApi.Models;

namespace AngularAndApi.DAL
{
    public class UsuarioContext : DbContext
    {
        #region ::Propriedades::
        public DbSet<Usuario> Usuarios { get; set; }
        #endregion

        #region ::Construtor::
        public UsuarioContext()
        {

        }

        public UsuarioContext(DbContextOptions options) : base(options)
        {
      


        }
        #endregion

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        { 
            optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=Teste;Integrated Security=True",
                opts => opts.CommandTimeout((int) TimeSpan.FromMinutes(10).TotalSeconds));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>(e =>
             {
                 e.ToTable("Usuarios");
                 e.HasKey(c => c.Id).HasName("id");
                 e.Property(c => c.Id).HasColumnName("id");
                 e.Property(c => c.Nome).HasColumnName("nome").HasMaxLength(100);
                 e.Property(c => c.Sobrenome).HasColumnName("sobrenome").HasMaxLength(100);
                 e.Property(c => c.Email).HasColumnName("email").HasMaxLength(100);
                 e.Property(c => c.Escolaridade).HasColumnName("escolaridade").HasColumnType("int");
                 e.Property(c => c.DataNascimento).HasColumnName("dataNascimento").HasColumnType("date");
             });
        }
    }
}
