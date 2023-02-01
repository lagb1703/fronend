
import {user as u} from "./contex";
import { useContext, useEffect, useState } from "react";
import { json } from "react-router";

function Product(promp){
  const user = useContext(u);
  const product = promp.product;
  return(
    <form className='flex gap-5 border-2 rounded-md justify-between'>
      <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
        <img 
        src={product.imagenes[0]} 
        alt="poyo"
        className='h-full w-full object-cover object-center'/>
      </div>
      <div className='flex flex-col gap-5 w-2/3'>
        <p>{product.nombre}</p>
        <div className='flex justify-between w-full '>
          <input type="number" placeholder='0' id={"minimun-"+product.id} className='w-20' value={product.minimo}/>
          <input type="number" placeholder='5' id={"amount-"+product.id} className='w-20'value={product.cantidad}/>
          <input type="number" placeholder='10' id={"maximun-"+product.id} className='w-20' value={product.maximo}/>
        </div>
      </div>
      <button className="'flex items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 mt-10'"
      onClick={(e)=>{
        e.preventDefault();
        let minimun = document.getElementById("minimun-"+product.id).value;
        let amount = document.getElementById("amount-"+product.id).value;
        let maximun = document.getElementById("maximun-"+product.id).value;
        fetch("http://localhost/sql",{
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
  const user = useContext(u);
  const [products, setProducts] = useState([]);
  const [admin, setAdmin] = useState({id:0, pasword:"", address:"", phone:0, email:""});
  useEffect(()=>{
    fetch("http://localhost/sql?selector=*&tabla=productos&limit=10").then((res)=>res.json()).then((json)=>{
      setProducts(json);
    });
    fetch("http://localhost/sql?selector=*&tabla=usuarios&limit=1&where=nombre = '" + user[0].name + "'").then((res)=>res.json()).then((json)=>{
      setAdmin({id:json.id, pasword:json.contraseña, addres:json.direccion, phone:json.telefono, email:json.correo});
    });
  }, []);

  if(user[0].type !== 1){
    return(
      <h1 className="text-center mt-20 text-3xl">Area restringida</h1>
    )
  }
  return(
    <main className='m-20'>
      <form className='flex flex-col'>
        <div className='flex justify-between flex-wrap'>
          <input id="password" type="password"placeholder='Password' value={"pepe"}/>
          <input id="address" type="text" placeholder='Address'/>
          <input id="phone" type="number" placeholder='Phone'/>
          <input id="email" type="email" placeholder='Email'/>
        </div>
        <div className='flex justify-center'>
          <button className='flex items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 mt-10'
          onClick={(e)=>{
            e.preventDefault();
            let password = document.getElementById("password").value;
            let address = document.getElementById("address").value;
            let phone = document.getElementById("phone").value;
            let email = document.getElementById("email").value;
            if(password == ""){
              alert("cuidado no pusiste una contraseña");
              return;
            }
            if(email == ""){
              alert("cuidado no pusiste un email");
              return;
            }
            fetch("http://localhost/sql",{
              method:"PUT",
              body:JSON.stringify({
                tabla: "usuarios",
                password: user.password,
                contraseña:password,
                direccion: address,
                telefono: phone,
                correo: email
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
        {products.map((product) => (
          <Product key={10 + product.id} product={product}/>
        ))}
      </div>
    </main>
  )
}
  