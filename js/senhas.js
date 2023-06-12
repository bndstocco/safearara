firebase.auth().languageCode = 'pt-BR';

FrmSenhas.onsubmit = function (event) {
  event.preventDefault();

  if (FrmSenhasBtnGravar.style.display != 'none') {
    console.log(selecionado);
    firebase.firestore().collection('SENHAS').add({
      Email: encryptData(senha_email.value),
      Nome: encryptData(senha_email.value), // Alterado para 'Nome'
      NomeMinusculo: encryptData(senha_cliente.value.toLowerCase()),
      NomeMinusculo1: encryptData(senha_plataforma.value.toLowerCase()),
      Setor: encryptData(selecionado),
      Senha: encryptData(senha_senha.value),
      Info: encryptData(senha_info.value),
      Cliente: encryptData(senha_cliente.value),
      Plataforma: encryptData(senha_plataforma.value),
      Link: encryptData(senha_link.value)
    })
      .then((docRef) => {
        alert('Cadastrado com sucesso.');
        senha_email.value = '';
        senha_senha.value = '';
        senha_info.value = '';
        senha_cliente.value = '';
        senha_plataforma.value = '';
        senha_link.value = '';
      })
      .catch((error) => {
        console.error("Erro ao adicionar documento: ", error);
        alert('Erro ao cadastrar');
      });
  } else {
    var confirmation = confirm('Confirma a alteracao dos dados?');
    if (confirmation) {
      firebase.firestore().collection('SENHAS').doc(updateKey).update({
        Email: encryptData(senha_email.value),
        Nome: encryptData(senha_email.value), // Alterado para 'Nome'
        NomeMinusculo1: encryptData(senha_plataforma.value.toLowerCase()),
        NomeMinusculo: encryptData(senha_cliente.value.toLowerCase()),
        Senha: encryptData(senha_senha.value),
        Setor: encryptData(selecionado),
        Info: encryptData(senha_info.value),
        Cliente: encryptData(senha_cliente.value),
        Plataforma: encryptData(senha_plataforma.value),
        Link: encryptData(senha_link.value)
      })
        .then(function () {
          alert('Registro alterado com sucesso.');
        })
        .catch(function (error) {
          console.log('Falha ao alterar dados: ', error);
        });
    }
    cancelaUpdate();
  }
};

function ListaSenha2() {
  firebase.firestore().collection('SENHAS')
    .orderBy('Plataforma').onSnapshot(function (dataSnapshot) {
      geraListaSenha(dataSnapshot);
    });

  var filtro2 = document.getElementById('filtro2');
  filtro2.onkeyup = function () {
    if (filtro2.value != '') {
      var TextoFiltro = encryptData(filtro2.value.toLowerCase()); // Criptografa o texto de busca em minúsculas
      firebase.firestore().collection('SENHAS')
        .orderBy("NomeMinusculo1").startAt(TextoFiltro).endAt(TextoFiltro + '\uf8ff')
        .get().then(function (dataSnapshot) {
          console.log(dataSnapshot);
          geraListaSenha(dataSnapshot);
        });
    } else {
      firebase.firestore().collection('SENHAS')
        .orderBy('Plataforma').onSnapshot(function (dataSnapshot) {
          geraListaSenha(dataSnapshot);
        });
    }
  };
}

function ListaSenha() {
  firebase.firestore().collection('SENHAS')
    .orderBy('Cliente').onSnapshot(function (dataSnapshot) {
      geraListaSenha(dataSnapshot);
    });

  var filtro = document.getElementById('filtro');
  filtro.onkeyup = function () {
    if (filtro.value != '') {
      var TextoFiltro = encryptData(filtro.value.toLowerCase()); // Criptografa o texto de busca em minúsculas
      firebase.firestore().collection('SENHAS')
        .orderBy("NomeMinusculo").startAt(TextoFiltro).endAt(TextoFiltro + '\uf8ff')
        .get().then(function (dataSnapshot) {
          console.log(dataSnapshot);
          geraListaSenha(dataSnapshot);
        });
    } else {
      firebase.firestore().collection('SENHAS')
        .orderBy('Cliente').onSnapshot(function (dataSnapshot) {
          geraListaSenha(dataSnapshot);
        });
    }
  };
}






