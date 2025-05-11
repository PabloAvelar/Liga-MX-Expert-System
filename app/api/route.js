// ruta: /api
import * as pl from 'tau-prolog';
import { readFile } from 'fs/promises';

import { join } from 'path';

export async function GET() {
    return new Promise(async (resolve) => {
        var answers = []; // Inicializa el array de respuestas

        function getAnswers(session) {
            session.answer({
                success: function(answer) {
                    let formattedAnswer = session.format_answer(answer);

                    answers.push(formattedAnswer);
                    getAnswers(session); // Llamada recursiva
                },
                fail: function() {
                    console.log("No hay más respuestas.");
                    resolve(Response.json({
                        success: true,
                        answers: answers,
                        message: 'Consulta ejecutada correctamente'
                    }));
                },
                limit: function() {
                    console.log("Límite de resolución alcanzado.");
                    resolve(Response.json({
                        success: true,
                        answers: answers,
                        message: 'Límite de resolución alcanzado'
                    }));
                },
                error: function(err) {
                    console.error("Error:", err);
                    resolve(Response.json({
                        success: false,
                        message: 'Error al ejecutar la consulta Prolog',
                        error: err
                    }, { status: 500 }));
                }
            });
        }

        try {
            // Crear una nueva sesión de Prolog
            const session = pl.create();
            

            // Cargar el archivo .pl desde el sistema de archivos
            const filePath = join(process.cwd(), 'app', 'prolog', 'ligamx.pl');
            const program = await readFile(filePath, 'utf-8');
            
            const query = `
            jugador(Jugador, mex, po, Edad),
            pertenece_a(Jugador, Equipo).
            `;

            session.consult(program, {
                success: function() {
                    session.query(query, {
                        success: function(goal) {
                            getAnswers(session);
                        },
                        error: function(err) {
                            resolve(Response.json({
                                success: false,
                                message: 'Error en la consulta',
                                error: err
                            }, { status: 500 }));
                        }
                    });
                },
                error: function(err) {
                    resolve(Response.json({
                        success: false,
                        message: 'Error al cargar el programa',
                        error: err
                    }, { status: 500 }));
                }
            });

        } catch (error) {
            resolve(Response.json({
                success: false,
                message: 'Error al ejecutar la consulta Prolog',
                error: error.message
            }, { status: 500 }));
        }
    });
}


// export async function POST(request) {
//    try {
//     const { query } = await request.json();

//     if (!query) {
//       return new Response(JSON.stringify({ error: 'Falta la consulta Prolog en el cuerpo' }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' }
//       });
//     }

//     const session = pl.create();
//     const show = x => console.log(session.format_answer(x));
    
//     const filePath = join(process.cwd(), 'app', 'prolog', 'ligamx.pl');
//     const program = await readFile(filePath, 'utf-8');

//     session.consult(program, {
//         success: function() {
//             session.query(request, {
//                 success: function(){
//                     session.answer(show);
//                 }
//             })
//         }
//     })
//     } catch (error) {
//         return new Response(JSON.stringify({ error: error.toStrin() }), {
//             status: 500,
//             headers: { 'Content-Type': 'application/json' }
//         });
//   }
// }

export async function POST(request) {
  try {
    const { query } = await request.json();

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Falta la consulta Prolog en el cuerpo' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const session = pl.create();


    // Promisificar consult
    const consultPromise = () =>
      new Promise((resolve, reject) => {
        session.consult('app/prolog/ligamx.pl', {
          success: () => resolve(),
          error: (err) => reject(err),
        });
      });

    const queryPromise = () =>
      new Promise((resolve, reject) => {
        session.query(query, {
          success: () => resolve(),
          error: (err) => reject(err),
        });
      });

    const answersPromise = () =>
      new Promise((resolve) => {
        const results = [];

        const callback = (answer) => {
          if (answer === false) {
            resolve(results);
          } else {
            results.push(session.format_answer(answer));
            session.answer(callback);
          }
        };

        session.answer(callback);
      });

    await consultPromise();
    await queryPromise();
    const results = await answersPromise();

    return new Response(JSON.stringify({ results }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.toString() }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

