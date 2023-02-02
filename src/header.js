import {Link, useNavigate} from "react-router-dom";
import { Fragment, useState, useContext, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { cart } from "./contex"; 

function Product(promp){
    const PRODUCT = promp.product;//obtenemso el producto
    const total = promp.total;//se modifica el state total del padre
    const car = promp.car;//se modifica el carrito en el padre
    const VALUE = promp.value;//se obtiene el valor del carrito del padre
    const [amount, setAmount] = useState(PRODUCT.cartAmount);
    return(
        <li className="flex py-6 items-center">{/*cada producto es un item de una lista ul*/}
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img
                src={PRODUCT.images[0]}//la imagen principal del proyecto
                alt={"poyo"}//poyo porque si no hay sentido puedes cambiarlo
                className="h-full w-full object-cover object-center"
            />
            </div>

            <div className="ml-4 flex flex-1 flex-col">{/*aca inicia*/}
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>{/*aca se coloca el nombre del producto*/}
                        <a href={"/"} onClick={(e)=>{e.preventDefault()}}>{PRODUCT.name}</a>{/*un a para cambiar el cursor*/}
                    </h3>
                    <p className="ml-4">{PRODUCT.price}</p>{/*se pone el precio del producto*/}
                    </div>
                </div>
            <div className="flex items-center justify-end">
                <button className="p-2 text-red-600 hover:text-red-500 text-3xl" onClick={(e)=>{
                    e.preventDefault();
                    if(PRODUCT.amount - amount > 0){//se pregunta si hay stock local
                        fetch("http://localhost/user",{//se envia la peticion al backend para guardar el producto
                            method:"PATCH",
                            mode: 'cors',
                            body:JSON.stringify({
                                id:PRODUCT.id,
                                cantidad:-1
                            }),
                            headers: new Headers({
                              'Content-Type': 'application/json',
                              'Access-Control-Allow-Origin': '*',
                            })
                        }).then(res=>res.text()).then((n)=>{//el servidor devuelve un numero si es mayor a cero se guardo el producto
                            n = parseInt(n);
                            if(n >= 0){
                                total(PRODUCT.price);
                                setAmount(amount + 1);
                                PRODUCT.cartAmount += 1;
                            }else{//si es menor simplemente no puede guardar el producto
                                alert("lo lamentamos ya no hay existencias de ese producto")
                            }
                        });
                    }
                }}>+</button>
                <p className="m-4 text-sm">{amount}</p>{/*se pone la cantidad que se adquiere*/}
                <button className="p-2 text-blue-600 hover:text-blue-500 text-3xl" onClick={(e)=>{
                    e.preventDefault();
                    if(amount > 1){//la unica forma de eliminar un producto del carrito es darle al boton eliminar
                        fetch("http://localhost/user",{//se envia la peticion al servidor para liberar el producto
                            method:"PATCH",
                            mode: 'cors',
                            body:JSON.stringify({
                                id:PRODUCT.id,
                                cantidad:1
                            }),
                            headers: new Headers({
                              'Content-Type': 'application/json',
                              'Access-Control-Allow-Origin': '*',
                          })
                        }).then(()=>{//no importa la respuesta ya que se libera el stock
                            total(-PRODUCT.price);//decrementa el precio
                            setAmount(amount - 1);//decrementa la cantidad
                            PRODUCT.cartAmount -= 1;//lo mismo
                        });
                    }
                }}>-</button>
            </div>
            <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500">amount {PRODUCT.amount - amount}</p>
                <div className="flex">
                    <button
                        type="button"
                        className="font-medium text-red-600 hover:text-red-500"
                        onClick={(e)=>{
                            e.preventDefault();
                            for(let i = VALUE.length - 1; i >= 0; i--){//se busca el producto en el carrito, que es representado por VALUE
                                if(VALUE[i].id === PRODUCT.id){//pregunta si el id es identico
                                    VALUE.splice(i, 1);//elimina el producto del array del carrito
                                    break;
                                }
                            }
                            fetch("http://localhost/user",{//se hace la peticion al servidor
                                method:"PATCH",
                                mode: 'cors',
                                body:JSON.stringify({
                                    id:PRODUCT.id,
                                    cantidad:amount
                                }),
                                headers: new Headers({
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                                })
                            }).then(()=>{//ya que estamos libertando los productos, no necesitamos la respuesta del servidor
                                car(VALUE);//se setea el carrito para que se renderice en el carrito
                                total(-(PRODUCT.price*amount));//se setea el precio
                                setAmount(0);//Elimina la cantidad, aunque es algo inutil ya que se dejara de renderizar en el carrito
                                PRODUCT.cartAmount = 0;//lo mismo
                            });
                        }}
                    >
                        Remove
                    </button>
                </div>
            </div>
            </div>
        </li>
    );
}

export default function Header(){
    const NAVIGATE = useNavigate();
    const [open, setOpen] = useState(false);//se usa para redenriza el carrito si este esta en true
    const [total, setTotal] = useState(0);//SE UTILIZA PARA RENDERIZAR EL TOTAL
    const [contextCart, setContextCart] = useState(useContext(cart));//SE UTILIZA PARA RENDERIZAR LOS PRODUCTOS DEL CARRITO
    /**
     * 
     * @param {number} number 
     * @returns {void}
     * @description suma o resta al precio desde el componente hijo
     */
    function posTotal(number){
        if(total + number >= 0){
            setTotal(total + number);
            return;
        }
        setTotal(0);
    }

    /**
     * 
     * @param {product[]} array 
     * @descripcion setea el carrito al valor que queremos desde el componente hijo
     */
    function posCar(array){
        setContextCart(array);
    }
    useEffect(()=>{//se usa useEffect para calcular el total que hay en el carrito
        setTotal(0);
        let total = 0;
        contextCart.map((product)=>{
            total += product.price*product.cartAmount;
        });
        setTotal(total);
    }, [open]);//se ejecuta cada ves que open cambia de valor
    return(
        <>
            <header className="w-full h-14 border-b-4 border-red-500 p-2">{/*todo esto en el navbar que yo hice*/}
                <nav className="h-full flex justify-between mx-8">
                    <Link to="/" className="h-full cursor-pointer" 
                    onClick={(e)=>{
                        e.preventDefault();
                        NAVIGATE("/");
                    }}>
                        <img className="h-full" src={require("./media/logox70.png")} alt="poyo"/>
                    </Link>
                    <div className="h-full flex gap-x-10">
                        <Link to="/login" relative="path" className="h-full flex items-center cursor-pointer" onClick={(e)=>{
                            e.preventDefault();
                            NAVIGATE("/login");/*se va directamente al login*/
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                            </svg>
                        </Link>
                        <Link to="/" relative="path" className="h-full flex items-center cursor-pointer" onClick={(e)=>{
                            e.preventDefault();
                            setOpen(true);/*se habre el carrito*/
                            }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </Link>
                    </div>
                </nav>
            </header>
            <Transition.Root show={open} as={Fragment}>{/*pertenece a la libreria de @headlessui no me hago cargo de su funcionamiento*/}
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child //pertenece a la libreria de @headlessui no me hago cargo de su funcionamiento
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">{/*pertenece a la libreria de @headlessui no me hago cargo de su funcionamiento*/}
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>{/*pertenece a la libreria de @headlessui no me hago cargo de su funcionamiento*/}
                                            <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />{/*un icono de @heroicons*/}
                                            </button>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <div className="flow-root">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                {contextCart.map((product) => (
                                                    <Product key={10 + product.id} product={product} total={posTotal} car={posCar} value={contextCart}/>//se renderiza los productos
                                                ))}
                                            </ul>
                                            </div>
                                        </div>
                                        </div>

                                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>Subtotal</p>
                                                <p>{total}</p>{/*se renderiza el total de las compras*/}
                                            </div>
                                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>{/*frase de prueba puede cambiar en un futuro*/}
                                            <div className="mt-6">
                                                <a
                                                href="/"
                                                className="flex items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700"
                                                >
                                                Pay
                                                </a>{/*link de pago*/}
                                            </div>
                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                <p>
                                                or 
                                                <button
                                                    type="button"
                                                    className="font-medium text-red-600 hover:text-red-500"
                                                    onClick={() => setOpen(false)}/*se cierra el carrito*/
                                                >
                                                    Continue Shopping
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}