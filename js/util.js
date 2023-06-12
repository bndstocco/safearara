firebase.auth().languageCode = 'pt-BR';

var selecionado = "";
var FrmAutentica = document.getElementById('FrmAutentica');
var FrmAutenticaSubmit = document.getElementById('FrmAutenticaSubmit');

var Registrar = document.getElementById('Registrar');
var Acessar = document.getElementById('Acessar');

var logado = document.getElementsByClassName('logado');
var usuarioLogadoTitulo = document.getElementById('UsuarioLogadoTitulo');

var Carregando = document.getElementById('Carregando');

var VerificaEmail = document.getElementById('VerificaEmail');
var EnviaVerificaEmail = document.getElementById('EnviaVerificaEmail');

var ImgUsuario = document.getElementById("ImgUsuario");

var FrmSenhas = document.getElementById('FrmSenhas');

var senha_email = document.getElementById('senha_email');

var senha_senha = document.getElementById('senha_senha');

var senha_setor = document.getElementById('senha_setor');

var senha_info = document.getElementById('senha_info');

var senha_cliente = document.getElementById('senha_cliente');

var senha_plataforma = document.getElementById('senha_plataforma');

var senha_link = document.getElementById('senha_link');

var FrmSenhasBtnGravar = document.getElementById('FrmSenhasBtnGravar');

var FrmSenhasBtnAlterar = document.getElementById('FrmSenhasBtnAlterar');

var ulListaSenhas = document.getElementById('ulListaSenhas');

var totalSenhas = document.getElementById('totalSenhas');

function MostraItem1(element) {
  element.style.display = 'flex';
}

function MostraItem(element) {
  element.style.display = 'block';
}

function OcultaItem(element) {
  element.style.display = 'none';
  console.log(element);
}

function RealizarCadastro() {
  FrmAutentica.FrmAutenticaSubmit.innerHTML = 'Cadastrar uma conta';
  FrmAutenticaTitulo.innerHTML = 'Insira seus dados';

  OcultaItem(Registrar);
  MostraItem(Acessar);
}

function RealizarAcesso() {
  FrmAutentica.FrmAutenticaSubmit.innerHTML = 'Acessar';
  FrmAutenticaTitulo.innerHTML = 'Controle de Acesso';
  OcultaItem(Acessar);
  MostraItem(Registrar);
}

var atualizarUrl = {
  url: 'http://127.0.0.1:5500/#'
};

let key = '3t6w9z$C&F)J@McQ';

// Função para criptografar dados com AES
function encryptData(data) {
  var cipherText = '';
  for (var i = 0; i < data.length; i++) {
    var charCode = data.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    cipherText += String.fromCharCode(charCode);
  }
  return cipherText;
}

// Função para descriptografar dados com AES
function decryptData(cipherText) {
  var plainText = '';
  for (var i = 0; i < cipherText.length; i++) {
    var charCode = cipherText.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    plainText += String.fromCharCode(charCode);
  }
  return plainText;
}

