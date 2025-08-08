let inputSupplier = document.querySelectorAll('input[required]');
let telefone = document.querySelector("#telefone");
let email = document.querySelector("#email");
let cnpj = document.querySelector("#cnpj");

// Função para validar os dados do fornecedor
function dadosFornecedor() {
    let vazio = false;
    let incompleto = false;

    // Verifica se todos os campos obrigatórios estão preenchidos
    for (let i = 0; i < inputSupplier.length; i++) {
        if (inputSupplier[i].value.trim() == "") {
            vazio = true;
            const label = document.querySelector(`label[for="${inputSupplier[i].id}"]`);
            errorAlert(`Campo ${label.textContent} está vazio`);
            return false;
        }
    }

    // Verifica se o telefone, email e CNPJ estão completos
    if (telefone.value.length < 19) {
        incompleto = true;
        errorAlert(`Campo Telefone está incompleto`);
    } else if (!email.value.includes("@")) {
        incompleto = true;
        errorAlert(`Campo email está incompleto`);
    } else if (cnpj.value.length < 18) {
        incompleto = true;
        errorAlert(`Campo CNPJ está incompleto`);
    }

    return !vazio && !incompleto;
}
