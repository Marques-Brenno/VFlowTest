const cep = document.querySelector("#cep");
let rua = document.querySelector("#endereco");
let bairro = document.querySelector("#bairro");
let municipio = document.querySelector("#municipio");
let estado = document.querySelector("#estado");

function buscarCEP() {
  let cepValue = cep.value.replace(/\D/g, "");

  if (cepValue.length !== 8) {
    errorAlert("CEP incompleto");
    rua.value = "";
    bairro.value = "";
    municipio.value = "";
    estado.value = "";
    return;
  }

  fetch(`https://brasilapi.com.br/api/cep/v1/${cepValue}`)
    .then(response => response.json())
    .then(data => {
      if (data.erro) {
        errorAlert("CEP não encontrado");
        rua.value = "";
        bairro.value = "";
        municipio.value = "";
        estado.value = "";
        return;
      }

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
      rua.value = "";
      bairro.value = "";
      municipio.value = "";
      estado.value = "";
    });
}

cep.addEventListener("blur", buscarCEP);