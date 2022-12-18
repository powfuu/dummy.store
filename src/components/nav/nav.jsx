import { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Dialog, Popover, Tab, Transition, Menu } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import Cart from "./cart"
import Fade from "react-reveal/Fade"
const navigation = {
  categories: [
    {
      name: 'Store'
    },
    {
      name: 'About'
    },
  ]}
    function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
    }
const Nav = (prop) =>{
    const [navigationIndex, setNavigationIndex]=useState('Store')
    const [open, setOpen] = useState(false)
    const [carVisibility, setCarVisibility] = useState(false)
    const [isShowingHeader, setShowHeader]=useState(true)
    const [dialogIsOpen, setDialogIsOpen] = useState(false)
    const [isSearching, setIsSearching]=useState(false)
    const navigate = useNavigate()
    const handleCategories = () =>{
        axios.get('https://dummyjson.com/products/categories').then((res)=>{
            prop.setCategories(res.data)
        })
    }
    useEffect(()=>{
        handleCategories()
    }, [prop.categories])
    return(
        <>
            <Cart carVisibility={carVisibility} setCarVisibility={setCarVisibility}/>
<Transition appear show={isSearching}>
    <Dialog as="div" className="relative z-10" onClose={()=>{
        setIsSearching(false)
        }}>
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
              <div className="fixed inset-0 bg-black bg-opacity-25"/>
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto backdrop-blur-sm">
            <div className="flex h-full justify-center items-center">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                    <div className="flex items-center">
                        <input type="text" onChange={(e)=>{
                            prop.setSearchField(e.target.value)
                            prop.setCurrentCategory('')
                        }} placeholder={prop.searchField || "Search for products"} className='p-4 pl-6'/>
                        <MagnifyingGlassIcon className="cursor-pointer h-6 w-6 mr-4" onClick={()=>setIsSearching(false)}/>
                    </div>
                    <Transition show={prop.searchField.length>=1}>
          <Transition.Child 
            enter="ease-out duration-300"
            enterFrom="opacity-0 h-[0px]"
            enterTo="opacity-100 h-[240px]"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 h-[240px]"
            leaveTo="opacity-0 h-0"
          >
              <div className='pt-4 pb-4 overflow-y-scroll grid gap-5 px-5 bg-[rgb(250,250,250)] w-full h-[240px]'>
                  {
                      prop.products.filter((fi)=> fi.title.toLowerCase().includes(prop.searchField.toLowerCase())).map((product)=>{
                          return(
                              <h3 className='active:text-indigo-600 pl-1 cursor-pointer border-b h-9 text-[rgb(110,110,110)] border-gray-300 hover:border-indigo-600 transition-all' onClick={()=>{
                                  setIsSearching(false)
                                  prop.setSearchField(product.title)
                              }}>{product.title.slice(0,25)}{product.title.length >= 25 ? "..." : null}</h3>
                          )
                  })
                  }
              </div>
          </Transition.Child>
                    </Transition>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
<Transition appear show={dialogIsOpen} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={()=>setDialogIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                   This store is only a template maded with React & TailwindCSS 
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        Dummy.Store was maded by Everit Jhon, and it is a store that uses DummyJSON API to create a modern & simple eCommerce application. 
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-[#e6e5ff] px-4 py-2 text-sm font-medium text-[#5046E5] hover:bg-[#dad8ff]"
                        onClick={()=>setDialogIsOpen(false)}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed  inset-0 bg-black bg-opacity-25 w-[100vw]" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex h-[100vh]">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px pb-4 flex-col space-x-3 px-5">
                      {prop.categories.map((category, key) => (
                        <Tab
                          key={key}
                            onClick={()=>{
                                prop.setCurrentCategory(category)
                                setOpen(false)
                            }}
                          className={({ selected }) =>
                            classNames(
                              'text-[rgb(150,150,150)] border-transparent',
                              'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium'
                            )
                          }
                        >
                          {category}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  <div className="flow-root">
                      <p onClick={()=>setDialogIsOpen(true)} className="cursor-pointer -m-2 block p-2 font-medium text-gray-900">
                      Sign in
                    </p>
                  </div>
                  <div className="flow-root">
                    <p onClick={()=>setDialogIsOpen(true)} className="cursor-pointer -m-2 block p-2 font-medium text-gray-900">
                      Create account
                    </p>
                  </div>
                </div>

                <div onClick={()=>setDialogIsOpen(true)} className="cursor-pointer border-t border-gray-200 py-6 px-4">
                  <p className="-m-2 flex items-center p-2">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

        <div className="h-full w-full">
      <header className="relative bg-white w-[100vw] ">
          <Transition className='bg-indigo-600 max-[467px]:p-5' leaveFrom="opacity-100 duration-75" leaveTo="opacity-0 duration-150" show={isShowingHeader}>
              <p onClick={()=>setShowHeader(false)} className="flex h-10 items-center justify-center px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Buy $100 in products and get 15% offer + free delivery!  
                  <svg className="h-[22px] pl-14 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
        </p>
          </Transition>

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/" className='flex gap-3'>
                    <Fade bottom cascade delay="1400">
                        <div>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#5046E5" className="w-7 h-7">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
</svg>
                        </div>
                    </Fade>
                    <Fade left cascade big>
                        <h1 className='font-bold text-ls mt-1 max-[467px]:hidden'>Dummy.Store</h1>
                    </Fade>
                </a>
              </div>

              {/* Flyout menus */}
                <Menu as="div" className="relative inline-block text-left">
      <div>
          <Menu.Button className="inline-flex ml-8 rounded-md text-sm bg-white font-medium text-gray-700">
          Categories
          <ChevronDownIcon className="mt-[2px] -mr-2 ml-[6.5px] h-[18px] w-[18px]" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
          <Menu.Items className="max-[581px]:w-[200px] w-[350px] h-[350px] overflow-y-scroll absolute z-10 mt-5 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"> 
              {
                  prop.categories.map((cat, key)=>{
                      return(
            <Menu.Item key={key}>
              {({ active }) => (
                <a
                  className={classNames(
                      active ? 'cursor-pointer bg-gray-100 text-gray-900 capitalize' : 'cursor-pointer text-gray-700 capitalize',
                    'cursor-pointer block px-4 py-2 text-sm capitalize'
                  )}
                    onClick={()=>prop.setCurrentCategory(cat)}>
                    {cat}
                </a>
              )}
            </Menu.Item>
                      )
              }) 
              }
        </Menu.Items>
      </Transition>
    </Menu>
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category,key) => (
                      <Popover key={key} className="flex">
                      {({ open }) => (
                        <>
                          <div  className="relative flex">
                              <Popover.Button
                              className={classNames(
                                  navigationIndex === category.name
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                              )}
                                  onClick={()=>{
                                    setNavigationIndex(category.name)
                                      if(category.name == 'Store'){
                                          navigate('/')
                                      }else if(category.name == 'About'){
                                          navigate(category.name.toLowerCase())
                                      }
                                  }} >
                              {category.name}
                            </Popover.Button>
                          </div>

                        </>
                      )}
                    </Popover>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <p onClick={()=>setDialogIsOpen(true)} className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-800">
                    Sign in
                  </p>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <p onClick={()=>setDialogIsOpen(true)} className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-800">
                    Create account
                  </p>
                </div>

                <div onClick={()=>setDialogIsOpen(true)} className="hidden lg:ml-8 cursor-pointer lg:flex">
                  <p className="flex items-center text-gray-700 hover:text-gray-800">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </p>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <a className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon onClick={()=>setIsSearching(true)} className="h-6 w-6 cursor-pointer" aria-hidden="true" />
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                    <p onClick={()=>setCarVisibility(true)} className="group -m-2 flex cursor-pointer items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
        </div>
    </div>
        </>
    )
}
export default Nav
