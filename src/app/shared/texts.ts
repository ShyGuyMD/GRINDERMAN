export const BOOK_IMPORT_INSTRUCTIONS = {
    'Cómo cargar tu Catálogo de Libros en la Web': [
      'Selecciona el archivo de tu lista de libros desde tu computadora. Asegúrate de que esté en formato .xlsx.',
      'Una vez hayas cargado tu archivo, aparecerán en pantalla una serie de listas desplegables.',
      'Elige qué columna de tu archivo corresponde a cada una de estos datos.',
      'Revista todo una última vez para estar seguro de que todo está correcto.',
      'Cuando estés seguro, dale clic a "Confirmar".'
    ],
    'Cómo Funciona la Carga': [
      'En esta página, podrás cargar tu catálogo de libros subiendo una planilla rellenada con los datos de los libros que quieres añadir.',
      'En caso de que desees actualizar libros existentes, asegúrate de incluir el campo ID. Esto permitirá que el sistema identifique los libros existentes y actualice la información en caso de que haya cambios en esos libros.',
      'El sistema añadirá automáticamente los libros que no tengan ID como nuevos registros en tu catálogo sin afectar a los existentes.',
      'Asegúrate de revisar bien antes de confirmar para no perder información importante o tener duplicados en tu lista de libros.',
      'Cuando estés seguro, haz clic en "Confirmar" para cargar tu catálogo.'
    ],
    'Preparación del Archivo de Catálogo': [
      'Necesitarás una planilla en formato .xlsx con los detalles de tus libros.',
      'La primera fila debe identificar los datos de cada columna, como título, autor, precio, etc.',
      'Cada fila siguiente representa un libro individual, así que coloca la información correspondiente en cada celda.',
      'Si ya tienes un catálogo anterior, puedes exportarlo desde la sección de exportación. Luego, descarga el archivo .xlsx resultante, edítalo para actualizar o agregar información de tus libros y, finalmente, vuelve a importarlo siguiendo las instrucciones anteriores.'
    ]
  };
  export const BOOK_IMPORT_INSTRUCTIONS_ORDER = {
    'Cómo cargar tu Catálogo de Libros en la Web': true,
    'Cómo Funciona la Carga': false,
    'Preparación del Archivo de Catálogo': true
  };

  export const BOOK_EXPORT_INSTRUCTIONS = {
    'Instrucciones de Uso General': [
        'Filtrar Datos: Utiliza las opciones de filtro en la parte superior de las columnas para filtrar los datos según tus criterios. Puedes filtrar por texto, números o fechas.',
        'Ordenar Datos: Haz clic en el encabezado de una columna para ordenar los datos de forma ascendente o descendente. Puedes realizar ordenamientos múltiples manteniendo presionada la tecla "Shift" mientras haces clic en las columnas adicionales.',
        'Reiniciar Filtros y Ordenamientos: Puedes reiniciar todos los filtros y ordenamientos haciendo clic en un botón de "Limpiar Filtros".',
        'Exportar Datos: Puedes exportar los datos a un archivo Excel utilizando las opciones de exportación proporcionadas.'
    ]
};

export const BOOK_EXPORT_INSTRUCTIONS_ORDER = {
    'Instrucciones de Uso General': false
};
export const PRICE_UPDATE_INSTRUCTIONS = {
  'Aplicar Ajuste de Precio': [
      'Filtra tus Libros: Utiliza los filtros disponibles para seleccionar los libros a los que deseas aplicar un ajuste de precio porcentual.',
      'Ingresa el Porcentaje: En el campo de entrada de porcentaje, escribe el valor del ajuste de precio que deseas aplicar.',
      'Actualización Automática: Los precios de los libros afectados por el ajuste se actualizarán automáticamente en la tabla, mostrando los nuevos precios con el ajuste aplicado.',
      'Guarda los Cambios: Si estás satisfecho con los cambios, puedes guardar el ajuste de precio haciendo clic en un botón de "Guardar Cambios".'
  ]
};

export const PRICE_UPDATE_INSTRUCTIONS_ORDER = {
  'Aplicar Ajuste de Precio': true,
};

export const ORDER_REPORT_INSTRUCTIONS = {
  'Instrucciones de Uso General': [
      'Placeholder',
  ]
};

export const ORDER_REPORT_INSTRUCTIONS_ORDER = {
  'Instrucciones de Uso General': true,
};
