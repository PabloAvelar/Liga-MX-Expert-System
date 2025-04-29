// ruta: /api
import * as pl from 'tau-prolog';

export async function GET() {
    const gay = function (answerObject){
        console.log("objeto en funcion recursiva: ", answerObject);

        answerObject({  // answerObject = session.answer
            success: function (answer) {
                console.log(session.format_answer(answer)); // X = salad ;
            },
            fail: function () { console.log("YA NO HAY MAS COSAS"); },
        });

        return;

        // criterio de paro
        if(!answerObject || answerObject === undefined ){
            console.log("aqui para el answerObject", answerObject);
            return;
        }

        //recursividad
        return gay(answerObject({  // answerObject = session.answer
            success: function (answer) {
                console.log(session.format_answer(answer)); // X = salad ;
            },
            fail: function () { console.log("YA NO HAY MAS COSAS"); },
        }));
    }

    try {
        // Crear una nueva sesión de Prolog
        const session = pl.create();

        // Cargar algún programa Prolog de ejemplo
        const program = `
            padre(juan, pedro).
            padre(pedro, carlos).
            padre(pedro, maria).
            abuelo(X, Y) :- padre(X, Z), padre(Z, Y).
        `;
        let answers = [];
        const query = "abuelo(juan, X).";

        // Verificar si el programa se carga correctamente
        session.consult(program, {
            success: function () {
                // Realizar una consulta

                session.query(query, {
                    success: function (goal) {
                        // Answers
                        //Ejecutar funcion recursiva

                        // console.log("objeto session", session.answers);
                        gay(session.answers);
                    },
                    error: function (err) { /* Error parsing goal */ }
                });
            },
            error: function (err) {
                throw new Error("Error al cargar el programa: " + err);
            }
        });

        // retornando la respuesta
        return Response.json({
            success: true,
            query: query,
            answers: answers,
            message: 'Consulta ejecutada correctamente'
        });

    } catch (error) {
        return Response.json({
            success: false,
            message: 'Error al ejecutar la consulta Prolog',
            error: error.message
        }, { status: 500 });
    }
}

// Función auxiliar para formatear la respuesta
function formatAnswer(answer) {
    if (!answer || answer.id === "fail") {
        return { success: false, message: "La consulta falló" };
    }

    // Extraer las variables de la respuesta
    const vars = {};
    const substitution = answer.links?.substitution;

    if (substitution) {
        for (const key in substitution.links) {
            vars[key] = substitution.links[key].toString();
        }
    }

    return {
        success: true,
        variables: vars,
        proof: answer.toString()
    };
}