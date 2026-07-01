import { useEffect, useMemo, useRef, useState } from "react";
import {
    collection,
    doc,
    onSnapshot,
    runTransaction
} from "firebase/firestore";
import { resolveStaffCall } from "../api/client";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { db, auth } from "../api/firebase";
import { StaffOrder, StaffCall } from "../types";

import DashboardHeader from "../components/staff/DashboardHeader";
import DashboardStats from "../components/staff/DashboardStats";
import TableGroup from "../components/staff/TableGroup";


export default function StaffDashboard() {
    const previousCount = useRef(0);
    const navigate = useNavigate();
    const [tab,setTab]=useState<"active"|"history">("active");
    const [orders, setOrders] = useState<StaffOrder[]>([]);
    const [staffCalls, setStaffCalls] = useState<StaffCall[]>([]);

    useEffect(() => {

        const unsubscribe = onSnapshot(

            collection(db, "orders"),

            snapshot => {

                const data = snapshot.docs.map(doc => ({

                    id: doc.id,

                    ...doc.data()

                })) as StaffOrder[];

                data.sort((a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                );

                setOrders(data);

                if(previousCount.current!==0 &&
                    data.length>previousCount.current){
                
                    new Audio("/ding.mp3").play();
                
                }
                
                previousCount.current=data.length;
            }

        );

        return unsubscribe;

    }, []);

    useEffect(() => {

        let previousPending = 0;
    
        const unsubscribe = onSnapshot(
    
            collection(db, "staffCalls"),
    
            snapshot => {
    
                const calls = snapshot.docs.map(doc => ({
    
                    id: doc.id,
    
                    ...doc.data()
    
                })) as StaffCall[];
    
                const pending = calls.filter(
                    c => c.status === "pending"
                );
    
                if (
                    previousPending !== 0 &&
                    pending.length > previousPending
                ) {
                    new Audio("/ding.mp3").play();
                }
    
                previousPending = pending.length;
    
                setStaffCalls(pending);
    
            }
    
        );
    
        return unsubscribe;
    
    }, []);

    async function logout() {

        await signOut(auth);

        navigate("/staff");

    }

    async function handleResolveCall(id: string) {

        await resolveStaffCall(id);
    
    }

    async function updateStatus(
        id: string,
        status: StaffOrder["status"]
    ) {
    
        const order = orders.find(o => o.id === id);
    
        if (!order) return;
    
        await runTransaction(db, async (transaction) => {
    
            const orderRef = doc(db, "orders", id);
    
            const updates: Partial<StaffOrder> = {
    
                status,
    
                updatedAt: new Date().toISOString()
    
            };
    
            if (status === "preparing") {
    
                updates.preparingAt = new Date().toISOString();
    
            }
    
            if (status === "served") {
    
                updates.servedAt = new Date().toISOString();
    
            }
    
            if (status === "paid") {
    
                updates.paid = true;
    
                updates.paidAt = new Date().toISOString();
    
                // Return every board game in this order
                for (const item of order.items) {
    
                    if (item.type !== "game") continue;
    
                    const gameRef = doc(db, "games", item.id);
    
                    const gameSnap = await transaction.get(gameRef);
    
                    if (!gameSnap.exists()) continue;
    
                    const game = gameSnap.data();
    
                    const inUseCopies = game.inUseCopies ?? 0;
    
                    transaction.update(gameRef, {
    
                        inUseCopies: Math.max(
                            0,
                            inUseCopies - item.qty
                        )
    
                    });
    
                }
    
            }
    
            transaction.update(orderRef, updates);
    
        });
    
    }
    const activeOrders =
        orders.filter(o => o.status !== "paid");

    const historyOrders =
        orders.filter(o => o.status === "paid");


    const groupedActive = useMemo(() => {
        const groups: Record<number, StaffOrder[]> = {};
        activeOrders.forEach(order => {
            if (!groups[order.tableNumber]) {
                groups[order.tableNumber] = [];
            }
            groups[order.tableNumber].push(order);
        });
        return groups;
    }, [activeOrders]);

    const groupedHistory = useMemo(() => {
        const groups: Record<number, StaffOrder[]> = {};
        historyOrders.forEach(order => {
            if (!groups[order.tableNumber]) {
                groups[order.tableNumber] = [];
            }
            groups[order.tableNumber].push(order);
    
        });
    
        return groups;
    
    }, [historyOrders]);

    const activeTables =
        Object.keys(groupedActive).length;

    const pendingOrders =
        orders.filter(o => o.status !== "paid").length;

    const outstanding =
        orders
            .filter(o => !o.paid)
            .reduce((sum, o) => sum + o.total, 0);

    const revenue =
        orders
            .filter(o => o.paid)
            .reduce((sum, o) => sum + o.total, 0);

    return (

        <main className="staff-dashboard">

            <DashboardHeader
                onLogout={logout}
            />

            <DashboardStats
                activeTables={activeTables}
                pendingOrders={pendingOrders}
                outstanding={outstanding}
                paidRevenue={revenue}
            />
            {
    staffCalls.length > 0 && (

        <section className="staff-calls">

            <h2>
                🔔 Staff Calls ({staffCalls.length})
            </h2>

            {

                staffCalls.map(call => (

                    <div
                        key={call.id}
                        className="staff-call-card"
                    >

                        <div>

                            <h3>
                                Table {call.tableNumber}
                            </h3>

                            <p>
                                {call.reason}
                            </p>

                        </div>

                        <button
                            onClick={() =>
                                handleResolveCall(call.id)
                            }
                        >
                            Resolve
                        </button>

                    </div>

                ))

            }

        </section>

    )
}
            <div className="dashboard-tabs">
                <button onClick={()=>setTab("active")}>
                    Active Orders
                </button>

                <button onClick={()=>setTab("history")}>
                    History
                </button>
            </div>
            {
                tab==="active" ?
                Object.entries(groupedActive).map(

                    ([table, tableOrders]) => (

                        <TableGroup

                            key={table}

                            tableNumber={Number(table)}

                            orders={tableOrders}

                            onStatusChange={updateStatus}

                        />

                    )

                ) : Object.entries(groupedHistory).map(([table, tableOrders]) => (

                    <TableGroup

                        key={table}

                        tableNumber={Number(table)}

                        orders={tableOrders}

                        onStatusChange={updateStatus}

                    />

                ))

            }

        </main>

    );

}