function geraListaSenha(dataSnapshot) {
  ulListaSenhas.innerHTML = '';
  var num = dataSnapshot.size;

  // Exibe o número de cadastros
  var count = 0;
  dataSnapshot.forEach(function (item) { // Percorre todos os elementos
    var value = item.data();
    if (encryptData(value.Setor) == selecionado) {
      count++;

      var tr = document.createElement('tr'); // Cria um elemento do tipo tr
      tr.id = item.id
      var tdEmpresa = document.createElement('td');
      tdEmpresa.appendChild(document.createTextNode(encryptData(value.Email) || '-'));
      tr.appendChild(tdEmpresa);

      var tdSenha = document.createElement('td');
      tdSenha.appendChild(document.createTextNode(encryptData(value.Senha) || '-'));
      tr.appendChild(tdSenha);

      var tdCliente = document.createElement('td');
      tdCliente.appendChild(document.createTextNode(encryptData(value.Cliente) || '-'));
      tr.appendChild(tdCliente);

      var tdPlataforma = document.createElement('td');
      tdPlataforma.appendChild(document.createTextNode(encryptData(value.Plataforma) || '-'));
      tr.appendChild(tdPlataforma);

      var tdInfo = document.createElement('td');
      tdInfo.appendChild(document.createTextNode(encryptData(value.Info) || '-'));
      tr.appendChild(tdInfo);

      var tdLink = document.createElement('td');
      tdLink.appendChild(document.createTextNode(encryptData(value.Link) || '-')); // Verifica se o link existe
      tr.appendChild(tdLink);

      var tdAcoes = document.createElement('td');

      // Cria o botão para alterar
      var btnAlterar = document.createElement('button');
      btnAlterar.classList.add('btn', 'btn-primary');
      btnAlterar.appendChild(document.createTextNode('Alterar'));
      btnAlterar.setAttribute('onclick', 'alteraCadastro("' + item.id + '")');
      btnAlterar.addEventListener('click', function () {
        exibirPopUp();
      });
      tdAcoes.appendChild(btnAlterar);

      // Cria o botão para excluir
      var btnExcluir = document.createElement('button');
      btnExcluir.classList.add('btn', 'btn-danger');
      btnExcluir.appendChild(document.createTextNode('Excluir'));
      btnExcluir.setAttribute('onclick', 'excluiCadastro("' + item.id + '")');
      tdAcoes.appendChild(btnExcluir);

      tr.appendChild(tdAcoes);

      ulListaSenhas.appendChild(tr); // Adiciona o tr dentro do tbody da tabela
    }
  });
  totalSenhas.innerHTML = 'Total de registros: ' + count + (count > 1 ? ' cadastros' : ' cadastro') + '.';
}


function excluiCadastro(key) {
  var Email = document.getElementById(key);
  console.log(Email);
  var confirmation = confirm('Realmente deseja remover o cadastro \" ' + Email.querySelector('td').innerHTML + '\"?');
  if (confirmation) {
    firebase.firestore().collection('SENHAS').doc(key).delete().then(function () {
      alert('Cadastro "' + Email.querySelector('span').innerHTML + ' " removido com sucesso.');
    }).catch(function (error) {
      console.log('Falha ao remover tarefa: ', error);
    });
  }
}

var updateKey = null;

function alteraCadastro(key) {
  updateKey = key;
  firebase.firestore().collection('SENHAS').doc(key).get().then(function (dados) {
    if (dados.exists) {
      var sen = dados.data();
      senha_email.value = encryptData(sen.Email);
      senha_senha.value = encryptData(sen.Senha);
      senha_info.value = encryptData(sen.Info);
      senha_cliente.value = encryptData(sen.Cliente);
      senha_plataforma.value = encryptData(sen.Plataforma);
      senha_link.value = encryptData(sen.Link);

      TituloFormMeio.innerHTML = 'Editar o Cadastro: ' + encryptData(sen.Email); // Alterado para 'sen.Email'
      OcultaItem(FrmSenhasBtnGravar);
      MostraItem(FrmSenhasBtnAlterar);
    }
  });
}

function cancelaUpdate() {
  senha_email.value = '';
  senha_senha.value = '';
  senha_info.value = '';
  senha_cliente.value = '';
  senha_plataforma.value = '';
  senha_link.value = '';
  TituloFormMeio.innerHTML = 'Formulário para cadastro';
  OcultaItem(FrmSenhasBtnAlterar);
  MostraItem(FrmSenhasBtnGravar);
  FrmSenhasBtnGravar.style.display = 'initial';
  fecharPopUp()
}

function setSelectedNav(link) {
  var navLinks = document.getElementsByClassName("nav-link");
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove("active");
  }
  link.classList.add("active");
  selecionado = link.textContent;
  ListaSenha();
  ListaSenha2();
}
function exibirPopUp() {
  var popup = document.getElementById("popup");
  popup.style.display = "block";

  var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = scrollbarWidth + "px";
}

function fecharPopUp() {
  var popup = document.getElementById("popup");
  popup.style.display = "none";
  popup.style.display = "none";

  document.body.style.overflow = "";
  document.body.style.paddingRight = "";

}



// Ativa a primeira opção por padrão
var firstNavLink = document.getElementsByClassName("nav-link")[0];
setSelectedNav(firstNavLink);