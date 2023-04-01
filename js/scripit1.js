window.onload = function () {
  imprimirProdutos();
};

function imprimirProdutos() {
  let tbody = document.getElementById("tbody");
  tbody.innerText = "";
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = JSON.parse(localStorage.getItem(key));

    var tr = tbody.insertRow();
    var td_produto = tr.insertCell();
    var td_quantidade = tr.insertCell();
    var td_preco = tr.insertCell();
    var td_acao = tr.insertCell();

    td_produto.innerText = value[0].toUpperCase();
    td_quantidade.innerText = value[1];
    td_preco.innerText = `R$ ${value[2]}`;
    td_acao.innerHTML = ` <button onclick = "excluir('${value[0]}')" id="${value[0]}">Deletar</button>`;

    //O CODIGO ABAIXO ADICIONA UMA CLASSE DENTRO DA TAG TD PELO JS E DEIXA AS PALVRAS NO CENTRO
    td_quantidade.classList.add("center");
    td_preco.classList.add("center");
    td_produto.classList.add("center");
    td_acao.classList.add("center");
  }
}

function adicionar() {
  let listaProdutos = document.getElementById("listaProdutos");
  let produto = document.getElementById("produto").value;
  let quantidade = document.getElementById("quantidade").value;
  let preco = document.getElementById("preco").value;

  if (document.getElementById("produto").value.length < 1) {
    window.alert("Digite o Nome de um Produlto!");
    return;
  }

  if (document.getElementById("quantidade").value.length < 1) {
    window.alert("Digite a Quantidade!");
    return;
  }

  if (document.getElementById("preco").value.length < 1) {
    window.alert("Digite o Preço!");
    return;
  }

  //A VARIAVEL ABAIXO MULTIPLICA A QUANTIDADE POR PRECO E GUARDA NO ARRAY NO LOCALSTORAGE.

  let arrayProduto = [];
  let id = produto;
  let total = quantidade * preco;
  arrayProduto.push(produto, quantidade, preco, total);
  localStorage.setItem(produto, JSON.stringify(arrayProduto));
  console.log(arrayProduto);

  imprimirProdutos();

  //CODIGO ABAIXO LIMPA OS IMPUTS APOS ADICIONAR OS VALORES NO ARRAY

  document.getElementById("produto").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("preco").value = "";
  final.innerHTML = "";
}

////////////////////EXCLUIR\\\\\\\\\\\\\\\\\
function excluir(idProduto) {
  localStorage.removeItem(idProduto);
  imprimirProdutos();
}

//SCRIPT QUE FAZ A SOMA DOS PRECOS DE TODOS OS PRODUTOS QUE ESTA ARMAZENADO NO LOCAL STORAGE.

function finalizar() {
  let totalCompras = document.getElementById("totalCompras");
  let arrayTotal = [];
  let somaArray = 0;

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = JSON.parse(localStorage.getItem(key));
    let said = value[3];
    arrayTotal.push(said);
    console.log(arrayTotal);
  }
  for (let i = 0; i < arrayTotal.length; i++) {
    somaArray += arrayTotal[i];
  }

  var tbodyTotal = tbody.insertRow();
  var tr_total = tbodyTotal.insertCell();
  tr_total.innerHTML = `Total:<strong> R$${somaArray.toFixed(2)} </strong>`;
  console.log(somaArray);
  tr_total.classList.add("tr_total");
}
