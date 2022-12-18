import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Nav from "./components/nav/nav"
import './App.css'
import Store from "./components/store/store"
import About from "./components/about/about"

export default function App() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [searchField, setSearchField] = useState('')
    const [currentCategory, setCurrentCategory]=useState('')
    return(
        <>
                <Nav categories={categories} products={products} setCurrentCategory={setCurrentCategory} currentCategory={currentCategory} setCategories={setCategories} searchField={searchField} setSearchField={setSearchField}/> 
            <Routes>
                <Route path="/" element={<Store setSearchField={setSearchField} setCurrentCategory={setCurrentCategory} searchField={searchField} currentCategory={currentCategory} products={products} setProducts={setProducts}/>}/>
                <Route path="/about" element={<About/>}/>
            </Routes>
        </>
    )
}
