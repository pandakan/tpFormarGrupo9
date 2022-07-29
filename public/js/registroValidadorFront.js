const QS = (element) => document.querySelector(element)

window.addEventListener("load", () => {
    let $formulario = QS("#form")
    let $inputName = QS("#name")
    let $inputEmail = QS("#email")
    let $inputPasswd = QS("#passwd")
    let $inputPasswd2 = QS("#passwd2")
    let $inputFile = QS("#avatar")
    let $inputTerms = QS("#terms")

    let $errorBackName = QS("#errorBackName")
    let $errorBackEmail = QS("#errorBackEmail")
    let $errorBackPasswd = QS("#errorBackPasswd")
    let $errorBackPasswd2 = QS("#errorBackPasswd2")
    let $errorBackTerms = QS("#errorBackTerms")



    /* Expresiones */
    const validation = {
        valiName: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
        valiPasswd: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/


        //^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[$@$!%?&#.$($)$-$_])[A-Za-z\d$@$!%?&#.$($)$-$_]{8,16}$/
        /* /^(?=(?:.\d))(?=(?:.[A-Z]))(?=(?:.*[a-z]))\S{8,}$/ */,
        valiEmail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        valiTelefono: /^\d{7,14}$/
    }
    /* errors */
    let $errorName = QS("#errorName")
    let $errorEmail = QS("#errorEmail")
    let $errorPasswd = QS("#errorPasswd")
    let $errorFile = QS("#errorFile")
    let $errorPassswd2 = QS("#errorPasswd2")
    let $errorCaptcha = QS("#errorCaptcha")
    let $errorTerms = QS("#errorTerms")
    let $errorSubmit = QS("#errorSubmit")

    let errors = {
        name: true,
        email: true,
        passwd: true,
        passwd2: true,
        file: true,
        terms: true,
    }

    $inputName.addEventListener("blur", e => {
        switch (true) {
            case !$inputName.value.trim():
                $errorName.innerHTML = "Debe ingresar un nombre"
                if ($errorBackName) {
                    $errorBackName.innerHTML = ""
                }
                errors.name = true
                break;
            case (!validation.valiName.test($inputName.value) || $inputName.value.length < 3):
                $errorName.innerHTML = "Ingrese un nombre válido"
                if ($errorBackName) {
                    $errorBackName.innerHTML = ""
                }
                errors.name = true
                break;
            default:
                $errorName.innerHTML = ""
                errors.name = false
        }
    })

    $inputEmail.addEventListener("blur", e => {
        switch (true) {
            case !$inputEmail.value.trim():
                $errorEmail.innerHTML = "Debe ingresar un email"
                if ($errorBackEmail) {
                    $errorBackEmail.innerHTML = ""
                }
                errors.email = true
                break;
            case !validation.valiEmail.test($inputEmail.value):
                $errorEmail.innerHTML = "Ingrese un email válido"
                if ($errorBackEmail) {
                    $errorBackEmail.innerHTML = ""
                }
                errors.email = true
                break;
            default:
                $errorEmail.innerHTML = ""
                errors.email = false
        }
    })

    $inputPasswd.addEventListener("blur", e => {
        switch (true) {
            case !$inputPasswd.value.trim():
                $errorPasswd.innerHTML = "Ingrese una contraseña"
                if ($errorBackPasswd) {
                    $errorBackPasswd.innerHTML = ""
                }
                errors.passwd = true
                break;
            case $inputPasswd.value.length < 8/*!validation.valiPasswd.test($inputPasswd.value)*/:
                //$errorPasswd.innerHTML = "La contraseña debe tener:<br> Entre 8 a 16 digitos <br>Una mayuscula<br>Una minuscula<br>Un numero<br>"   
                $errorPasswd.innerHTML = "La contraseña debe tener<br> por lo menos 8 caracteres"
                if ($errorBackPasswd) {
                    $errorBackPasswd.innerHTML = ""
                }
                errors.passwd = true
                break;
            default:
                $errorPasswd.innerHTML = ""
                errors.passwd = false
        }

    })

    $inputPasswd2.addEventListener('blur', function () {
        switch (true) {
            case !$inputPasswd2.value.trim():
                $errorPassswd2.innerHTML = 'Reingrese su contraseña'
                if ($errorBackPasswd2) {
                    $errorBackPasswd2.innerHTML = ""
                }
                errors.passwd2 = true
                break;
            case $inputPasswd2.value !== $inputPasswd.value:
                $errorPassswd2.innerHTML = 'Las contraseñas no coinciden';
                if ($errorBackPasswd2) {
                    $errorBackPasswd2.innerHTML = ""
                }
                errors.passwd2 = true
                break;
            default:
                $errorPassswd2.innerHTML = ""
                errors.passwd2 = false
                break;
        }
    })

    $inputTerms.addEventListener("click", function () {
        $inputTerms.value = "on"
        $inputTerms.innerHTML = ""
        errors.terms = false
    })

    $inputFile.addEventListener("click", function(){
        switch (true) {
            case ($inputFile.files.length == 0):
                $errorFile.innerHTML = "Carga un archivo"
                $inputFile.value = ""
                //$viewFile.innerHTML = ""
                errors.file = true
                //return false
                break;
        }
    })

    $inputFile.addEventListener("change", function fileValidation() {
        let fileCapturado = $inputFile.value, extensionesPermitidas = /(.jpg|.jpeg|.png|.gif)$/i

        switch (true) {
            case (!extensionesPermitidas.exec(fileCapturado)):
                $errorFile.innerHTML = "Carga un archivo valido con extension<br>.jpg | .jpeg | .png | .gif"
                $inputFile.value = ""
                //$viewFile.innerHTML = ""
                errors.file = true
                //return false
                break;
            default:
                $errorFile.innerHTML = ""
                errors.file = false
                break;
        }



        /*if($inputFile.files.length == 0){
            $errorFile.innerHTML = "Carga un archivo"
            $inputFile.value = ""
            //$viewFile.innerHTML = ""
            errors.file = true
            //return false
        } else if(!extensionesPermitidas.exec(fileCapturado)){
            $errorFile.innerHTML = "Carga un archivo valido con extension<br>.jpg | .jpeg | .png | .gif"
            $inputFile.value = ""
            //$viewFile.innerHTML = ""
            errors.file = true
            //return false
        }else{
            errors.file = false
        }*/
    })

    $formulario.addEventListener("submit", function (event) {
        event.preventDefault()

        if (!$inputTerms.checked) {
            $errorTerms.innerHTML = "Debes aceptar los términos y condiciones";
            //$errorBackTerms.innerHTML = "";
        } else {
            $errorTerms.innerHTML = "";
            //$errorBackTerms.innerHTML = "";
        }

        if (errors.name == true || errors.email == true || errors.passwd == true || errors.passwd2 == true || errors.file == true || errors.terms == true) {
            $errorSubmit.innerHTML = "Complete el formulario correctamente"

        }

        if (errors.name == false && errors.email == false && errors.passwd == false && errors.passwd2 == false && errors.file == false && errors.terms == false) {

            $errorSubmit.innerHTML = ""
            $formulario.submit()

        }


    })


})