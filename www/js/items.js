function mostrarItemsColeccion(uuid) {
    mostrarCargando();

    if (ITEMS_COLECCION.length > 0 && (ITEMS_COLECCION_ANT === uuid)) {
        ocultarCargando();
        return;
    }

    ITEMS_COLECCION_ANT = uuid;
    $("#tablaColecItems").html("").listview('refresh');
    ULT_ITEM = 0;
    $("#msgNoHayItemsColeccion").hide();

    $.ajax( datosAjax(URL + 'collections/' + uuid + "/items") ).done(function (resp) {
        if (resp.length < 1) {
            $("#msgNoHayItemsColeccion").show();
            ocultarCargando();
            return;
        }
        ITEMS_COLECCION = resp;
        colocarItems(ITEMS_COLECCION);
    });
}

var ULT_ITEM = 0;

function colocarItems(items) {
    if (ULT_ITEM === items.length) {
        return;
    }
    mostrarCargando();
    var linea = "<li data-role='list-divider'>Documentos</li>";
    try {
        for (var i = 0; i < MAXIMO + ULT_ITEM; i++) {
            //<img src='img/document.jpg'>
            var contenido = "<h2>" + items[i].name + "</h2>";
            contenido = contenido + "<p> Última modificación: " + items[i].lastModified + "</p>";
            linea = linea + "<li><a id='" + items[i].uuid + "'href='#' data-transition='slide'>" + contenido + "</a></li>";
        }
    } catch (err) {
        console.log("Maximo de lista alcanzado");
    }
    ULT_ITEM = i;
    $("#tablaColecItems").html(linea).listview('refresh');
    $('#tablaColecItems a').on('tap', function (e) {
        console.log("Detalle de item: " + this.id);
        e.preventDefault();
        localStorage.itemUUID = this.id;
        $(":mobile-pagecontainer").pagecontainer("change", "#pagDetalleItem");
    });
    ocultarCargando();
}

function agregarMasItems() {
    
    $(document).off("scrollstop");
    console.log("Intentando agregar items");
    
    setTimeout(function () {
        colocarItems(ITEMS_COLECCION);
        $(document).on("scrollstop", verificarScroll);
    }, 500);
}

function mostrarMetadatosItem(uuid) {
    mostrarCargando();
    if (uuid === ITEM_DETALLE) {
        ocultarCargando();
        return;
    }
    ITEM_DETALLE = uuid;
    reiniciarDetalleItem();
    $.ajax( datosAjax(URL + "items/" + uuid + "/metadata") ).done(function (resp) {
        colocarMetadatos(resp);
        ocultarCargando();
    });
}

