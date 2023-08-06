
//hooks
import { useEffect, useState } from 'react'

//icons
import { AiOutlineShareAlt } from 'react-icons/ai'
import { BiDownload } from 'react-icons/bi'
import { BsTools } from "react-icons/bs"

//components
import { Editor } from '@monaco-editor/react'
import Modal from './components/Modal'

export default function App() {

  const [valuesOfEditors, setValuesOfEditors] = useState({ html: '', css: '', js: ''})
  
  const [openPreferences, setOpenPreferences] = useState(false)

  const [preferences, setPreferences] = useState({
    options: {
      fontSize: 14,
      letterSpacing: 0,
      lineHeight: 18,
      cursorBlinking: 'blink',
      cursorStyle: 'line',
      cursorSmoothCaretAnimation: 'off',
      cursorWidth: 2,
      minimap: {
        enabled: true,
        scale: 2,
        side: 'rigth'
      },
      tabSize: 4,
    },
    theme: 'vs-dark'
  })

  useEffect(() => {
      
      const iframe = document.getElementById('preview')
      const htmlPreview = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
          </head>
        <body>
          ${valuesOfEditors.html}
  
          <style>
            ${valuesOfEditors.css}
          </style>
  
          <script>
            ${valuesOfEditors.js}
          </script>
        </body>
        </html>
      `
  
      iframe.setAttribute('srcDoc', htmlPreview)

  }, [valuesOfEditors])
  

  return (
    <div className="flex flex-col justify-between h-screen relative font-montserratMedium">

      <Modal preferences={preferences} setPreferences={setPreferences} openPreferences={openPreferences} setOpenPreferences={setOpenPreferences} />

      <header className="w-full min-h-[3rem] bg-gray-900 px-4 flex items-center justify-between box-border border-b-4 border-b-[#1e1e1e]">

        <div className='flex items-center gap-2'>
          <img src='/CodeStream_Logo.png' alt="logo" className='w-5 h-5'/>
          <h1 className="text-white text-lg font-montserratMedium">CodeStream</h1>
        </div>


        <div className='flex items-center gap-6 text-gray-200'>
          <AiOutlineShareAlt size={'1.4rem'} className='cursor-pointer transition-all hover:text-gray-400' title='Compartir URL'/>
          <BiDownload size={'1.4rem'} className='cursor-pointer transition-all hover:text-gray-400' title='Descargar HTML' />
          <BsTools size={'1.1rem'} className='cursor-pointer transition-all hover:text-gray-400' title='Preferencias' onClick={() => setOpenPreferences(!openPreferences)}/>
        </div>

      </header>

      <main className="flex-1 w-full grid grid-cols-2 grid-rows-2 bg-[#1e1e1e] font-jetbrainsMono">
        <Editor 
          className='w-full h-full min-h-0'
          defaultLanguage='html'
          defaultValue=''
          onMount={() => console.log('listo')}
          onChange={(value) => setValuesOfEditors({...valuesOfEditors, html: value})}
          theme={preferences.theme}
          options={preferences.options}
        />

        <Editor 
          className='w-full h-full min-h-0'
          defaultLanguage='javascript'
          defaultValue=''
          onMount={() => console.log('listo')}
          onChange={(value) => setValuesOfEditors({...valuesOfEditors, js: value})}
          theme={preferences.theme}
          options={preferences.options}
        />

        <Editor 
          className='w-full h-full min-h-0'
          defaultLanguage='css'
          defaultValue=''
          onMount={() => console.log('listo')}
          onChange={(value) => setValuesOfEditors({...valuesOfEditors, css: value})}
          theme={preferences.theme}
          options={preferences.options}
        />

        <section className='bg-white'>
          <iframe id='preview' className='w-full h-full'></iframe>
        </section>

      </main>
    </div>
  )
}
