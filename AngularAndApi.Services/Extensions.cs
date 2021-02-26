using System;
using System.Text.RegularExpressions;

namespace AngularAndApi.Services
{
    public static class Extensions
    {
        /// <summary>
        /// Verificar se um conteúdo de texto foi preenchido corretamente, respeitando uma quantidade máxima de caracteres.
        /// </summary>
        /// <param name="valor"></param>
        /// <param name="qtdeMaximaCaracteres"></param>
        /// <returns></returns>
        public static bool VericarSeFoiPreenchidoCorretamente(this string valor, int qtdeMaximaCaracteres)
        {
            if (string.IsNullOrEmpty(valor))
            {
                return false;
            }

            if (valor.Length > qtdeMaximaCaracteres)
            {
                return false;
            }

            return true;
        }

        /// <summary>
        /// Método para verificar se data de nascimento é válida, se não foi informada uma data posterior à data de hoje.
        /// </summary>
        /// <param name="dataNascimento"></param>
        /// <returns></returns>
        public static bool VerificarSeDataNascimentoFoiPreenchidaCorretamente(this DateTime? dataNascimento)
        {
            if(dataNascimento == null)
            {
                return false;
            }

            if (dataNascimento.Value > DateTime.Now.Date)
            {
                return false;
            }

            return true;
        }

        /// <summary>
        /// Método para verificar se um e-mail é válido.
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public static bool VerificarSeEmailEhValido(this string email)
        {
            string emailRegex = string.Format("{0}{1}",
            @"^(?("")("".+?(?<!\\)""@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))",
            @"(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-\w]*[0-9a-z]*\.)+[a-z0-9][\-a-z0-9]{0,22}[a-z0-9]))$");

            bool emailValido;

            try
            {
                emailValido = Regex.IsMatch(
                    email,
                    emailRegex);
            }
            catch (RegexMatchTimeoutException)
            {
                emailValido = false;
            }

            return emailValido;
        }

    }
}
