import { useEffect, useState } from 'react';

export default function FloatingEmojis() {
    const [emojis, setEmojis] = useState([]);

    useEffect(() => {
        // Generar un emoji cada 800ms
        const interval = setInterval(() => {
            const id = Math.random().toString(36).substring(2, 9);
            const types = ['❤️', '🗝️', '💙', '🚀', '🔑'];
            const emoji = types[Math.floor(Math.random() * types.length)];
            const left = Math.floor(Math.random() * 100); // Posición horizontal aleatoria
            const duration = Math.random() * 4 + 5; // Duración entre 5 y 9 segundos

            setEmojis(prev => [...prev, { id, emoji, left, duration }]);

            // Limpiar el emoji de la memoria cuando termine su animación
            setTimeout(() => {
                setEmojis(prev => prev.filter(e => e.id !== id));
            }, duration * 1000);
        }, 800); 

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {emojis.map(e => (
                <div
                    key={e.id}
                    className="absolute bottom-0 text-3xl opacity-70"
                    style={{
                        left: `${e.left}%`,
                        animation: `floatUp ${e.duration}s linear forwards`
                    }}
                >
                    {e.emoji}
                </div>
            ))}
            
            {/* Definimos la animación de flotar aquí mismo */}
            <style>{`
                @keyframes floatUp {
                    0% { transform: translateY(10vh) scale(0.5); opacity: 0; }
                    10% { opacity: 0.8; }
                    100% { transform: translateY(-110vh) scale(1.5); opacity: 0; }
                }
            `}</style>
        </div>
    );
}