window.addEventListener('load', function() {

    let $cantidadProducto = document.querySelector('#cantidadProducto');

    $cantidadProducto.addEventListener('input', function(){
        var num = this.value.match(/^\d+$/)
            if (num === null) {
            this.value = "";
        }

        if(this.value < 0){
            this.value = 0;
        }

        if(this.value > 10){
            this.value = 10;
        }
        
    })
})