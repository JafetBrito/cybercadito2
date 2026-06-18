// Funciones puras para manejar el carrito
export const getCart = () => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem('cyber_cart') || '[]');
};

export const addToCart = (producto) => {
    const cart = getCart();
    const existe = cart.find(item => item.id === producto.id);
    
    if (existe) {
        existe.cantidad += 1;
    } else {
        cart.push({ ...producto, cantidad: 1 });
    }
    
    localStorage.setItem('cyber_cart', JSON.stringify(cart));
    // Disparamos un evento global para que React se entere del cambio
    window.dispatchEvent(new Event('cart-updated'));
};

export const removeFromCart = (id) => {
    const cart = getCart().filter(item => item.id !== id);
    localStorage.setItem('cyber_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
};

export const clearCart = () => {
    localStorage.removeItem('cyber_cart');
    window.dispatchEvent(new Event('cart-updated'));
};