function colocarMetadatos(metadatos) {

    var valPertenencia = "";
    var valEpoca = "";
    var valSisEstructPresbiterio = "";
    var valPisos = "";
    var valAcabados = "";
    var valMateriales = "";
    var valBienes = "";
    var moreInfoString = "";

    for (var i = 0; i < metadatos.length; i++) {

        var llave = metadatos[i].key;
        var valor = metadatos[i].value;

        switch (llave) {
            case "arq.Nombre":
                moreInfoString = moreInfoString + valor + "+";
                $("#arqNombre").text(valor);
                break;
            case "arq.Direccion":
                $("#arqDireccion").text(valor);
                break;
            case "arq.Pertenencia":
                valPertenencia = valPertenencia + "<li><p>"+valor+"</p></li>";
                $("#arqPertenencia").html(valPertenencia);
                break;
            case "arq.Localidad":
                moreInfoString = moreInfoString + valor + "+";
                $("#arqLocalidad").text(valor);
                break;
            case "arq.Municipio":
                moreInfoString = moreInfoString + valor + "+";
                $("#arqMunicipio").text(valor);
                break;
            case "arq.Entidad":
                moreInfoString = moreInfoString + valor + "+";
                $("#arqEntidad").text(valor);
                break;
            case "arq.Jurisdiccion":
                $("#arqJurisdiccion").text(valor);
                break;
            case "arq.CategoriaActual":
                moreInfoString = moreInfoString + valor + "+";
                $("#arqCategoriaActual").text(valor);
                break;
            case "arq.CategoriaOriginal":
                $("#arqCategoriaOriginal").text(valor);
                break;
            case "arq.Epoca":
                valEpoca = valEpoca + "<li><p>"+valor+"</p></li>";
                $("#arqEpoca").html(valEpoca);
                break;
            case "arq.Anio":
                $("#arqAnio").text(valor);
                break;
            case "arq.UsoActual":
                $("#arqUsoActual").text(valor);
                break;
            case "arq.Fundador":
                $("#arqFundador").text(valor);
                break;
            case "arq.Constructor":
                $("#arqConstructor").text(valor);
                break;
            case "arq.EstadoConservacion":
                $("#arqEstadoConservacion").text(valor);
                break;
            case "arq.Tipologia":
                $("#arqTipologia").text(valor);
                break;
            case "arq.TipologiaArqui":
                $("#arqTipologiaArqui").text(valor);
                break;
            case "arq.Muros":
                $("#arqMuros").text(valor);
                break;
            case "arq.SistemaCubierta":
                $("#arqSistemaCubierta").text(valor);
                break;
            case "arq.SisEstructNave":
                $("#arqSisEstructNave").text(valor);
                break;
            case "arq.SisEstructCrucero":
                $("#arqSisEstructCrucero").text(valor);
                break;
            case "arq.SisEstructPresbiterio":
                valSisEstructPresbiterio = valSisEstructPresbiterio + "<li><p>"+valor+"</p></li>";
                $("#arqSisEstructPresbiterio").html(valSisEstructPresbiterio);
                break;
            case "arq.SisEstructCoro":
                $("#arqSisEstructCoro").text(valor);
                break;
            case "arq.Pisos":
                valPisos = valPisos + "<li><p>"+valor+"</p></li>";
                $("#arqPisos").html(valPisos);
                break;
            case "arq.Acabados":
                valAcabados = valAcabados + "<li><p>"+valor+"</p></li>";
                $("#arqAcabados").html(valAcabados);
                break;
            case "arq.Materiales":
                valMateriales = valMateriales + "<li><p>"+valor+"</p></li>";
                $("#arqMateriales").html(valMateriales);
                break;
            case "arq.GallinasCiegas":
                $("#arqGallinasCiegas").text(valor);
                break;
            case "arq.Bienes":
                valBienes = valBienes + "<li><p>"+valor+"</p></li>";
                $("#arqBienes").html(valBienes);
                break;
            case "arq.ObservBienes":
                $("#arqObservBienes").text(valor);
                break;
            case "arq.ObservGenerales":
                $("#arqObservGenerales").text(valor);
                break;
            /*case "arq.SearchString":
                moreInfoString = valor;
                break;*/
            case "arq.Latitud":
                localStorage.itemLat = valor;
                $("#arqLatitud").text(valor);
                break;
            case "arq.Longitud":
                localStorage.itemLng = valor;
                $("#arqLongitud").text(valor);
                break;
            default:
                break;
        }
    }

    $("#moreInfoSearch").attr("href","https://www.google.com.mx/search?q="+moreInfoString);
    $("#moreInfoMap").attr("href","https://www.google.com.mx/maps/search/"+moreInfoString);

    $("#btnRecursoItem").on("tap", function (e) {
        e.preventDefault();
        console.log("Bitstreams de: " + localStorage.itemUUID);
        mostrarRecursosItem(localStorage.itemUUID);
    });
}

