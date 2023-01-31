import { useState, useEffect, useContext } from "react";
import { cart } from "./contex";


class Item{
  id = 0;
  name = "";
  price = "";
  images = [];
  amount = 0;
  description = "";
  cartAmount = 1;
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
  const [contextCart, setContextCart] = useState(useContext(cart));
  const [which, setWhich] = useState(true);
  const [products, setProducts] = useState([])
  const [promp, setPromp] = useState(new Item(0, 'Basic Tee 6-Pack', 
                                              '$192',
                                              5,
                                              'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.'));
  useEffect(()=>{
    fetch("http://localhost/user",{
      method:"GET",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    }).then((res)=>res.json()).then((json)=>{
      let items = [];
      json.map((product)=>{
        items = items.concat({id:product.id, name:product.nombre, price:product.precio, description:product.descripcion, amount:product.cantidad, imageAlt:"poyo", images:product.imagenes});
        return "a";
      });
      setProducts(items);
    });
  },[]);
  if(which){
    return(
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                  <a href="/" key={product.id} 
                  onClick={(e)=>{
                    e.preventDefault();
                    setPromp(new Item(product.id, product.name, product.price, product.description, product.amount, product.images));
                    setWhich(false);
                  }} 
                  className="group cursor-pointer">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                        <img
                        src={product.images[0]}
                        alt={product.imageAlt}
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
  }else{
    return(
      <div className="bg-white">
        <div className="pt-6">
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={promp.images[0]}
                alt={"poyo"}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                <img
                  src={promp.images[1]}
                  alt={"poyo"}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                <img
                  src={promp.images[2]}
                  alt={"poyo"}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
              <img
                src={promp.images[3]}
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
                    let c = contextCart;
                    for(let i = c.length - 1; i >= 0; i--){
                      if(c[i].id === promp.id){
                        alert("ya lo agregaste a carrito");
                        setWhich(true); 
                        return;
                      }
                    }
                    fetch("http://localhost/user",{
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
                        }).then((res)=>res.text()).then((n)=>{
                          if(n > 0){
                            contextCart.push(promp);
                          }else{
                            alert("no queda productos");
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