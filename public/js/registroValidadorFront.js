const QS = (element)=>document.querySelector(element)

window.addEventListener("load", ()=>{
    let $formulario = QS("form")
    let $inputName = QS("#name")
    let $inputEmail = QS("#email")
    let $inputPasswd = QS("#passwd")
    let $inputFile = QS("#avatar")
    let $inputTC = QS("#activo")
    

    /* Expresiones */
    const validation = {
        valiName :/^[a-zA-ZÀ-ÿ\s]{2,40}$/,
        valiPasswd:/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
        //^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[$@$!%?&#.$($)$-$_])[A-Za-z\d$@$!%?&#.$($)$-$_]{8,16}$/
        /* /^(?=(?:.\d))(?=(?:.[A-Z]))(?=(?:.*[a-z]))\S{8,}$/ */,
        valiEmail:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        valiTelefono:/^\d{7,14}$/
    }
    /* errors */
    let $errorName = QS("#errorName")
    let $errorEmail = QS("#errorEmail")
    let $errorPasswd = QS("#errorPasswd")
    let $errorFile = QS("#errorFile")
    let $errorCaptcha = QS("#errorCaptcha")
    let $errorTC = QS("#errorTC")
    let $errorSubmit=QS("#errorSubmit") 

    let errors = {
        name:false,
        lastName:false,
        email:false,
        passwd: false,
        telefono:false
    }

    $inputName.addEventListener("blur", e =>{
        switch(true){
            case !$inputName.value.trim():
                $errorName.innerHTML = "Escriba su nombre"
                break;
            case !validation.valiName.test($inputName.value):
                 $errorName.innerHTML = "Nombre invalido"   
                break;
            default:
                $errorName.innerHTML = ""
        }
    })

    $inputEmail.addEventListener("blur", e =>{
        switch(true){
            case !$inputEmail.value.trim():
                $errorEmail.innerHTML = "Escriba un email"
                break;
            case !validation.valiEmail.test($inputEmail.value):
                 $errorEmail.innerHTML = "El email invalido"   
                break;
            default:
                $errorEmail.innerHTML = ""
        }
    })
    $inputPasswd.addEventListener("blur", e =>{
        switch(true){
            case !$inputPasswd.value.trim():
                $errorPasswd.innerHTML = "Escriba una contraseña"
                break;
            case !validation.valiPasswd.test($inputPasswd.value):
                 $errorPasswd.innerHTML = "La contraseña debe tener:<br> Entre 8 a 16 digitos <br>Una mayuscula<br>Una minuscula<br>Un numero<br>"   
                break;
            default:
                $errorPasswd.innerHTML = ""
        }

    })
    $inputTC.addEventListener("click", ()=>{
        $inputTC.value = "on"
        $inputTC.innerHTML = ""
    })
    $inputFile.addEventListener("change", function fileValidation(){
        let fileCapturado = $inputFile.value, extensionesPermitidas = /(.jpg|.jpeg|.png|.gif)$/i
        if(!extensionesPermitidas.exec(fileCapturado)){
            $errorFile.innerHTML = "Carga un archivo valido este <br>debe tener alguna de las<br> extensiones permitidas<br>(.jpg |.jpeg |.png |.gif)"
            $inputFile.value = ""
            $viewFile.innerHTML = ""
            return false
        }
    })
})