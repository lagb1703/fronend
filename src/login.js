import { LockClosedIcon } from '@heroicons/react/20/solid'
import {user as u} from "./contex";
import { useState, useContext } from 'react'
import {useNavigate} from "react-router-dom";

export default function Login() {
  const NAVIGATE = useNavigate();//se obtiene la navegacion
  const [which, setWhich] = useState(true);//para renderizar el ligon o el register
  const user = useContext(u);//obtienes el usuario
  if(which){//si es true como el estado inicial se mostrara unicamente el login
    return (
      <>
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 my-20">
          <div className="w-full max-w-md space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src={require("./media/logox70.png")}
                alt="Your Company"
              />
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 my-20">
                Sign in to your account
              </h2>
            </div>
            <form className="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input //input del email
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input //input de la contraseña
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>
  
              <div className="flex items-center justify-between">
              </div>
  
              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  onClick={(e)=>{
                    e.preventDefault();
                    let email = document.getElementById("email-address").value; //se obtiene la informacion que hay en el email
                    if(email === ""){//se pregunta si email es "" para evitar una consulta inutil a la base de datos
                      alert("correo o contraseña erroneos");
                      return;
                    }
                    fetch("https://pollopunto.onrender.com/email?email=" + email).then((res)=>res.json()).then((json)=>{//se obtiene la respuesta del backend
                        if(!json){//si no existe el correo simplemente le servidor mandara undefined
                          alert("correo o contraseña erroneos");
                          return;
                        }
                        let password = document.getElementById("password").value;//se obtine la contraseña
                        if(json.contraseña !== password){//se compara la contraseña que da el usuario y la based e datos
                          alert("correo o contraseña erroneos");
                          return;
                        }
                        user[0].name = json.nombre;//se setea el useContext de usuarios
                        user[0].type = json.tipo;
                        if(user[0].type == 1){//se pregunta si el tipo es administrador si es asi manda la contraseña del servidor y lo redirige a admin
                          user[0].password = json.password;
                          NAVIGATE("/admin");
                        }else{//sino es un usuario normal asi que no tendra ningun permiso de administrador, se redirige a los productos
                          user[0].password = "";
                          NAVIGATE("/");
                        }
                    });
                  }}  
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-red-500 group-hover:text-red-400" aria-hidden="true" />
                  </span>
                  Sign in
                </button>
              </div>
              <div className="flex items-center justify-center">
                <a href='' className='text-red-500 group-hover:text-red-400' onClick={(e)=>{
                  e.preventDefault();
                  setWhich(false);//se renderiza el registro
                }}>Create new acount</a>
              </div> 
            </form>
          </div>
        </div>
      </>
    )   
  }else{//aca se renderiza el registro si wich es falso
    return (
      <div className="mx-10 mt-20">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
              <p className="mt-1 text-sm text-gray-600">Use a permanent email address where you can receive mail.</p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input // input del nombre
                        type="text"
                        name="name"
                        id="Name"
                        autoComplete="given-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input //input de la contraseña
                        type="password"
                        name="password"
                        id="Password"
                        autoComplete="family-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input //input de email
                        type="email"
                        name="email-address"
                        id="Email-address"
                        autoComplete="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <select // parte del input de address
                        id="Country"
                        name="country"
                        autoComplete="country-name"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                      >
                        <option>Colombia</option>
                      </select>
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                        Street address
                      </label>
                      <input // parte del input de address
                        type="text"
                        name="street-address"
                        id="Street-address"
                        autoComplete="street-address"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input // parte del input de address
                        type="text"
                        name="city"
                        id="City"
                        autoComplete="address-level2"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                        State / Province
                      </label>
                      <input // parte del input de address
                        type="text"
                        name="region"
                        id="Region"
                        autoComplete="address-level1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input //input del numero de telefono
                        type="number"
                        name="phone"
                        id="Phone"
                        autoComplete="postal-code"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button //es el botton para enviar todos los datos del nuevo usuario
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    onClick={(e)=>{
                      e.preventDefault();
                      let name = document.getElementById("Name").value;//se obtiene el valor del nombre del input del nombre
                      let password = document.getElementById("Password").value;//se obtiene el valor del password del input de la contraseña
                      let email = document.getElementById("Email-address").value;//se obtiene el valor del email del input del correo electronico
                      let country = document.getElementById("Country").value;//se obtiene el valor del country del input del pais
                      let streetaddress = document.getElementById("Street-address").value;//se obtiene el valor del street del input de la calle
                      let city = document.getElementById("City").value;//se obtiene el valor del city del input de la ciudad
                      let region = document.getElementById("Region").value;//se obtiene el valor de la region del input del region
                      let phone = document.getElementById("Phone").value;//se obtiene el valor del phone del input del telefono
                      if(name === "" || password === "" || country === "" || streetaddress === "" || city === "" || region === "" || phone === ""){//se verifica que ningun campo este vacio
                        alert("Algunos campos estan sin rellenar");
                        return;
                      }
                      fetch("https://pollopunto.onrender.com/email?email="+email).then(res=>res.json()).then((json)=>{//se hace la peticion a la base de datos para verificar qi el correo esta en uso
                        if(json.password !== ""){
                          alert("correo ya en uso");
                          return;
                        }
                        let ubication = `${country} ${region} ${city} ${streetaddress}`;//se une toda la direccion en general
                        fetch("https://pollopunto.onrender.com/user",{//se hace la peticion a la base de datos para crear unn nuevo usuario
                            method:"POST",
                            mode: 'cors',
                            body:JSON.stringify({
                              nombre:name,
                              contraseña: password,
                              correo:email,
                              direccion: ubication,
                              tipo: 0,
                              telefono: phone
                            }),
                            headers: new Headers({
                              'Content-Type': 'application/json',
                              'Access-Control-Allow-Origin': '*',
                          })
                        }).then((res)=>res.text()).then(()=>{
                          alert("usuario registrado");//se redirige a la pagina principal
                          user[0].name = name;//se guarda el user
                          user[0].password = "";
                          user[0].type = 0;
                          NAVIGATE("/");
                        });
                      });
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
