interface Props{

    activeTables:number;

    pendingOrders:number;

    outstanding:number;

    paidRevenue:number;

}

export default function DashboardStats({

    activeTables,

    pendingOrders,

    outstanding,

    paidRevenue

}:Props){

    return(

        <section className="dashboard-stats">

            <div className="stat-card">

                <h3>Active Tables</h3>

                <h2>{activeTables}</h2>

            </div>

            <div className="stat-card">

                <h3>Pending Orders</h3>

                <h2>{pendingOrders}</h2>

            </div>

            <div className="stat-card">

                <h3>Outstanding Bills</h3>

                <h2>

                    Rp{outstanding.toLocaleString()}

                </h2>

            </div>

            <div className="stat-card">

                <h3>Paid Today</h3>

                <h2>

                    Rp{paidRevenue.toLocaleString()}

                </h2>

            </div>

        </section>

    );

}