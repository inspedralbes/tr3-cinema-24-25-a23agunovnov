'use cliente'

import { useState } from "react";
import { loginCliente, registerCliente } from "@/app/plugins/communicationManager";

export default function AuthComp({ onClose }) {
    const [name, setName] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    async function handleSubmit(e) {
        e.preventDefault();
        if (isLogin) {
            const datos = {
                "email": email,
                "password": password
            }
            const response = await loginCliente(datos);
            if (response && response.success) {
                console.log("Inicio de sesión exitoso: ", response)
                localStorage.setItem('token', response.token);
                localStorage.setItem('userID', response.user.id);
                localStorage.setItem('name', response.user.name);
                localStorage.setItem('email', response.user.email);
                onClose();
            } else {
                console.log("Ocurrió un problema al iniciar sesión: ", response)
            }
        } else {
            const datos = {
                "name": name,
                "phone": telefono,
                "email": email,
                "password": password
            }
            const response = await registerCliente(datos);
            if (response && response.success) {
                console.log("Registro exitoso: ", response)
                setIsLogin(true);
            } else {
                console.log("Ocurrió un problema al registrarse: ", response)
            }
        }
    }

    return (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
            <div
                className="relative w-full max-w-md bg-red-600 opacity-90 text-white p-8 rounded-lg"
                style={{
                    backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.9) 0, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0.9) 100%)'
                }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-white transition-colors cursor-pointer font-bold"
                >x
                </button>

                <h2 className="text-3xl font-bold mb-8">
                    {isLogin ? 'Iniciar sesión' : 'Registrarse'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-gray-700 text-white px-6 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                            <input
                                type="text"
                                placeholder="Teléfono"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                className="mt-6 w-full bg-gray-700 text-white px-6 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>
                    )}

                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-700 text-white px-6 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-700 text-white px-6 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-4 rounded-md hover:bg-red-700 transition-colors font-medium cursor-pointer"
                    >
                        {isLogin ? 'Iniciar sesión' : 'Registrarse'}
                    </button>

                    <div className="text-center text-gray-400">
                        {isLogin ? (
                            <p>
                                ¿Primera vez en Cinetix?{' '}
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(false)}
                                    className="text-white hover:underline cursor-pointer"
                                >
                                    Regístrate ahora
                                </button>
                            </p>
                        ) : (
                            <p>
                                ¿Ya tienes una cuenta?{' '}
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(true)}
                                    className="text-white hover:underline cursor-pointer"
                                >
                                    Inicia sesión
                                </button>
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};