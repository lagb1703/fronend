import {user as u} from "./contex";
import { useContext, useEffect, useState } from "react";

function Product(promp){
  const user = useContext(u);//se obtiene el usuario
  const product = promp.product;//se obtiene el producto que se quiere representar
  return(
    <form className='flex gap-5 border-2 rounded-md justify-between'>{/*todo estara dentro de un form*/}
      <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>{/*Crea el marco para la imagen*/}
        <img 
        src={product.imagenes[0]} 
        alt="poyo"
        className='h-full w-full object-cover object-center'/>{/*se pone la imagen principal del producto*/}
      </div>
      <div className='flex flex-col gap-5 w-2/3'>{/*un supercontenedoor para la informacion del producto*/}
        <p>{product.nombre}</p>{/*nombre del producto*/}
        <div className='flex justify-between w-full '>{/*contenedor para los inputs*/}
          {/*dejo un espacio para poner el input de precio*/}
          <input type="number" placeholder='0' id={"minimun-"+product.id} className='w-20' defaultValue={product.minimo}/>{/*con id se crea un id unico*/}
          <input type="number" placeholder='5' id={"amount-"+product.id} className='w-20'defaultValue={product.cantidad}/>
          <input type="number" placeholder='10' id={"maximun-"+product.id} className='w-20' defaultValue={product.maximo}/>
        </div>
      </div>
      <button className="'flex items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 mt-10'"
      onClick={(e)=>{
        e.preventDefault();
        let minimun = document.getElementById("minimun-"+product.id).value;//aca recojeremos la informacion del minimo
        let amount = document.getElementById("amount-"+product.id).value;//aca recojeremos la informacion de la cantidad
        let maximun = document.getElementById("maximun-"+product.id).value;//aca recojeremos la informacion del maximo
        fetch("http://localhost/sql",{//se hace la peticion al servidor
          method:"PUT",
          body:JSON.stringify({
            tabla: "productos",
            password:user[0].password,
            minimo:minimun,
            cantidad:amount,
            maximo:maximun,
            id:product.id
          }),
          headers: new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          })
        });
      }}>
        Enviar
      </button>
    </form>
  )
}

export default function Page() {
  const user = useContext(u);//se obtiene el usuario
  const [products, setProducts] = useState([]);//se guardara todos los productos
  const [admin, setAdmin] = useState({id:0, pasword:"", address:"", phone:0, email:""});
  useEffect(()=>{
    fetch("http://localhost/sql?selector=*&tabla=productos&limit=10")//se consulta los productos al backend
    .then((res)=>res.json()).then((json)=>{
      setProducts(json);
    });
    fetch("http://localhost/sql?selector=*&tabla=usuarios&limit=1&where=nombre = '" + user[0].name + "'")//se consulta sobre el usuario en la base de datos
    .then((res)=>res.json()).then((json)=>{
      setAdmin({id:json[0].id, pasword:json[0].contraseña, addres:json[0].direccion, phone:json[0].telefono, email:json[0].correo});
    });
  }, []);

  if(user[0].type !== 1){//se verifica si el usuario es admin
    return(
      <h1 className="text-center mt-20 text-3xl">Area restringida</h1>
    )
  }
  return(
    <main className='m-20'>
      <form className='flex flex-col'>
        <div className='flex justify-between flex-wrap'>
          <input id="password" type="password"placeholder='Password'/>
          <input id="address" type="text" placeholder='Address'/>
          <input id="phone" type="number" placeholder='Phone'/>
          <input id="email" type="email" placeholder='Email'/>
        </div>
        <div className='flex justify-center'>
          <button className='flex items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 mt-10'
          onClick={(e)=>{//se manda los nuevos datos
            e.preventDefault();
            /**
             * Nota dejo el espacio para cambiar el precio porque quiero probar un punto
             */
            let password = document.getElementById("password").value;//obtiene el valor de la nueva password
            let address = document.getElementById("address").value;//obtiene la nueva direccion del administracio
            let phone = document.getElementById("phone").value;//se obtiene el nuevo telefono del usuario
            let email = document.getElementById("email").value;//se obtiene el nuevo email del administrador
            if(password == ""){//para evitar errores
              alert("cuidado no pusiste una contraseña");
              return;
            }
            if(email == ""){//para evitar errores
              alert("cuidado no pusiste un email");
              return;
            }
            console.log(user[0]);
            fetch("http://localhost/sql",{//se manda la peticion al servidor
              method:"PUT",
              body:JSON.stringify({
                tabla: "usuarios",
                password: user[0].password,       
                contraseña:password,
                direccion: address,
                telefono: phone,
                correo: email,
                id: admin.id
              }),
              headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              })
            });
          }}>
            Send new Data
          </button>
        </div>
      </form>
      <div className='mx-10 my-16 w-full flex flex-col'>
        {products.map((product) => (//itera por aca elemento de products.
          <Product key={10 + product.id} product={product}/>
        ))}
      </div>
    </main>
  )
}
  