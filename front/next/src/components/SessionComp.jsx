'use client'

import { useState, useEffect } from "react";
import { Clock, Calendar, Users, Trash2, Edit2, X, DollarSign, Touchpad as Couch } from 'lucide-react';

export default function InfoSession(props) {

    const handleClosePopup = () => {
        setSelectedSession(null);
        setEditedSession(null);
        setIsEditing(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                {/* Popup header */}
                <div className="flex justify-between items-center border-b p-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {props.Title}
                    </h2>
                    <button
                        onClick={handleClosePopup}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Popup content */}
                <div className="p-6 space-y-4">
                    {/* Movie details grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Clock className="text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Duración</p>
                                    <p className="font-medium">{props.runtime} minutos</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Users className="text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Sala</p>
                                    <p className="font-medium">10A</p>
                                </div>
                            </div>

                            {isEditing ? (
                                <>
                                    <div className="space-y-1">
                                        <label className="text-sm text-gray-500">Horario</label>
                                        <input
                                            type="time"
                                            value={editedSession?.time}
                                            onChange={(e) => setEditedSession(prev => prev ? { ...prev, time: e.target.value } : null)}
                                            className="block w-full border rounded-md px-3 py-2"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm text-gray-500">Fecha</label>
                                        <input
                                            type="date"
                                            value={editedSession?.date}
                                            onChange={(e) => setEditedSession(prev => prev ? { ...prev, date: e.target.value } : null)}
                                            className="block w-full border rounded-md px-3 py-2"
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center space-x-2">
                                        <Clock className="text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Horario</p>
                                            <p className="font-medium">{props.time}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Fecha</p>
                                            <p className="font-medium">{props.date}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Couch className="text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Asientos vendidos</p>
                                    {/* <p className="font-medium">{selectedSession.soldSeats} de {selectedSession.totalSeats}</p> */}
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Couch className="text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Asientos disponibles</p>
                                    {/* <p className="font-medium">{selectedSession.totalSeats - selectedSession.soldSeats}</p> */}
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <DollarSign className="text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Recaudación total</p>
                                    {/* <p className="font-medium">{calculateRevenue(selectedSession).toFixed(2)}€</p> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Guardar cambios
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleDelete}
                                    className="flex items-center px-4 py-2 text-red-600 hover:text-red-700"
                                >
                                    <Trash2 className="h-5 w-5 mr-1" />
                                    Eliminar sesión
                                </button>
                                <button
                                    onClick={handleEdit}
                                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    <Edit2 className="h-5 w-5 mr-1" />
                                    Editar sesión
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}