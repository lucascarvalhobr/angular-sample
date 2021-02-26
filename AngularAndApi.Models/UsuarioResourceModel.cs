using System;
using System.Collections.Generic;
using AngularAndApi.Models.Enums;

namespace AngularAndApi.Models
{
    /// <summary>
    /// Classe criada para compartilhar de forma segura dados do modelo.
    /// </summary>
    public class UsuarioResourceModel
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public string Sobrenome { get; set; }

        public string Email { get; set; }

        public DateTime? Data_nascimento { get; set; }

        public Escolaridade? Escolaridade_id { get; set; }

        public string Escolaridade_nome { get; set; }

        #region ::Construtores::
        public UsuarioResourceModel()
        {

        }

        public UsuarioResourceModel(Usuario usuario)
        {
            Id = usuario.Id;
            Nome = usuario.Nome;
            Sobrenome = usuario.Sobrenome;
            Email = usuario.Email;
            Data_nascimento = usuario.DataNascimento;
            Escolaridade_id = usuario.Escolaridade;
            Escolaridade_nome = usuario.Escolaridade?.ToString();
        }
        #endregion

        #region ::Builders::
        public Usuario AsUsuario()
        {
            return new Usuario()
            {
                Nome = Nome,
                Sobrenome = Sobrenome,
                Email = Email,
                DataNascimento = Data_nascimento,
                Escolaridade = Escolaridade_id
            };
        }

        /// <summary>
        /// Vai converter a lista de usuários retornados pelo domínio para uma lista modelo segura de compartilhamento.
        /// </summary>
        /// <param name="usuarios"></param>
        /// <returns></returns>
        public static IEnumerable<UsuarioResourceModel> ToListResourceModel(IEnumerable<Usuario> usuarios)
        {
            if (usuarios == null)
                return null;

            var usuariosResourceModel = new List<UsuarioResourceModel>();

            foreach(var usuario in usuarios)
            {
                usuariosResourceModel.Add(new UsuarioResourceModel(usuario));
            }

            return usuariosResourceModel;
        }
        #endregion
    }
}
