import { AiOutlineShareAlt } from 'react-icons/ai'
import { BiDownload } from 'react-icons/bi'
import { CiMenuKebab } from 'react-icons/ci'

export default function App() {

  return (
    <div className="flex flex-col justify-between h-screen">

      <header className="w-full h-12 bg-gray-900 px-4 flex items-center justify-between">

        <div className='flex items-center gap-2'>
          <img src='/CodeStream_Logo.png' alt="logo" className='w-6 h-6'/>
          <h1 className="text-white text-lg font-montserratMedium">CodeStream</h1>
        </div>


        <div className='flex items-center gap-6 text-gray-200'>
          <AiOutlineShareAlt size={'1.4rem'} className='cursor-pointer transition-all hover:text-gray-400' title='Compartir URL'/>
          <BiDownload size={'1.4rem'} className='cursor-pointer transition-all hover:text-gray-400' title='Descargar HTML' />
          <CiMenuKebab size={'1.4rem'} className='cursor-pointer transition-all hover:text-gray-400' title='Opciones' />
        </div>

      </header>

      <main className="flex-1 w-full grid grid-cols-2 grid-rows-2 gap-1 bg-[#202123] font-jetbrainsMono">

        <section className='bg-[#131415] w-full h-full overflow-auto flex'>
          <ul className='py-2 flex flex-col gap-0 text-sm text-gray-500 px-2'></ul>
          <textarea className='bg-[#131415] text-white flex-1 h-full p-2 resize-none font-jetbrainsMono text-sm outline-none'>hola</textarea>
        </section>

        <section className='bg-[#131415] w-full h-full overflow-auto flex'>
          <ul className='py-2 flex flex-col gap-0 text-sm text-gray-500 px-2'></ul>
          <textarea className='bg-[#131415] text-white flex-1 h-full p-2 resize-none font-jetbrainsMono text-sm outline-none'>hola</textarea>
        </section>

        <section className='bg-[#131415] w-full h-full overflow-auto flex'>
          <ul className='py-2 flex flex-col gap-0 text-sm text-gray-500 px-2'></ul>
          <textarea className='bg-[#131415] text-white flex-1 h-full p-2 resize-none font-jetbrainsMono text-sm outline-none'>hola</textarea>
        </section>

        <section className='bg-white'>
          <iframe src="" frameborder="0" className='w-full h-full'></iframe>
        </section>


      </main>
    </div>
  )
}
