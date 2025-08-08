// Seleciona os elementos do DOM
const cep = document.querySelector("#cep");
let rua = document.querySelector("#endereco");
let bairro = document.querySelector("#bairro");
let municipio = document.querySelector("#municipio");
let estado = document.querySelector("#estado");

// Função para buscar informações do CEP
function buscarCEP() {
  let cepValue = cep.value.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (cepValue.length !== 8) {
    errorAlert("CEP incompleto");
    // Limpa os campos de endereço
    rua.value = "";
    bairro.value = "";
    municipio.value = "";
    estado.value = "";
    return;
  }

  // Faz uma requisição para a API de CEP
  fetch(`https://brasilapi.com.br/api/cep/v1/${cepValue}`)
    .then(response => response.json())
    .then(data => {
      if (data.erro) {
        errorAlert("CEP não encontrado");
        // Limpa os campos de endereço
        rua.value = "";
        bairro.value = "";
        municipio.value = "";
        estado.value = "";
        return;
      }

      // Preenche os campos com os dados retornados pela API
      municipio.value = data.city || "";
      estado.value = data.state || "";
      rua.value = data.street || "";
      bairro.value = data.neighborhood || "";

      if (!data.street || !data.neighborhood) {
        errorAlert("Este CEP é geral do município. Preencha o endereço completo manualmente.");
      }
    })
    .catch(() => {
      errorAlert("Erro ao buscar CEP");
      // Limpa os campos de endereço
      rua.value = "";
      bairro.value = "";
      municipio.value = "";
      estado.value = "";
    });
}

// Adiciona um evento para buscar o CEP quando o campo perde o foco
cep.addEventListener("blur", buscarCEP);
