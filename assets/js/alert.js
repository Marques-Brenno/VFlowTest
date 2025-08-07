function errorAlert(textAlert){
    let divAlert = document.createElement("div");
    divAlert.className = "alert";
    divAlert.style.marginLeft = "100%";
    
    let div = document.createElement("div");

    let alertIcon = document.createElement("div");
    alertIcon.className = "alert-icon";

    let alertCircle = document.createElement("div");
    alertCircle.className = "alert-circle";

    let icon = document.createElement("i");
    icon.className = "fa-solid fa-exclamation"; 

    let alertText = document.createElement("div");
    alertText.className = "alert-text";
    alertText.textContent = textAlert;

    let alertTime = document.createElement("div");
    alertTime.className = "alert-time"; 

    
    containerAlert.appendChild(divAlert);
    divAlert.appendChild(div);
    div.appendChild(alertIcon);
    alertIcon.appendChild(alertCircle);
    alertCircle.appendChild(icon);
    div.appendChild(alertText);
    divAlert.appendChild(alertTime);
    
    setTimeout(function(){
        divAlert.style.animation = "forwards .5s diminui"; 
    },4500);

    
    setTimeout(function(){
        divAlert.remove();
    },5000);
}