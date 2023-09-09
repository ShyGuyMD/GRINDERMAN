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