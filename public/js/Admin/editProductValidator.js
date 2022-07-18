const QS = (element) => document.querySelector(element);
window.addEventListener("load", () => {
    let $formulario = QS("#form"),
        $inputName = QS("#name"),
        $inputPrice = QS("#price"),
        $inputCategory = QS("#id_categoria"),
        $inputFile = QS("#inputFile"),
        $inputStock = QS("#stock"),
        $inputDescription = QS("#description");

    /* Expresiones */
    const validation = {
        valiName: /^[a-zA-ZÀ-ÿ\s]{5,40}$/,
        valiDescription: /^[a-zA-ZÀ-ÿ\s]{20,90}$/,
        valiPrice: /^[1-9]*(\.?)[0-9]+$/,
    };

    /* Errores */

    let $errorName = QS("#errorName"),
        $errorPrice = QS("#errorPrice"),
        $errorCategory = QS("#errorId_categoria"),
        $errorFile = QS("#errorImage"),
        $errorStock = QS("#errorStock"),
        $errorDescription = QS("#errorDescription"),
        $errorSubmit = QS("#errorSubmit");

    let $errorBackName = QS("#errorBackName"),
        $errorBackPrice = QS("#errorBackPrice"),
        $errorBackCategory = QS("#errorBackIdCategoria");

    let errors = {
        name: true,
        price: true,
        category: true,
    };

    $inputName.addEventListener("blur", (e) => {
        switch (true) {
            case !$inputName.value.trim():
                $errorName.innerHTML = "Debe ingresar un nombre";
                if ($errorBackName) {
                    $errorBackName.innerHTML = "";
                }
                errors.name = true;
                break;
            case !validation.valiName.test($inputName.value):
                $errorName.innerHTML =
                    "Ingrese un nombre sin numeros o caracteres especiales";
                if ($errorBackName) {
                    $errorBackName.innerHTML = "";
                }
                errors.name = true;
                break;
            case $inputName.value.length < 5:
                $errorName.innerHTML = "Ingrese un nombre con 5 letras o más";
                if ($errorBackName) {
                    $errorBackName.innerHTML = "";
                }
                errors.name = true;
                break;
            default:
                $errorName.innerHTML = "";
                errors.name = false;
        }
    });

    $inputPrice.addEventListener("blur", (e) => {
        switch (true) {
            case !$inputPrice.value.trim():
                $errorPrice.innerHTML = "Ingrese un precio";
                if ($errorBackPrice) {
                    $errorBackPrice.innerHTML = "";
                }
                errors.price = true;
                break;
            case !validation.valiPrice.test($inputPrice.value):
                $errorPrice.innerHTML = "Sólo se admiten números";
                if ($errorBackPrice) {
                    $errorBackPrice.innerHTML = "";
                }
                errors.price = true;
                break;
            default:
                $errorPrice.innerHTML = "";
                errors.price = false;
        }
    });

    $inputCategory.addEventListener("blur", e =>{
        switch(true){
            case !$inputCategory.value.trim():
                $errorCategory.innerHTML = "Debe elegir una categoría"
                if ($errorBackCategory) {
                    $errorBackCategory.innerHTML = ""
                }
                errors.category = true
                break;
            /* case !validation.vali.test($inputCategory.value):
                $errorCategory.innerHTML = "La categoria no fue seleccionada"   
                break; */
            default:
                $errorCategory.innerHTML = ""
                errors.category = false
        }
    })

    $inputStock.addEventListener("click", () => {
        $inputStock.value = "on";
        //$inputStock.innerHTML = "";
    });

    /*$inputDescription.addEventListener("blur", e =>{
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
  
      */
    $inputFile.addEventListener("change", function fileValidation() {
        let fileCapturado = $inputFile.value,
            extensionesPermitidas = /(.jpg|.jpeg|.png|.gif)$/i;
        if (!extensionesPermitidas.exec(fileCapturado)) {
            $errorFile.innerHTML =
                "Carga un archivo valido con extension<br>.jpg | .jpeg | .png | .gif";
            $inputFile.value = "";
            errors.file = true;
            return false;
        } else {
            $errorFile.innerHTML = "";
            errors.file = false;
            return true;
        }
    });

    $formulario.addEventListener("submit", function (event) {
        console.log(errors)
        event.preventDefault()

        if (errors.name == true || errors.price == true || errors.category == true) {
            $errorSubmit.innerHTML = "Complete el formulario correctamente";
        }

        if (errors.name == false && errors.price == false && errors.category == false) {
            $errorSubmit.innerHTML = "";
            $formulario.submit();
        }
    });

})
