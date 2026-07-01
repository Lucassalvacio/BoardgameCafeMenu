interface Props{

    onLogout:()=>void;

}

export default function DashboardHeader({

    onLogout

}:Props){

    return(

        <header className="staff-header">

            <div>

                <h1>Meeple & Mug</h1>

                <p>Staff Dashboard</p>

            </div>

            <button
                onClick={onLogout}
            >
                Logout
            </button>

        </header>

    );

}