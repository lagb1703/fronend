import { createContext } from "react";


export const user = createContext([{name:"", type:0, password:""}]);//aca se guardara el usuario

export const cart = createContext([]);//Aca se guardaran los productos del carro