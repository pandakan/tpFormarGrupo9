const QS = (element)=>document.querySelector(element)
window.addEventListener("load", ()=>{

    let $formulario = QS("form"), 
    $inputName = QS("#name"),
    $inputPrice = QS("#price"),
    $inputCategory = QS("#id_categoria"),
    $inputFile = QS("#inputFile"),
    $inputStock = QS("#stock"),
    $inputDescription = QS("#description")

    /* Expresiones */
    const validation = {
        valiName :/^[a-zA-ZÀ-ÿ\s]{5,40}$/,
        valiDescription: /^[a-zA-ZÀ-ÿ\s]{20,90}$/,
        valiPrice:/^[1-9]*(\.?)[0-9]+$/
    }

    /* Errores */

    let $errorName = QS("#errorName"),
    $errorPrice = QS("#errorPrice"),
    $errorCategory = QS("#errorId_categoria"),
    $errorFile = QS("#errorImage"),
    $errorStock = QS("#errorStock"),
    $errorDescription = QS("#errorDescription")

    $inputName.addEventListener("blur", e =>{
        switch(true){
            case !$inputName.value.trim():
                $errorName.innerHTML = "Escriba el nombre del producto"
                break;
            case !validation.valiName.test($inputName.value):
                 $errorName.innerHTML = "Nombre invalido"   
                break;
            default:
                $errorName.innerHTML = ""
        }
    })
    $inputPrice.addEventListener("blur", e =>{
        switch(true){
            case !$inputPrice.value.trim():
                $errorPrice.innerHTML = "Ingrese un precio"
                break;
            case !validation.valiPrice.test($inputPrice.value):
                $errorPrice.innerHTML = "Ingrese un precio correcto"   
                break;
            default:
                $errorPrice.innerHTML = ""
        }
    })
    $inputCategory.addEventListener("blur", e =>{
        switch(true){
            case !$inputCategory.value.trim():
                $errorCategory.innerHTML = "Seleccione una categoria"
                break;
            default:
                $errorCategory.innerHTML = ""
        }
    })
    $inputStock.addEventListener("click", ()=>{
        $inputStock.value = "on"
        $inputStock.innerHTML = ""
    })
    $inputDescription.addEventListener("blur", e =>{
        switch(true){
            case !$inputDescription.value.trim():
                $errorDescription.innerHTML = "Ingrese una descripcion del producto"
                break;
            case !validation.valiDescription.test($inputDescription.value):
                $errorDescription.innerHTML = "La descripcion tiene que tener entre 20 a 100 caracteres."   
                break;
            default:
                $errorDescription.innerHTML = ""
        }
    })
    $inputFile.addEventListener("change", function fileValidation(){
        let fileCapturado = $inputFile.value, extensionesPermitidas = /(.jpg|.jpeg|.png|.gif)$/i
        if(!extensionesPermitidas.exec(fileCapturado)){
            $errorFile.innerHTML = "Carga un archivo valido este <br>debe tener alguna de las<br> extensiones permitidas<br>(.jpg |.jpeg |.png |.gif)"
            $inputFile.value = ""
            return false
        }
    })
    $formulario.addEventListener("submit", function(e){
        e.preventDefault();
        let form = this.elements
        console.log(form)
        for(let i = 0; i < form.length -1; i ++){
            if(form[i].value ==""){
                
                $errorSubmit.innerHTML = "Los datos señalados son obligatorios"
            }
            else{
            alert("Hay errores en el formulario")
            }
        }
         
    })

})