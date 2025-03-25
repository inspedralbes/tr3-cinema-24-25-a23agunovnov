'use client';

import { useRouter } from "next/navigation";
import { createContext, useState, useContext, useEffect } from "react";

const PopUpContext = createContext(null);

export function PopUpProvider({ children }) {
    const [selectedSession, setSelectedSession] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedSession, setEditedSession] = useState(null);

    return (
        <PopUpProvider.Provider value={{ selectedSession, setSelectedSession, isEditing, setIsEditing, editedSession, setEditedSession,  }}>
            {children}
        </PopUpProvider.Provider>
    );
}

export function usePopUp() {
    return useContext(PopUpContext);
}