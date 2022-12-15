const nomeBusca = document.querySelector('.input'); //input para digitar o nome do filme
const mensagemErro = document.querySelector('#mensagemErro'); // elemento p vazio que vai receber a mensagem de erro
const botaoBuscar = document.querySelector('#botao_buscar'); //botão para fazer a busca do filme

const tituloFilme = document.querySelector('#titulo');
const anoFilme = document.querySelector('#ano');
const duracaoFilme = document.querySelector('#duracao');
const generoFilme = document.querySelector('#genero');
const diretorFilme = document.querySelector('#diretor');
const atoresFilme = document.querySelector('#atores');
const posterFilme = document.querySelector('.poster');
const sinopseFilme = document.querySelector('#sinopse');

const apiKey = "c4f07ff4";
const imgDefault = "./default_image.png";

async function buscaFilme(nomeBusca) {
     const resposta = await fetch(`http://www.omdbapi.com/?t=${nomeBusca}&apikey=${apiKey}`);
     return resposta.json();
}

botaoBuscar.addEventListener('click', () => {
     limparCampos();
     core();
})

async function core() {
     try {
          const filme = await buscaFilme(nomeBusca.value);
          validaDados(filme);
          defineValores(filme);
     } catch (error) {
          console.log(error);
          mensagemErro.textContent = `${error}`;
     }

}

function defineValores(filme) {
     tituloFilme.textContent = filme.Title;
     sinopseFilme.textContent = filme.Plot;
     anoFilme.textContent = `Year: ${filme.Year}`;
     duracaoFilme.textContent = `Runtime: ${filme.Runtime}`;
     generoFilme.textContent = `Genre: ${filme.Genre}`;
     atoresFilme.textContent = `Actors: ${filme.Actors}`;
     diretorFilme.textContent = `Director: ${filme.Director}`;
     posterFilme.setAttribute('src', filme.Poster);
}

function limparCampos() {
     tituloFilme.textContent = '';
     sinopseFilme.textContent = '';
     anoFilme.textContent = '';
     duracaoFilme.textContent = '';
     generoFilme.textContent = '';
     atoresFilme.textContent = '';
     diretorFilme.textContent = '';
     posterFilme.setAttribute('src', imgDefault);
}

function validaDados(filme) {
     if (filme.Plot === undefined || filme.Year === undefined || filme.Actors === 'N/A') {
          throw new Error('Filme não encontrado');
     }
}