console.log("Validaciones front para editar contraseña");

const QS = (element) => document.querySelector(element)

window.addEventListener("load", () => {
    let $formulario = QS("#form")
    let $inputOldPassword = QS("#oldPassword")
    let $inputNewPassword1 = QS("#newPassword1")
    let $inputNewPassword2 = QS("#newPassword2")

    const validation = {
        
    }

    /* errors */
    let $errorOldPassword = QS("#errorOldPassword")
    let $errorNewPassword1 = QS("#errorNewPassword1")
    let $errorNewPassword2 = QS("#errorNewPassword2")
    let $errorSubmit = QS("#errorSubmit")

    let $errorBackOldPassword = QS("#errorBackOldPassword")
    let $errorBackNewPassword1 = QS("#errorBackNewPassword1")
    let $errorBackNewPassword2 = QS("#errorBackNewPassword2")

    let errors = {
        oldPassword: true,
        newPassword1: true,
        newPassword2: true,
    }

    $inputOldPassword.addEventListener("blur", e => {
        switch (true) {
            case !$inputOldPassword.value.trim():
                $errorOldPassword.innerHTML = "Ingrese una contraseña"
                if ($errorBackOldPassword) {
                    $errorBackOldPassword.innerHTML = ""
                }
                errors.oldPassword = true
                break;
            case $inputOldPassword.value.length < 8/*!validation.valiPasswd.test($inputPasswd.value)*/:
                //$errorPasswd.innerHTML = "La contraseña debe tener:<br> Entre 8 a 16 digitos <br>Una mayuscula<br>Una minuscula<br>Un numero<br>"   
                $errorOldPassword.innerHTML = "La contraseña debe tener<br> por lo menos 8 caracteres"
                if ($errorBackOldPassword) {
                    $errorBackOldPassword.innerHTML = ""
                }
                errors.oldPassword = true
                break;
            default:
                $errorOldPassword.innerHTML = ""
                errors.oldPassword = false
        }
    })

    $inputNewPassword1.addEventListener("blur", e => {
        switch (true) {
            case !$inputNewPassword1.value.trim():
                $errorNewPassword1.innerHTML = "Ingrese una contraseña"
                if ($errorBackNewPassword1) {
                    $errorBackNewPassword1.innerHTML = ""
                }
                errors.newPassword1 = true
                break;
            case $inputNewPassword1.value.length < 8/*!validation.valiPasswd.test($inputPasswd.value)*/:
                //$errorPasswd.innerHTML = "La contraseña debe tener:<br> Entre 8 a 16 digitos <br>Una mayuscula<br>Una minuscula<br>Un numero<br>"   
                $errorNewPassword1.innerHTML = "La contraseña debe tener<br> por lo menos 8 caracteres"
                if ($errorBackNewPassword1) {
                    $errorBackNewPassword1.innerHTML = ""
                }
                errors.newPassword1 = true
                break;
            default:
                $errorNewPassword1.innerHTML = ""
                errors.newPassword1 = false
        }

    })

    $inputNewPassword2.addEventListener('blur', function () {
        switch (true) {
            case !$inputNewPassword2.value.trim():
                $errorNewPassword2.innerHTML = 'Reingrese su contraseña'
                if ($errorBackNewPassword2) {
                    $errorBackNewPassword2.innerHTML = ""
                }
                errors.newPassword2 = true
                break;
            case $inputNewPassword2.value !== $inputNewPassword1.value:
                $errorNewPassword2.innerHTML = 'Las contraseñas no coinciden';
                if ($errorBackNewPassword2) {
                    $errorBackNewPassword2.innerHTML = ""
                }
                errors.newPassword2 = true
                break;
            default:
                $errorNewPassword2.innerHTML = ""
                errors.newPassword2 = false
                break;
        }
    })

    $formulario.addEventListener("submit", function(event){
        event.preventDefault()
        if (errors.oldPassword == true || errors.newPassword1 == true || errors.newPassword2 == true) {
            $errorSubmit.innerHTML = "Complete el formulario correctamente"
        }

        if (errors.oldPassword == false && errors.newPassword1 == false && errors.newPassword2 == false) {

            $errorSubmit.innerHTML = ""
            $formulario.submit()

        }
    })


})