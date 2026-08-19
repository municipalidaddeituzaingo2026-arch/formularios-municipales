function generarPDF() {

    // Comprobar que jsPDF esté disponible
    if (!window.jspdf) {
        alert(
            "El generador de PDF no pudo cargarse. " +
            "Como alternativa, se abrirá la ventana de impresión para que puedas elegir " +
            "\"Guardar como PDF\"."
        );
        window.print();
        return;
    }


    const { jsPDF } = window.jspdf;


    // ===============================
    // OBTENER DATOS
    // ===============================

    const fecha = document.getElementById("fecha").value;
    const denominacion = document.getElementById("denominacion").value;
    const rubro = document.getElementById("rubro").value;
    const anexo = document.getElementById("anexo").value;
    const direccion = document.getElementById("direccion").value;
    const expediente = document.getElementById("expediente").value;
    const registro = document.getElementById("registro").value;
    const habilitado = document.getElementById("habilitado").value;
    const baja = document.getElementById("baja").value;
    const propietario = document.getElementById("propietario").value;
    const dni = document.getElementById("dni").value;
    const telefono = document.getElementById("telefono").value;


    // ===============================
    // CONVERTIR FECHAS
    // ===============================

    function fechaArgentina(valor) {

        if (!valor) {
            return "";
        }

        const partes = valor.split("-");

        return partes[2] + "/" +
               partes[1] + "/" +
               partes[0];
    }


    // ===============================
    // CREAR PDF A4
    // ===============================

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });


    pdf.setFont("times", "normal");
    pdf.setFontSize(12);


    const margen = 20;
    const ancho = 170;

    let y = 25;


     // ===============================
    // FECHA - ARRIBA A LA DERECHA
    // ===============================

    const textoFecha = "Ituzaingó, Ctes. " + fechaArgentina(fecha);

pdf.text(
    textoFecha,
    190,
    y,
    { align: "right" }
);


    // ===============================
    // ENCABEZADO
    // ===============================

    pdf.text("SEÑOR", margen, y);
    y += 6;

    pdf.text("INTENDENTE MUNICIPAL", margen, y);
    y += 6;

    pdf.text("SR. EMILIO NICOLAS", margen, y);
    y += 6;

    pdf.text("S…………………………/……………………D", margen, y);
    y += 6;

    // ===============================
    // TEXTO PRINCIPAL
    // ===============================

    y += 15;

    const introduccion =
        "Me dirijo a usted, con el fin de solicitar la BAJA " +
        "COMERCIAL del comercio de mi propiedad cuyos datos " +
        "son los siguientes:";

    const lineasIntro =
        pdf.splitTextToSize(
            introduccion,
            ancho
        );

    pdf.text(
        lineasIntro,
        margen,
        y
    );

    y += 15;


    // ===============================
    // DATOS
    // ===============================

    const datos = [

        "Denominación del Comercio: " +
        denominacion,

        "Rubro Principal: " +
        rubro,

        "Anexo: " +
        anexo,

        "Dirección Comercial: " +
        direccion,

        "Expte. De Habilitación Comercial: " +
        expediente,

        "N° de Inscripción del Registro de Comercio: " +
        registro,

        "Habilitado el: " +
        fechaArgentina(habilitado),

        "Baja comercial a partir del: " +
        fechaArgentina(baja)
    ];


    datos.forEach(function(dato) {

        const lineas =
            pdf.splitTextToSize(
                "• " + dato,
                ancho
            );

        pdf.text(
            lineas,
            margen,
            y
        );

        y += 7;

        if (lineas.length > 1) {
            y += 5;
        }
    });


    // ===============================
    // DOCUMENTACIÓN
    // ===============================

    y += 7;

    pdf.text(
        "Adjunto las siguientes documentaciones:",
        margen,
        y
    );

    y += 8;

    pdf.text(
        "a) Cartilla y/o Resolución Municipal Habilitación Original.",
        margen,
        y
    );

    y += 8;

    pdf.text(
        "b) Cartilla de Rehabilitación Comercial Original",
        margen,
        y
    );

    y += 8;

    pdf.text(
        "c) Certificados Libre Deuda Municipal.",
        margen,
        y
    );


    // ===============================
    // DESPEDIDA
    // ===============================

    y += 15;

    pdf.text(
        "Sin otro particular, lo saludo atentamente.",
        margen,
        y
    );


    // ===============================
    // FIRMA
    // ===============================

    y += 25;

    pdf.text(
        "………………………………………………………………………",
        margen,
        y
    );

    y += 7;

    pdf.text(
        "Firma del Propietario.",
        margen,
        y
    );

    y += 10;

    pdf.text(
        "Aclaración: " + propietario,
        margen,
        y
    );

    y += 8;

    pdf.text(
        "D.N.I. N°: " + dni,
        margen,
        y
    );

    y += 8;

    pdf.text(
        "Teléfono: " + telefono,
        margen,
        y
    );


    // ===============================
    // DESCARGAR
    // ===============================

    let nombre =
        denominacion.trim();

    if (nombre === "") {
        nombre = "Comercio";
    }

    nombre = nombre.replace(
        /[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]/g,
        ""
    );

    nombre = nombre.replace(
        /\s+/g,
        "_"
    );


    const nombreArchivo =
        "Baja_Comercial_" +
        nombre +
        ".pdf";

    // ===============================
    // DESCARGAR PDF
    // ===============================

    pdf.save(nombreArchivo);
}

