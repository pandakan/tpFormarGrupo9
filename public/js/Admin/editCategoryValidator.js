const QS = (element) => document.querySelector(element)

window.addEventListener("load", () => {

    let $inputName = QS("#name"),
    $formulario = QS("#form")

    const validation = {
        valiName :/^[a-zA-ZÀ-ÿ\s]{5,40}$/
    }

    let $errorName = QS("#errorName"),
    $errorSubmit = QS("#errorSubmit"),
    $errorBackName = QS("#errorBackName")

    let errors = {
        name:true
    }

    $inputName.addEventListener("blur", e =>{
        switch(true){
            case !$inputName.value.trim():
                $errorName.innerHTML = "Debe ingresar un nombre"
                if ($errorBackName) {
                    $errorBackName.innerHTML = ""
                }
                errors.name = true
                break;
            case (!validation.valiName.test($inputName.value) || $inputName.value.length < 5):
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

    $formulario.addEventListener("submit", function(event){
        event.preventDefault()

        if(errors.name == true){
            $errorSubmit.innerHTML = "Complete el formulario correctamente"
        } 

        if(errors.name == false){
            $errorSubmit.innerHTML = ""
            $formulario.submit()
        }

        
    })
})