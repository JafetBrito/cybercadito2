import { useState } from 'react';

export default function ProductTabs({ descripcion, caracteristicas }) {
    const [activeTab, setActiveTab] = useState('descripcion');

    return (
        <div className="mt-12 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
            {/* Cabecera de las Pestañas */}
            <div className="flex border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
                <button
                    onClick={() => setActiveTab('descripcion')}
                    className={`flex-1 sm:flex-none py-4 px-8 font-bold text-sm sm:text-base transition-colors ${
                        activeTab === 'descripcion' 
                        ? 'border-b-2 border-sky-500 text-sky-500 bg-white dark:bg-slate-800' 
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                    📝 Descripción
                </button>
                <button
                    onClick={() => setActiveTab('activacion')}
                    className={`flex-1 sm:flex-none py-4 px-8 font-bold text-sm sm:text-base transition-colors ${
                        activeTab === 'activacion' 
                        ? 'border-b-2 border-sky-500 text-sky-500 bg-white dark:bg-slate-800' 
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                    ⚙️ Cómo Activar
                </button>
            </div>

            {/* Contenido de las Pestañas */}
            <div className="p-6 sm:p-8 text-gray-600 dark:text-gray-300">
                {activeTab === 'descripcion' ? (
                    <div className="prose dark:prose-invert max-w-none">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Acerca de este producto</h3>
                        <p className="leading-relaxed">{descripcion}</p>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Detalles y Requisitos</h3>
                        <ul className="space-y-4">
                            {caracteristicas.map((c, i) => (
                                <li key={i} className="flex items-start bg-gray-50 dark:bg-slate-900/50 p-4 rounded-xl border border-gray-100 dark:border-slate-700">
                                    <svg className="w-6 h-6 text-sky-500 mr-3 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span className="font-medium text-gray-700 dark:text-gray-200">{c}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}