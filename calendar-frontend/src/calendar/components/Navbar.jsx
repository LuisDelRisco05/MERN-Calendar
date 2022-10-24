import { useAuthStore } from "../../hooks"




export const Navbar = () => {

  const { user, startLogout } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4 text-light">
        <span>
            <i className="fas fa-calendar-alt"></i>
            &nbsp;
            { user?.name ?? ""}
        </span>

        <button 
          className="btn btn-outline-light"
          onClick={ startLogout }
        >
            <i className="fas fa-sign-out-alt"></i>
            &nbsp;
            <span>Exit</span>
        </button>
    </div>
  )
}
