'use client';

import { useEffect, useState } from 'react';
import { ChevronRight, User, UserPlus, Shield, ShieldCheck, Goal, Star, ArrowLeft, Download, Info } from 'lucide-react';

export default function RecomendadorJugadores() {
  // Estado para controlar la pregunta actual
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Estado para controlar si estamos en la página de resultados
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const peticionJugadores = async (consulta) => {
    // probando con un get
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: consulta
        })
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener los jugadores:", error);
      return [];
    }
  }

  const getJugadores = async () => {
    const res = await peticionJugadores();
    const data = res.answers;

    // mapeando cada string de respuestas
    const jugadores = data.map((jugadorStr) => {
      const propiedades = jugadorStr.split(', ');  // se obtienen las variables
      const jugador = {}

      // Pasando por cada propiedad del jugador
      propiedades.forEach((prop) => {
        const [clave, valor] = prop.split(' = ');

        switch (clave) {
          case 'Jugador':
            jugador.nombre = valor;
            break;

          case 'Equipo':
            jugador.equipo = valor;
            break;

          case 'Edad':
            jugador.edad = valor;
            break;
        }
      })

      return jugador;
    });

    console.log(jugadores);

  }

  // Lista de preguntas y sus respectivas opciones
  const questions = [
    { // Pregunta 0
      pregunta: "¿Qué equipo quieres reforzar?",
      opciones: [
        { texto: "América", icono: <Goal size={24} />, valor: "america" },
        { texto: "Atlas", icono: <Goal size={24} />, valor: "atlas" },
        { texto: "Atlético de San Luis", icono: <Goal size={24} />, valor: "atletico" },
        { texto: "Cruz Azul", icono: <UserPlus size={24} />, valor: "cruz_azul" },
        { texto: "FC Juárez", icono: <User size={24} />, valor: "fc_juarez" },
        { texto: "Guadalajara", icono: <Goal size={24} />, valor: "guadalajara" },
        { texto: "León", icono: <Goal size={24} />, valor: "leon" },
        { texto: "Mazatlán FC", icono: <Goal size={24} />, valor: "mazatlan_fc" },
        { texto: "Monterrey", icono: <Goal size={24} />, valor: "monterrey" },
        { texto: "Necaxa", icono: <Goal size={24} />, valor: "necaxa" },
        { texto: "Pachuca", icono: <Goal size={24} />, valor: "pachuca" },
        { texto: "Puebla", icono: <Goal size={24} />, valor: "puebla" },
        { texto: "UNAM", icono: <Goal size={24} />, valor: "unam" },
        { texto: "Querétaro", icono: <Goal size={24} />, valor: "queretaro" },
        { texto: "Santos", icono: <Goal size={24} />, valor: "santos" },
        { texto: "UANL", icono: <Goal size={24} />, valor: "uanl" },
        { texto: "Tijuana", icono: <Goal size={24} />, valor: "tijuana" },
        { texto: "Toluca", icono: <Goal size={24} />, valor: "toluca" },
      ]
    },

    { // Pregunta 1
      pregunta: "¿Cuál es el estilo de juego predominante del equipo?",
      opciones: [
        { texto: "Posesión y control del balón", icono: <Goal size={24} />, valor: "posesion" },
        { texto: "Contraataque rápido", icono: <UserPlus size={24} />, valor: "contraataque" },
        { texto: "Juego defensivo y sólido", icono: <UserPlus size={24} />, valor: "defensa_solida" },
        { texto: "Creador de juego", icono: <UserPlus size={24} />, valor: "creacion_central" },
        { texto: "Pivote defensivo", icono: <UserPlus size={24} />, valor: "pivote_defensivo" },
      ]
    },

    { // Pregunta 2
      pregunta: "¿Qué habilidad técnicas valoras más en el jugador?",
      opciones: [
        { texto: "Precisión en el pase", icono: <Goal size={24} />, valor: "goleador_eficiente" },
        { texto: "Visión y asistencia", icono: <UserPlus size={24} />, valor: "asistente_creativo" },
        { texto: "Conducción efectiva", icono: <User size={24} />, valor: "progresor_balon" },
        { texto: "Salida limpia desde atrás", icono: <ShieldCheck size={24} />, valor: "constructor_juego" },
        { texto: "Desmarque inteligente", icono: <ShieldCheck size={24} />, valor: "receptor_clave" },
      ]
    },
    {// Pregunta 3
      pregunta: "¿Qué nivel de rendimiento esperas en goles o asistencias por partido?",
      opciones: [
        { texto: "Gran capacidad goleadora", icono: <User size={24} />, valor: "goles_altos" },
        { texto: "Goleador promedio", icono: <User size={24} />, valor: "eficiencia_goleadora" },
        { texto: "Alta producción de asistencias", icono: <User size={24} />, valor: "asistencias_altas" },
        { texto: "Asistente promedio", icono: <User size={24} />, valor: "eficiencia_asistente" }
      ]
    },

    {// Pregunta 4
      pregunta: "¿Qué tan importante es para ti la discipina del jugador en la cancha?",
      opciones: [
        { texto: "Muy importante", icono: <User size={24} />, valor: "disciplina_excepcional" },
        { texto: "Importante", icono: <User size={24} />, valor: "disciplina_buena" },
        { texto: "Moderado", icono: <User size={24} />, valor: "disciplina_moderada" },
        { texto: "No muy importante", icono: <User size={24} />, valor: "disciplina_baja" }
      ]
    },
    { // Pregunta 5
      pregunta: "¿Consideras que el jugador debe ser titular en su actual equipo?",
      opciones: [
        { texto: "Sí", icono: <User size={24} />, valor: "si_titular" },
        { texto: "No", icono: <User size={24} />, valor: "no_titular" },
      ]
    },
    { // Pregunta 6
      pregunta: "¿Qué perfil de jugador requiere tu equipo?",
      opciones: [
        { texto: "Perfil ofensivo", icono: <User size={24} />, valor: "perfil_ofensivo" },
        { texto: "Perfil defensivo", icono: <User size={24} />, valor: "perfil_defensivo" },
        { texto: "Perfil balanceado", icono: <User size={24} />, valor: "perfil_balanceado" },
      ]
    },
    { // Pregunta 7
      pregunta: "¿Quieres sólo jugadores con alto potencial pero que aún no explotan todo su rendimiento (joven promesa)?",
      opciones: [
        { texto: "Sí", icono: <User size={24} />, valor: "si_joven_promesa" },
        { texto: "No", icono: <User size={24} />, valor: "no_joven_promesa" }
      ]
    },
  ];

  // Base de datos simulada de jugadores recomendados
  const jugadoresRecomendados = {
    "delantero": [
      {
        nombre: "Carlos Vela",
        imagen: "/api/placeholder/300/300",
        edad: 25,
        nacionalidad: "México",
        equipo: "LAFC",
        valor: "12M USD",
        descripcion: "Delantero veloz con excelente definición y regate. Especialista en tiros libres y disparos desde fuera del área."
      },
      {
        nombre: "Raúl Jiménez",
        imagen: "/api/placeholder/300/300",
        edad: 29,
        nacionalidad: "México",
        equipo: "Fulham",
        valor: "18M USD",
        descripcion: "Delantero potente con gran juego aéreo. Excelente pivote y capacidad para asociarse con los mediocampistas."
      },
      {
        nombre: "Santiago Giménez",
        imagen: "/api/placeholder/300/300",
        edad: 21,
        nacionalidad: "México",
        equipo: "Feyenoord",
        valor: "8M USD",
        descripcion: "Joven promesa con gran capacidad goleadora. Rápido y con buen posicionamiento en el área."
      }
    ],
    "medio-ofensivo": [
      {
        nombre: "Diego Lainez",
        imagen: "/api/placeholder/300/300",
        edad: 22,
        nacionalidad: "México",
        equipo: "Tigres",
        valor: "7M USD",
        descripcion: "Mediocampista habilidoso con gran capacidad de desborde y visión de juego. Especialista en el último pase."
      },
      {
        nombre: "Orbelín Pineda",
        imagen: "/api/placeholder/300/300",
        edad: 26,
        nacionalidad: "México",
        equipo: "AEK Atenas",
        valor: "9M USD",
        descripcion: "Mediocampista versátil con llegada al área y buen disparo de media distancia. Trabajador en ambas fases del juego."
      }
    ]
  };

  // Datos para otras posiciones podrían agregarse de manera similar

  // Estado para almacenar las respuestas del usuario
  const [respuestas, setRespuestas] = useState({});

  // Función para manejar la selección de una opción
  const handleSeleccion = (valor) => {
    // Guardar la respuesta actual
    const nuevasRespuestas = {
      ...respuestas,
      [currentQuestion]: valor
    };
    setRespuestas(nuevasRespuestas);

    // Avanzar a la siguiente pregunta o mostrar resultado
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Mostrar la página de resultados


      setMostrarResultados(true);

      obtenerJugadoresRecomendados();
    }
  };

  // Función para reiniciar el cuestionario
  const handleReiniciar = () => {
    setCurrentQuestion(0);
    setRespuestas({});
    setMostrarResultados(false);
  };

  // Obtener jugadores recomendados basados en las respuestas
  const obtenerJugadoresRecomendados = async () => {

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    console.log("Respuestas finales:", respuestas);
    let consulta = `recomendar_jugador(Jugador, ${respuestas[0]}, ${respuestas[1]}, ${respuestas[2]}, ${respuestas[3]}, ${respuestas[4]}, ${respuestas[5]}, ${respuestas[6]}, ${respuestas[7]}, Equipo, Posicion, Edad, Nacionalidad).`;
    console.log("Consulta Prolog:", consulta);

    const res = await peticionJugadores(consulta);
    
    const unique = res.results.filter(onlyUnique);
    console.info(unique)
    console.log("Respuesta Prolog:", unique);

    // Obtener la posición seleccionada (respuesta a la primera pregunta)
    const posicion = respuestas[0];

    // En una implementación real, filtrarías por edad y presupuesto también
    //return jugadoresRecomendados[posicion] || [];



    // return 
  };

  // Obtener la pregunta actual
  const preguntaActual = questions[currentQuestion];

  // Función para traducir el valor de la respuesta a texto legible
  const traducirRespuesta = (indice, valor) => {
    const opcion = questions[indice]?.opciones.find(opt => opt.valor === valor);
    return opcion ? opcion.texto : valor;
  };

  // Logo de Liga MX
  const LogoLigaMX = () => (
    <div className="w-16">
      <svg viewBox="0 0 100 50" className="w-full">
        <g>
          <path d="M50,5 L70,25 L50,45 L30,25 Z" fill="#E2231A" />
          <path d="M20,5 L40,25 L20,45 L0,25 Z" fill="#7D7F82" />
          <path d="M80,5 L100,25 L80,45 L60,25 Z" fill="#7D7F82" />
          <path d="M50,10 L60,25 L50,40 L40,25 Z" fill="#62C06F" />
        </g>
      </svg>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header con logo y título */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Recomendador de jugadores</h1>
        <LogoLigaMX />
      </header>

      {/* Contenido principal */}
      <main className="flex-1 container mx-auto p-4 md:p-8">
        {!mostrarResultados ? (
          <>
            {/* Indicador de progreso */}
            <div className="mb-6">
              <div className="h-2 bg-gray-200 rounded-full mb-2">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
              <div className="text-sm text-gray-600 text-right">
                Paso {currentQuestion + 1} de {questions.length}
              </div>
            </div>

            {/* Pregunta actual */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transform transition-all duration-500">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                {preguntaActual.pregunta}
              </h2>

              {/* Opciones de respuesta */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {preguntaActual.opciones.map((opcion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSeleccion(opcion.valor)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg p-4 flex items-center justify-between transition-all duration-300 hover:shadow-md hover:scale-105 group"
                  >
                    <div className="flex items-center">
                      <div className="mr-3 text-green-600">
                        {opcion.icono}
                      </div>
                      <span className="font-medium">{opcion.texto}</span>
                    </div>
                    <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-green-600" size={20} />
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Página de resultados */}
            <div className="mb-8">
              <button
                onClick={handleReiniciar}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ArrowLeft size={18} className="mr-1" />
                <span>Volver al inicio</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                Resultados finales
              </h2>

              {/* Resumen de las selecciones */}
              <div className="bg-gray-100 rounded-lg p-4 mb-8">
                <h3 className="text-lg font-semibold mb-3 text-gray-700">Tus selecciones:</h3>
                <ul className="space-y-2">
                  {Object.keys(respuestas).map((key) => (
                    <li key={key} className="flex items-center text-gray-700">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-3 text-xs font-bold">
                        {parseInt(key) + 1}
                      </div>
                      <span className="font-medium">{questions[key].pregunta}</span>
                      <span className="mx-2">→</span>
                      <span>{traducirRespuesta(parseInt(key), respuestas[key])}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Jugadores recomendados */}
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Jugadores recomendados</h3>

            </div>

            {/* Explicación de la elección */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Explicación de la elección de los jugadores
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p>Los jugadores recomendados han sido seleccionados considerando los siguientes criterios basados en tus preferencias:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li><strong>Posición:</strong> Se han filtrado jugadores que se desempeñan principalmente como {traducirRespuesta(0, respuestas[0])}.</li>
                  <li><strong>Rango de edad:</strong> Priorizamos jugadores que se encuentran en el rango de {traducirRespuesta(1, respuestas[1])}.</li>
                  <li><strong>Presupuesto:</strong> Los jugadores recomendados se ajustan a un presupuesto {traducirRespuesta(2, respuestas[2])}.</li>
                  <li><strong>Rendimiento reciente:</strong> Se han considerado estadísticas de las últimas temporadas para evaluar su consistencia y proyección.</li>
                  <li><strong>Adaptabilidad:</strong> Se ha valorado su capacidad para adaptarse a la Liga MX y al fútbol mexicano.</li>
                </ul>
                <p className="mt-4">Esta selección se ha realizado analizando datos estadísticos de diversas ligas internacionales y el mercado actual de traspasos.</p>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 text-sm">
        © {new Date().getFullYear()} Liga MX Recomendador de Jugadores
      </footer>
    </div>
  );
}