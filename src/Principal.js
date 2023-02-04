import { useState, useEffect, useContext } from "react";
import {useNavigate} from "react-router-dom";
import { cart, user } from "./contex";


/**
 * se utilizaran para guardar un formato del producto
 */
class Item{
  id = 0;//se guardara el id
  name = "";//se guardara el nombre
  price = "";//se guardara el precio
  images = [];//se guardara las imagene
  amount = 0;//se guarda el stock del producto
  description = "";//se guardara la descripcion del producto
  cartAmount = 1;//guardara la cantidad que se ingreso en el carrito
  constructor(id, name, price, description, amount,
    images = [
      'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg'
  ]){
    this.id = id;
    this.name = name;
    this.price = price;
    this.images = images;
    this.description = description;
    this.amount = amount;
  }
}  


export default function PrincipalPage(){
  const NAVIGATE = useNavigate();
  const [contextCart, setContextCart] = useState(useContext(cart));//se obtiene el contexto del carrito de comnpras para utilizarlo despuesx
  const [which, setWhich] = useState(true);//aca se decide si se renderiza los productos o el producto
  const [products, setProducts] = useState([]);//aca se guardaran los productos del carrito
  const [promp, setPromp] = useState(new Item(0, 'Basic Tee 6-Pack', 
                                              '$192',
                                              5,
                                              'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.'
                                              ));//aca se guardara el producto a mostrar, tiene un producto por defecto
  useEffect(()=>{//este useEffect se utiliza para
    fetch("https://pollopunto.onrender.com/user",{//se piden los productos a la base de datos
      method:"GET",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    }).then((res)=>res.json()).then((json)=>{
      let items = [];//se guardara los items
      json.map((product)=>{
        items = items.concat({id:product.id, name:product.nombre, price:product.precio, description:product.descripcion, amount:product.cantidad, imageAlt:"poyo", images:JSON.parse(product.imagenes)});//se agrega un JSON con las prodiedades que vamos a usar
        return "a";//retornamos algo para evitar un error en consola
      });
      console.log(items[0].images[0]);
      setProducts(items);//se rellena el array
    });
  },[]);//se ejecuta cada ves que se renderize el componente
  if(which){//si es verdadero se renderiza una lista de diez productos
    return(
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (//aca se renderiza los productos de la lista de products
                  <a href="/" key={product.id} 
                  onClick={(e)=>{//si se unde en un producto se va directamente a su contraparte
                    e.preventDefault();
                    setPromp(new Item(product.id, product.name, product.price, product.description, product.amount, product.images));
                    setWhich(false);//se habre la vista de producto
                  }} 
                  className="group cursor-pointer">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                        <img
                        src={product.images[0]}//se muestra la imagen principal
                        alt={product.imageAlt}//se pone un descripcion pequeña a la imagen, normalmente sera poyo
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                  </a>
              ))}
            </div>
        </div>
      </div>
    )
  }else{//si which es falso simplemente se renderizara la vista de producto
    return(
      <div className="bg-white">
        <div className="pt-6">
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={promp.images[0]}//se coloca la imagen principal
                alt={"poyo"}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                <img
                  src={promp.images[1]}//se coloca la imagen secundaria
                  alt={"poyo"}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                <img
                  src={promp.images[2]}//se coloca la imagen tercearia
                  alt={"poyo"}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
              <img
                src={promp.images[3]}//se coloca la imagen cuartenaria
                alt={"poyo"}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{promp.name}</h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">{promp.price}</p>
              <form className="mt-10">
                <button
                  onClick={(e)=>{
                    e.preventDefault();
                    if(user._currentValue[0].name == ""){//se pregunta si estas logueado
                      alert("Tienes que estar registrado para poder reservar productos");
                      NAVIGATE("/login");
                      return;
                    }
                    if(user._currentValue[0].type == 1){//se pregunta si eres el administrador
                      alert("eres administrador no cliente");
                      NAVIGATE("/admin");
                      return;
                    }
                    let c = contextCart;//se obtiene el el valor del carrito
                    for(let i = c.length - 1; i >= 0; i--){//se revisa si ya lo agrego
                      if(c[i].id === promp.id){//si es asi lo devuleve a la vista secundaria
                        alert("ya lo agregaste a carrito");
                        setWhich(true); 
                        return;
                      }
                    }
                    fetch("https://pollopunto.onrender.com/user",{//se reserva el producto
                            method:"PATCH",
                            mode: 'cors',
                            body:JSON.stringify({
                                id:promp.id,
                                cantidad:-1
                            }),
                            headers: new Headers({
                              'Content-Type': 'application/json',
                              'Access-Control-Allow-Origin': '*',
                            })
                        }).then((res)=>res.text()).then((n)=>{//devuelve un numero que representa el stock restante
                          if(n >= 0){//si es positiva si se guardo el producto
                            contextCart.push(promp);//se agrega el producto
                          }else{//else
                            alert("no queda productos");//se le indica al usuario que y ano quedan productos
                          }
                        });
                    //
                    setWhich(true);
                  }}
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 py-3 px-8 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Add to shopping cart
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">{promp.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}