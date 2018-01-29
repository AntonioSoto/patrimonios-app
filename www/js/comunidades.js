function cargarComunidades(){
    resetMap();
	mostrarCargando();
	if (COMUNIDADES.length > 0) {
        ocultarCargando();
        //repetimos la accion dado que en inicio se cargan las comunidades
        colocarComunidades(COMUNIDADES);
        return;
    }
     $("#tablaComunidades").html("").listview('refresh');
     $.ajax( datosAjax(URL + 'communities') ).done(function (resp) {
        COMUNIDADES = resp;

        colocarComunidades(COMUNIDADES);
        ocultarCargando();
    });
}

function colocarComunidades(comunidades) {
    var linea = "<li data-role='list-divider'>Comunidades</li>";
     
    for (var i = 0; i < comunidades.length; i++) {
        var descripcion = comunidades[i].shortDescription;
         if (descripcion === "") { descripcion = "Sin descripción"; } 
        var contenido = "<h2>" + comunidades[i].name + "</h2>";
        contenido = contenido + "<p>" + descripcion + "</p>";
        linea = linea + "<li><a id='" + comunidades[i].uuid + "'href='#' data-transition='slide'>" + contenido + "</a></li>";
    }

    $("#tablaComunidades").html(linea).listview('refresh');
    $('#tablaComunidades a').on('tap', function (e) {
        e.preventDefault();
        NOMBRE_COMUN = $(this.children[0]).text();
        $("#nombreComunidad").html("<b>" + NOMBRE_COMUN + "</b>");
        console.log("Comunidad UUID: " + this.id);
        localStorage.comunidadUUID = this.id;
        $(":mobile-pagecontainer").pagecontainer("change", "#pagColecciones");
    });
}

function colocarComunidadesMini() {
    resetMap();
    mostrarCargando();
    if (COMUNIDADES.length > 0) {
        ocultarCargando();
        return;
    }
    $.ajax( datosAjax(URL + 'communities') ).done(function (resp) {
        COMUNIDADES = resp;
        var linea = "";
        for (var i = 0; i < COMUNIDADES.length; i++) {
            linea = linea + "<li><a id='" + COMUNIDADES[i].uuid + "'href='#' data-transition='slide'>" + COMUNIDADES[i].name + "</a></li>";
        }
        $("#listaComunidades").html(linea);
        $('#listaComunidades a').on('tap', function (e) {
            e.preventDefault();
            NOMBRE_COMUN = $(this).text();
            $("#nombreComunidad").html("<b>" + NOMBRE_COMUN + "</b>");
            localStorage.comunidadUUID = this.id;
            $(":mobile-pagecontainer").pagecontainer("change", "#pagColecciones");
        });
        ocultarCargando();
    });
}