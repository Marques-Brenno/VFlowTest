// Função que é chamada quando a janela é carregada
window.onload = function () {
    atualizarProducts(); // Atualiza a lista de produtos
    atualizarAnexos();   // Atualiza a lista de anexos
};

// Função para exibir um alerta de erro
function errorAlert(textAlert) {
    // Cria um novo elemento div para o alerta
    let divAlert = document.createElement("div");
    divAlert.className = "alert"; 
    divAlert.style.marginLeft = "100%";

    // Cria um contêiner para o conteúdo do alerta
    let div = document.createElement("div");

    // Cria o ícone do alerta
    let alertIcon = document.createElement("div");
    alertIcon.className = "alert-icon";

    // Cria o círculo do ícone do alerta
    let alertCircle = document.createElement("div");
    alertCircle.className = "alert-circle";

    // Cria o elemento do ícone de exclamacão
    let icon = document.createElement("i");
    icon.className = "fa-solid fa-exclamation"; // Classe do Font Awesome para o ícone

    // Cria o texto do alerta
    let alertText = document.createElement("div");
    alertText.className = "alert-text";
    alertText.textContent = textAlert; // Define o texto do alerta

    // Cria um contêiner para o tempo do alerta (se necessário)
    let alertTime = document.createElement("div");
    alertTime.className = "alert-time";

    // Adiciona os elementos ao DOM
    containerAlert.appendChild(divAlert); 
    divAlert.appendChild(div);  
    div.appendChild(alertIcon); 
    alertIcon.appendChild(alertCircle); 
    alertCircle.appendChild(icon); 
    div.appendChild(alertText);
    divAlert.appendChild(alertTime); 

    // Define um tempo para iniciar a animação de diminuição após 4.5 segundos
    setTimeout(function () {
        divAlert.style.animation = "forwards .5s diminui"; // Inicia a animação de diminuição
    }, 4500);

    // Remove o alerta do DOM após 5 segundos
    setTimeout(function () {
        divAlert.remove(); // Remove o alerta
    }, 5000);
}