function mostrarRecursosItem(uuid) {

    mostrarCargando();
    $("#listaRecursosItem").html("").listview('refresh');

    var handle = "";
    $.ajax( datosAjax(URL + "items/" + uuid) ).done(function (resp) {
        handle = resp.handle;
    });

    $.ajax( datosAjax(URL + "items/" + uuid + "/bitstreams") ).done(function (resp) {
        var linea = "";
        for (var i = 0; i < resp.length; i++) {
            linea = linea + 
                    "<li data-icon='false' style='width: 80%;'><a href='" +
                    BITSTREAM_VIEWER + handle + "/" + resp[i].name +"?sequence="+resp[i].sequenceId+"&isAllowed=y" + "'>" +
                    resp[i].name +
                    " (" + resp[i].sizeBytes + " bytes)</a>" +
                    "<p style='display: none;'>" + resp[i].mimeType + "</p>" +
                    "</li>" +
                    "<li data-icon='arrow-d' style='width: 20%;'>" +
                    "<a href='" + resp[i].retrieveLink + "'><br/></a>" +
                    "<p style='display: none;'>" + resp[i].mimeType + "</p>" +
                    "</li>";
        }
        $("#listaRecursosItem").html(linea).listview('refresh');

        $("#listaRecursosItem li[data-icon='arrow-d']").on("tap", function (e) {
            var a = $(this).find("a")[0];
            var url = $(a).attr("href");
            url = BITSTREAM_URL + url;
            var browser = cordova.InAppBrowser.open(url, '_system');
            browser.addEventListener('loaderror', function (e) {
                alert(e.message);
            });
        });

        $("#btnRecursoItem").attr("disabled", "");
        $("#listaRecursosItem").show();
        ocultarCargando();
    });
}

function reiniciarDetalleItem() {
    //Reiniciar cada valor de la lista
    $("#arqNombre").html("<i>Sin nombre</i>");
    $("#arqDireccion").html("<i>Sin dirección</i>");
    $("#arqPertenencia").html("<i>Sin pertenencia</i>");
    $("#arqLocalidad").html("<i>Sin localidad</i>");
    $("#arqMunicipio").html("<i>Sin municipio</i>");
    $("#arqEntidad").html("<i>Sin entidad</i>");
    $("#arqJurisdiccion").html("<i>Sin jurisdicción</i>");
    $("#arqCategoriaActual").html("<i>Sin categoría actual</i>");
    $("#arqCategoriaOriginal").html("<i>Sin categoría original</i>");
    $("#arqEpoca").html("<i>Sin época</i>");
    $("#arqAnio").html("<i>Sin año</i>");
    $("#arqUsoActual").html("<i>Sin uso actual</i>");
    $("#arqFundador").html("<i>Sin fundador</i>");
    $("#arqConstructor").html("<i>Sin constructor</i>");
    $("#arqEstadoConservacion").html("<i>Sin estado de conservación</i>");
    $("#arqTipologia").html("<i>Sin tipología</i>");
    $("#arqTipologiaArqui").html("<i>Sin tipología arquitectónica</i>");
    $("#arqMuros").html("<i>Sin muros</i>");
    $("#arqSistemaCubierta").html("<i>Sin sistema de cubierta</i>");
    $("#arqSisEstructNave").html("<i>Sin sistema estructural de la nave</i>");
    $("#arqSisEstructCrucero").html("<i>Sin sistema estructural de crucero</i>");
    $("#arqSisEstructPresbiterio").html("<i>Sin sistema estructural del presbiterio</i>");
    $("#arqSisEstructCoro").html("<i>Sin sistema estructural del coro</i>");
    $("#arqPisos").html("<i>Sin pisos</i>");
    $("#arqAcabados").html("<i>Sin acabados</i>");
    $("#arqMateriales").html("<i>Sin materiales</i>");
    $("#arqGallinasCiegas").html("<i>Sin gallinas ciegas</i>");
    $("#arqBienes").html("<i>Sin bienes</i>");
    $("#arqObservBienes").html("<i>Sin observaciones</i>");
    $("#arqObservGenerales").html("<i>Sin observaciones</i>");
    $("#arqLatitud").html("<i>Sin latitud</i>");
    $("#arqLongitud").html("<i>Sin longitud</i>");

    $("#listaRecursosItem").hide();
    $("#listaRecursosItem").html("").listview('refresh');
    $("#btnRecursoItem").off(); //Importante para no gastar peticiones, quita todos los listeners
    $("#btnRecursoItem").removeAttr("disabled");
}