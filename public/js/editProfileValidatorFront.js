console.log("Validaciones front para editar perfil");

const QS = (element) => document.querySelector(element)

window.addEventListener("load", () => {
    let $formulario = QS("#form")
    let $inputName = QS("#name")
    let $inputEmail = QS("#email")

    const validation = {
        valiName: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
        valiEmail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        valiTelefono: /^\d{7,14}$/
    }

    /* errors */
    let $errorName = QS("#errorName")
    let $errorEmail = QS("#errorEmail")
    let $errorSubmit = QS("#errorSubmit")

    let $errorBackName = QS("#errorBackName")
    let $errorBackEmail = QS("#errorBackEmail")

    let errors = {
        name: true,
        email: true,
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
            case (!validation.valiName.test($inputName.value)):
                $errorName.innerHTML = "Ingrese un nombre válido"
                if ($errorBackName) {
                    $errorBackName.innerHTML = ""
                }
                errors.name = true
                break;
            case ($inputName.value.length < 3):
                $errorName.innerHTML = "Ingrese 3 caracteres como mínimo"
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

    $formulario.addEventListener("submit", function (event) {
        event.preventDefault()

        if (errors.name == true || errors.email == true) {
            $errorSubmit.innerHTML = "Complete el formulario correctamente"

        }

        if (errors.name == false && errors.email == false) {

            $errorSubmit.innerHTML = ""
            $formulario.submit()

        }


    })

})