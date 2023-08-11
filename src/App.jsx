
//hooks
import { useEffect, useState } from 'react'
import usePreferences from './hooks/usePreferences'

//icons
import { BiDownload } from 'react-icons/bi'
import { BsTools } from "react-icons/bs"
import { FaCopy } from 'react-icons/fa'


//components
import { Editor } from '@monaco-editor/react'
import { Tooltip } from 'react-tooltip'
import Modal from './components/Modal'
import Spinner from './components/Spinner'

//logos
import HtmlLogo from './assets/logos/html_logo.svg'
import CssLogo from './assets/logos/css_logo.svg'
import JsLogo from './assets/logos/js_logo.svg'

//utils
import { Base64 } from 'js-base64'

const languages = {
  HTML: 'html',
  CSS: 'css',
  JS: 'javascript'
}

export default function App() {

  const [proyectHTML, setProyectHTML] = useState('')
  const [valuesOfEditors, setValuesOfEditors] = useState(null)
  const [editorActive, setEditorActive] = useState('')

  const { setOpenPreferences, theme, options } = usePreferences()

  function renderHTML(val) {

    const {html, css, js} = val

    const htmlPreview = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
      <body>
        ${html}
  
        <style>
          ${css}
        </style>
  
        <script>
          ${js}
        </script>
      </body>
      </html>
    `
    setProyectHTML(htmlPreview)
    document.getElementById('preview').setAttribute('srcDoc', htmlPreview)
  }

  function setURL() {
    const { html, css, js } = valuesOfEditors
    window.history.replaceState(null, null, `/${Base64.encode(html)}|${Base64.encode(css)}|${Base64.encode(js)}`)
  }

  function initialize() {

    let params = window.location.pathname.slice(1).split('%7C')
    let initialValues = { html: '', css: '', js: '' }

    if (params[0])
      initialValues.html = Base64.decode(params[0])
  
    if (params[1])
      initialValues.css = Base64.decode(params[1])
  
    if (params[2]) 
      initialValues.js = Base64.decode(params[2])  
    
    setValuesOfEditors(initialValues)
    renderHTML(initialValues)

  }

  function handleMount() {

    const textAreas = document.querySelectorAll('textarea')

    textAreas[0].addEventListener('focus', () => setEditorActive(languages.HTML))
    textAreas[1].addEventListener('focus', () => setEditorActive(languages.JS))
    textAreas[2].addEventListener('focus', () => setEditorActive(languages.CSS))

  }

  function handleCopy() {

    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
      navigator.clipboard.writeText(window.location.href);

  }

  function handleDownload() {
    const blob = new Blob([proyectHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "Proyecto-CodeStream.html"
    a.click()
    URL.revokeObjectURL(url)
  }
  
  useEffect(() => {

    if (valuesOfEditors === null) {
      initialize()
      return
    } 

    renderHTML(valuesOfEditors)
    setURL()
    
  }, [valuesOfEditors])
  

  return (
    <div className="flex flex-col justify-between h-screen relative font-montserratMedium">
      <Modal />

      <header className="w-full min-h-[3.2rem] bg-gray-950 px-6 flex items-center justify-between box-border border-b-4 border-b-[#1e1e1e]">

        <div className='flex items-center gap-2'>
          <img src='/CodeStream_Logo.png' alt="logo" className='w-5 h-5'/>
          <h1 className="text-white text-lg font-montserratMedium">CodeStream</h1>
        </div>

        <div className='flex items-center gap-6 text-gray-200'>

          <button 
            data-tooltip-id='help' 
            data-tooltip-content={'Copiar URL'} 
            data-tooltip-place='bottom' 
            className='transition-all hover:text-gray-400' 
            onClick={handleCopy}
          >
            <FaCopy size={'1.4rem'}/>
          </button>

          <button 
            data-tooltip-id='help' 
            data-tooltip-content={'Descargar HTML'} 
            data-tooltip-place='bottom' 
            className='transition-all hover:text-gray-400' 
            onClick={handleDownload}
          >
            <BiDownload size={'1.5rem'} />
          </button>

          <button 
            data-tooltip-id='help' 
            data-tooltip-content={'Preferencias'} 
            data-tooltip-place='bottom' 
            className='transition-all hover:text-gray-400' 
            onClick={() => setOpenPreferences(prevState => !prevState)}
          >
            <BsTools size={'1.2rem'} />
          </button>

          <Tooltip id='help' style={{
            zIndex: 1000, 
            fontSize: '0.8rem', 
            backgroundColor: 'white', 
            color: 'black', 
            padding: '5px 12px'}} 
          />

        </div>

      </header>

      <main className="flex-1 w-full bg-[#1e1e1e] grid grid-cols-2 grid-rows-2">

        <section className='w-full h-full relative'>
          <Editor 
            language={languages.HTML}
            value={valuesOfEditors ? valuesOfEditors.html : ''}
            options={options}
            theme={theme}
            loading={<Spinner />}
            className='w-full h-full min-h-0'
            onChange={(value) => setValuesOfEditors({...valuesOfEditors, html: value}) }
            onMount={handleMount}
          />

          <img src={HtmlLogo} alt="logo_html" className={`w-9 h-9 absolute top-2 right-5 transition-all ${editorActive !== languages.HTML ? 'grayscale opacity-60 scale-90' : ''} transition-all`} />

        </section>

        <section className='w-full h-full relative'>
          <Editor 
            language={languages.JS}
            value={valuesOfEditors ? valuesOfEditors.js : ''}
            options={options}
            theme={theme}
            loading={<Spinner />}
            className='w-full h-full min-h-0'
            onChange={(value) => setValuesOfEditors({...valuesOfEditors, js: value}) }
          />

          <img src={JsLogo} alt="logo_html" className={`w-8 h-8 absolute top-2 right-5 transition-all ${editorActive !== languages.JS ? 'grayscale opacity-60 scale-90' : ''} transition-all`} />
        </section>

        <section className='w-full h-full relative'>
          <Editor 
            language={languages.CSS}
            value={valuesOfEditors ? valuesOfEditors.css : ''}
            options={options}
            theme={theme}
            loading={<Spinner />}
            className='w-full h-full min-h-0'
            onChange={(value) => setValuesOfEditors({...valuesOfEditors, css: value}) }
          />

          <img src={CssLogo} alt="logo_html" className={`w-9 h-9 absolute top-2 right-5 transition-all ${editorActive !== languages.CSS ? 'grayscale opacity-60 scale-90' : ''} transition-all`} />
        </section>

        <section className='bg-white'>
          <iframe id='preview' className='w-full h-full'></iframe>
        </section>

      </main>
                  
    </div>
    )
}