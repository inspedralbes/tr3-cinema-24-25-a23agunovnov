export default function AuthPage() {
    return (
        <div className="fixed inset-0 bg-black opacity-50 flex items-center justify-center z-50">
            <div
                className="relative w-full max-w-md bg-black opacity-50 text-white p-8 rounded-lg"
            >
                <button
                    // onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                </button>

                <h2 className="text-3xl font-bold mb-8">
                    {/* {isLogin ? 'Iniciar sesión' : 'Registrarse'} */}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-gray-700 text-white px-6 py-4 pl-12 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>
                    )}

                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-700 text-white px-6 py-4 pl-12 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-700 text-white px-6 py-4 pl-12 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-4 rounded-md hover:bg-red-700 transition-colors font-medium"
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
                                    className="text-white hover:underline"
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
                                    className="text-white hover:underline"
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