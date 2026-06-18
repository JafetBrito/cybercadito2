import { useState, useEffect } from 'react';
import { getCart, removeFromCart, clearCart } from '../../store/cartStore.js';

export default function CartDrawer() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    // Sincronizar con el LocalStorage y escuchar cambios
    useEffect(() => {
        setCartItems(getCart());
        const handleUpdate = () => setCartItems(getCart());
        window.addEventListener('cart-updated', handleUpdate);
        return () => window.removeEventListener('cart-updated', handleUpdate);
    }, []);

    const total = cartItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    const enviarPedidoWa = () => {
        let mensaje = `👋 ¡Hola Cybercadito! Quiero procesar el siguiente pedido:\n\n`;
        cartItems.forEach(item => {
            mensaje += `▪️ ${item.cantidad}x ${item.titulo} - $${(item.precio * item.cantidad).toFixed(2)}\n`;
        });
        mensaje += `\n*Total a pagar: $${total.toFixed(2)}*`;
        
        const url = `https://wa.me/527775945351?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
        clearCart();
        setIsOpen(false);
    };

    return (
        <>
            {/* Botón en el Header para abrir el carrito */}
            <button 
                onClick={() => setIsOpen(true)}
                className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800 transition"
                aria-label="Abrir carrito"
            >
                <span className="text-xl">🛒</span>
                {cartItems.length > 0 && (
                    <span className="absolute top-0 right-0 bg-sky-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform translate-x-1 -translate-y-1 border-2 border-white dark:border-slate-900">
                        {cartItems.reduce((acc, i) => acc + i.cantidad, 0)}
                    </span>
                )}
            </button>

            {/* Overlay oscuro para el fondo */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Panel lateral derecho */}
            <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-slate-900 shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                
                {/* Header del Drawer */}
                <div className="p-6 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white">Tu Pedido</h2>
                    <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-2xl font-bold">✕</button>
                </div>

                {/* Lista de Productos */}
                <div className="flex-grow overflow-y-auto p-6 space-y-6">
                    {cartItems.length === 0 ? (
                        <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                            <span className="text-5xl block mb-4">📭</span>
                            Tu carrito está vacío.
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="flex items-center gap-4 bg-gray-50 dark:bg-slate-800/50 p-3 rounded-xl border border-gray-100 dark:border-slate-700">
                                <img src={item.imagen} alt={item.titulo} className="w-16 h-16 object-cover rounded-lg" />
                                <div className="flex-grow">
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1">{item.titulo}</h4>
                                    <p className="text-sky-500 font-black text-sm">${item.precio.toFixed(2)} x {item.cantidad}</p>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-600 p-2 text-xl" title="Eliminar">🗑️</button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer del Drawer / Checkout */}
                {cartItems.length > 0 && (
                    <div className="p-6 border-t border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-gray-600 dark:text-gray-400 font-medium">Total Estimado</span>
                            <span className="text-3xl font-black text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                        </div>
                        <button 
                            onClick={enviarPedidoWa}
                            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 rounded-xl shadow-lg shadow-green-500/30 flex justify-center items-center gap-2 text-lg transition-transform hover:-translate-y-1"
                        >
                            💬 Pagar Múltiples Items
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}