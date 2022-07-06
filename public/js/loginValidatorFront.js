const QS = (element)=>document.querySelector(element)
window.addEventListener("load",()=>{
    let $inputEmail = QS("#email")
    let $inputPasswd = QS("#passwd")

    const validation = {
        valiPasswd:/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
        valiEmail:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    }

    let $errorEmail = QS("#errorEmail")
    let $errorPasswd = QS("#errorPasswd")

    $inputEmail.addEventListener("blur", e =>{
        switch(true){
            case !$inputEmail.value.trim():
                $errorEmail.innerHTML = "Escriba un email"
                break;
            case !validation.valiEmail.test($inputEmail.value):
                 $errorEmail.innerHTML = "El email es incorrecto"   
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
                 $errorPasswd.innerHTML = "La contraseña debe tener:<br> Entre 8 a 16 digitos <br>Una mayuscula<br>Una minuscula<br>Un numero"   
                break;
            default:
                $errorPasswd.innerHTML = ""
        }
    })
})