import {Link, BrowserRouter} from "react-router-dom";
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const products = [
    {
      id: 1,
      name: 'Throwback Hip Bag',
      href: '#',
      color: 'Salmon',
      price: '$90.00',
      quantity: 1,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
      imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
      id: 2,
      name: 'Medium Stuff Satchel',
      href: '#',
      color: 'Blue',
      price: '$32.00',
      quantity: 1,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
      imageAlt:
        'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
  ]

export default function Header(){
    const [open, setOpen] = useState(false)
    return(
        <>
            <BrowserRouter>
                <header className="w-full h-14 border-b-4 border-red-500 p-2">
                    <nav className="h-full flex justify-between mx-8">
                        <Link to="#" className="h-full cursor-pointer">
                            <img className="h-full" src={require("./media/logox70.png")}/>
                        </Link>
                        <div className="h-full flex gap-x-10">
                            <Link to="#" className="h-full flex items-center cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>
                            </Link>
                            <Link to="#" className="h-full flex items-center cursor-pointer" onClick={()=>{setOpen(true)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </Link>
                        </div>
                    </nav>
                </header>
            </BrowserRouter>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
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
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                                            <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <div className="flow-root">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                {products.map((product) => (
                                                <li key={product.id} className="flex py-6">
                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={product.imageSrc}
                                                        alt={product.imageAlt}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                    </div>

                                                    <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>
                                                            <a href={product.href}>{product.name}</a>
                                                        </h3>
                                                        <p className="ml-4">{product.price}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <p className="text-gray-500">Qty {product.quantity}</p>

                                                        <div className="flex">
                                                        <button
                                                            type="button"
                                                            className="font-medium text-red-600 hover:text-red-500"
                                                        >
                                                            Remove
                                                        </button>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </li>
                                                ))}
                                            </ul>
                                            </div>
                                        </div>
                                        </div>

                                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>Subtotal</p>
                                                <p>$262.00</p>
                                            </div>
                                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                            <div className="mt-6">
                                                <a
                                                href="#"
                                                className="flex items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700"
                                                >
                                                Pay
                                                </a>
                                            </div>
                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                <p>
                                                or 
                                                <button
                                                    type="button"
                                                    className="font-medium text-red-600 hover:text-red-500"
                                                    onClick={() => setOpen(false)}
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