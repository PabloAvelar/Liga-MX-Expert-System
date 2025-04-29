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
                    formattedAnswer = formattedAnswer.split(' ');
                    formattedAnswer = formattedAnswer[2];

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
            pertenece_a(JUGADOR, cruz_azul).
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