import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../api/firebase";

interface Props {
    children: React.ReactNode;
}

export default function ProtectedRoute({
    children
}: Props) {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        const unsubscribe =
            onAuthStateChanged(auth, (currentUser) => {

                setUser(currentUser);
                setLoading(false);

            });

        return unsubscribe;

    }, []);

    if (loading) {

        return <p>Checking login...</p>;

    }

    if (!user) {

        return <Navigate to="/staff" replace />;

    }

    return <>{children}</>;

}