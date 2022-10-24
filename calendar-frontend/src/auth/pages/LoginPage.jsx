import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './loginPage.css';


const loginFormFields = {
  loginEmail: '',
  loginPassword: ''
}

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPasswordTwo: ''

}

export const LoginPage = () => {

  const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm( loginFormFields );
  const { errorMessage, startLogin, startRegister } = useAuthStore();

  const loginSubmit = e => {
    e.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword })
     
  };

  const { registerName, registerEmail, registerPassword, registerPasswordTwo, onInputChange:onRegisterInputChange } = useForm( registerFormFields );

  const registerSubmit = e => {
    e.preventDefault();
    console.log({registerPassword, registerPasswordTwo});

    if(registerPassword !== registerPasswordTwo){
      Swal.fire('Error register', 'Password is not the same', 'error');
      return;
    }
    startRegister({ name: registerName, email: registerEmail, password: registerPassword })
  };

  useEffect(() => {
    if( errorMessage !== undefined ){
      Swal.fire('Invalid authentication ', errorMessage, 'error' )
    }
  }, [errorMessage])
  

    return (
      <div className="container login-container">
        <div className="row">
          <div className="col-md-6 login-form-1">
            <h3>Login</h3>
            <form onSubmit={ loginSubmit }>
              <div className="form-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  name='loginEmail'
                  value={ loginEmail }
                  onChange={ onLoginInputChange }
                />
              </div>
              <div className="form-group mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  name='loginPassword'
                  value={ loginPassword }
                  onChange={ onLoginInputChange }
                />
              </div>
              <div className="form-group mb-2">
                <input type="submit" className="btn btn-primary bg-gradient w-100 " value="Login" />
              </div>
            </form>
          </div>

          <div className="col-md-6 login-form-2">
            <h3>Register</h3>
            <form onSubmit={ registerSubmit }>
              <div className="form-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name='registerName'
                  value={ registerName }
                  onChange={ onRegisterInputChange }
                />
              </div>
              <div className="form-group mb-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name='registerEmail'
                  value={ registerEmail }
                  onChange={ onRegisterInputChange }
                />
              </div>
              <div className="form-group mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name='registerPassword'
                  value={ registerPassword }
                  onChange={ onRegisterInputChange }
                />
              </div>

              <div className="form-group mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Repeat password"
                  name='registerPasswordTwo'
                  value={ registerPasswordTwo }
                  onChange={ onRegisterInputChange }
                />
              </div>

              <div className="form-group mb-2">
                <input type="submit" className="btn btn-light bg-gradient w-100" value="Sign in" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};
