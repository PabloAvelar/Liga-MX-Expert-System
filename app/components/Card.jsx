import { Download, Info } from 'lucide-react';


export default function Card({ jugadoresRecomendados }) {

    console.log("Jugadores recomendados: ", jugadoresRecomendados);

    if (!jugadoresRecomendados || jugadoresRecomendados.length === 0) {
        return <p className="text-center text-gray-500">No hay jugadores recomendados.</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jugadoresRecomendados.map((jugador, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative">
                        <img
                            src={"/assets/sinfoto.png"}
                            alt={jugador.nombre}
                            className="w-full h-64 object-cover"
                        />
                        <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 m-2 rounded-full text-sm font-bold">
                            {jugador?.valor}
                        </div>
                    </div>
                    <div className="p-4">
                        <h4 className="text-xl font-bold mb-1">{jugador.nombre}</h4>
                        <div className="flex items-center mb-2 text-gray-600">
                            <span>{jugador.edad} años</span>
                            <span className="mx-2">•</span>
                            <span>{jugador.nacionalidad}</span>
                            <span className="mx-2">•</span>
                            <span>{jugador.equipo}</span>
                        </div>
                        <p className="text-gray-700 mb-4">{jugador?.descripcion}</p>
                        <div className="flex justify-between">
                            <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                                <Info size={16} className="mr-1" />
                                <span className="text-sm">Más detalles</span>
                            </button>
                            <button className="flex items-center text-green-600 hover:text-green-800 transition-colors">
                                <Download size={16} className="mr-1" />
                                <span className="text-sm">Ficha técnica</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>)
}

