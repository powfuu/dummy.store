import SkeletonList from "../skeleton/skeleton-list"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useEffect, useState } from "react"
import Fade from "react-reveal/Fade"
import axios from "axios"
const Store = prop =>{
    const [loaded, setLoaded]=useState(false)
    useEffect(()=>{
        axios.get('https://dummyjson.com/products').then((response)=>{
            prop.setProducts(response.data.products)
        })
    },[])
    return(
        <div className='h-[100vh] w-full'>
       <div className="bg-white -mt-12">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      {
          prop.currentCategory != '' || prop.searchField.length>=1 ?
              <>
                  <nav class="rounded-md w-full -mt-6 mb-6 max-[639px]:mt-2">
  <ol class="list-reset flex">
      <li><a class="text-indigo-600 hover:text-indigo-600 cursor-pointer" onClick={()=>{
          prop.setSearchField('') 
          prop.setCurrentCategory('')
      }}>Store</a></li>
    <li><span class="text-gray-500 mx-2 cursor-default">/</span></li>
      <li><a class="text-indigo-600 hover:text-indigo-600 cursor-default">{prop.currentCategory != '' ? "Category" : prop.searchField.length >= 1 ? "Search" : null}</a></li>
    <li><span class="text-gray-500 mx-2 cursor-default">/</span></li>
      <li class="text-gray-500 capitalize cursor-default">{ prop.currentCategory != '' ? prop.currentCategory : prop.searchField.length >= 1  ? prop.searchField : null}</li>
  </ol>
</nav>
              </>
              : null
      }
                    <Fade top cascade duration="600">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">{
              prop.currentCategory != '' ? `Looking in ${prop.currentCategory[0].toUpperCase()+prop.currentCategory.slice(1)} category` 
              :
                prop.searchField.length >= 1 ?
                  `Searching for ${prop.searchField}`
              : `You may be interested on` 
          }</h2>
                    </Fade>
        <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {prop.products.filter((fi)=>prop.currentCategory != '' ? fi.category==prop.currentCategory : prop.searchField.length>=1 ? fi.title.toLowerCase().includes(prop.searchField.toLowerCase()) : fi).map((product, KEY) =>{
            return (
            <div key={product.id} className="group relative">
            {
                !loaded && <Fade top cascade duration="600"><SkeletonList/></Fade>
            }
                    <Fade bottom cascade duration="600">
                <div className={!loaded && "invisible fixed"}>
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md lg:aspect-none lg:h-80">
                    <LazyLoadImage src={product.thumbnail}
                        alt={product.title}
                        className="group-hover:opacity-75 group-hover:scale-125 transition-all duration-700 h-full w-full rounded-xl object-cover object-center lg:h-full lg:w-full"
                        onLoad={()=>setLoaded(true)}
                    />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a>
                      <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}€</p>
              </div>
                </div>
                    </Fade>
            </div>
          )
            } )}
        </div>
      </div>
    </div>
        </div>
    )
}
export default Store
