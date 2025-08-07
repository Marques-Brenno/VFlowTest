const exibirModalAnexo = document.querySelector("#add-anexo");


function ModalAnexo(){
    modal.className = "active";
    document.querySelector("body").style.overflowY = "hidden";

    let addAnexo = document.createElement("div");
    addAnexo.className = "add-anexo";

    modal.appendChild(addAnexo);

    let addAnexoHeader = document.createElement("div");
    addAnexoHeader.className = "anexo-header";

    addAnexo.appendChild(addAnexoHeader);

    let title = document.createElement("h1");
    title.textContent = "Adicionar novo Anexo";

    addAnexoHeader.appendChild(title);

    let btnClose = document.createElement("button");
    btnClose.setAttribute("id", "close");
    btnClose.innerHTML = "&times;";

    btnClose.addEventListener("click", CloseModal);

    addAnexoHeader.appendChild(btnClose);

    let bodyAnexo = document.createElement("div");
    bodyAnexo.className = "body-anexo";

    addAnexo.appendChild(bodyAnexo);

    let fieldset = document.createElement("fieldset");

    bodyAnexo.appendChild(fieldset)

    let container = document.createElement("div");
    container.className = "container";

    fieldset.appendChild(container);

    let folder = document.createElement("div");
    folder.className = "folder";

    container.appendChild(folder);

    let frontSide = document.createElement("div");
    frontSide.className = "front-side";

    folder.appendChild(frontSide);

    let tip = document.createElement("div");
    tip.className = "tip";

    frontSide.appendChild(tip);

    let cover = document.createElement("div");
    cover.className = "cover";

    frontSide.appendChild(cover);

    let backSideCover = document.createElement("div");
    backSideCover.className = "back-side cover";

    folder.appendChild(backSideCover);

    let customFile = document.createElement("label");
    customFile.className = "custom-file-upload";

    container.appendChild(customFile);

    let inputFile = document.createElement("input");
    inputFile.setAttribute("type", "file");
    inputFile.className = "title";
    customFile.textContent += "Escolha um arquivo";

    customFile.appendChild(inputFile);

    let anexoTitle = document.createElement("h2");
    anexoTitle.className = "anexo-title";

    fieldset.appendChild(anexoTitle)

    inputFile.addEventListener("change", () => {
        if (inputFile.files.length > 0) {
            anexoTitle.textContent = inputFile.files[0].name;
        } else {
            anexoTitle.textContent = "";
        }
    });

    let addFile = document.createElement("button");
    addFile.setAttribute("type", 'button');
    addFile.setAttribute("id", 'add-anexo-modal');
    addFile.textContent = "Adicionar Anexo";

    bodyAnexo.appendChild(addFile);
    

}





function CloseModal(){
    document.querySelector("body").style.overflowY = "auto";
    modal.className = "disabled";
    modal.innerHTML = "";

}

exibirModalAnexo.addEventListener("click", ModalAnexo)