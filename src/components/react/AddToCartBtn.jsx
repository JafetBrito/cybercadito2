import { addToCart } from '../../store/cartStore.js';
import { useState } from 'react';

export default function AddToCartBtn({ producto }) {
    const [agregado, setAgregado] = useState(false);

    const handleAñadir = () => {
        addToCart(producto);
        setAgregado(true);
        setTimeout(() => setAgregado(false), 2000); // Reset visual después de 2 seg
    };

    return (
        <button 
            onClick={handleAñadir}
            disabled={agregado}
            className={`w-full font-black text-lg py-4 px-6 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-3 mb-6 ${
                agregado 
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-none' 
                : 'bg-sky-500 hover:bg-sky-600 text-white shadow-sky-500/30 hover:-translate-y-1'
            }`}
        >
            {agregado ? '✅ ¡Añadido al Carrito!' : '🛒 Añadir al Pedido'}
        </button>
    );
}