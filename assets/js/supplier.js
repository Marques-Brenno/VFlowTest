let inputSupplier = document.querySelectorAll('input[required]');

function dadosFornecedor(){
    let vazio = false;

    for (let i = 0; i < inputSupplier.length; i++) {
        if (inputSupplier[i].value.trim() == "") {
            vazio = true ;
           const label = document.querySelector(`label[for="${inputSupplier[i].id}"]`);
            errorAlert(`Campo ${label.textContent} está vazio`)
            break;
        }
    }

    if(!vazio){
        return true;
    }

}

document.querySelector("#save-supplier").addEventListener("click", dadosFornecedor)