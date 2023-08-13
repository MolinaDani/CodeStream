
//hooks
import { useEffect, useState } from 'react'
import usePreferences from './hooks/usePreferences'

//icons
import { BiDownload } from 'react-icons/bi'
import { BsTools, BsWindowStack } from "react-icons/bs"
import { FaCopy } from 'react-icons/fa'
import { RiLayoutGridFill } from 'react-icons/ri'
import { TfiLayoutColumn4Alt } from 'react-icons/tfi'


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
import Split from 'split-grid'
import Button from './components/Button'
import ButtonWindows from './components/ButtonWindows'

const languages = {
  HTML: 'html',
  CSS: 'css',
  JS: 'javascript'
}

export default function App() {

  const [proyectHTML, setProyectHTML] = useState('')
  const [valuesOfEditors, setValuesOfEditors] = useState(null)
  const [editorActive, setEditorActive] = useState(languages.HTML)

  const [layout, setLayout] = useState('grid')

  const { setOpenPreferences, theme, options, barPreferences } = usePreferences()

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
    textAreas[1].addEventListener('focus', () => setEditorActive(languages.CSS))
    textAreas[2].addEventListener('focus', () => setEditorActive(languages.JS))

  }

  function handleCopy() {

    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
      navigator.clipboard.writeText(window.location.href);

  }

  function handleDownload() {
    const name = prompt('Ingrese el nombre de su documento: ', 'Proyecto-CodeStream')
    const blob = new Blob([proyectHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${name.length ? name : 'Proyecto-CodeStream'}.html`
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

  useEffect(() => {

    if (layout === 'grid') {
      Split({
        minSize: 150,
        columnGutters: [{ track: 1, element: document.querySelector('.vertical-gutter'), }],
        rowGutters: [{ track: 1, element: document.querySelector('.horizontal-gutter'), }]
      })
      return
    }

    if (layout === 'cols') {
      Split({
          minSize: 100,
          columnGutters: [
            {
              track: 1,
              element: document.querySelector('.vertical-gutter-1'),
            },
            {
              track: 3,
              element: document.querySelector('.vertical-gutter-2'),
            },
            {
              track: 5,
              element: document.querySelector('.vertical-gutter-3'),
            },
          ],
  
        })
        return
    }

  }, [layout])
  

  return (
    <div className={`flex ${barPreferences.side === 'top' ? 'flex-col' : barPreferences.side === 'right' ? 'flex-row-reverse' : 'flex-row'} h-screen relative font-montserratMedium`}>
      <Modal />

      <header className={`${barPreferences.side === 'top' ? 'w-full min-h-[3rem] px-6' : 'h-full min-w-[3rem] py-6 flex-col-reverse'} bg-gray-950 flex items-center justify-between`}>

        <div 
          data-tooltip-id='help' 
          data-tooltip-content={'©2023 CodeStream by Daniel Molina'} 
          data-tooltip-place='bottom' 
          className='flex items-center gap-2 cursor-default'
        >
            <img src='/CodeStream_Logo.png' alt="logo" className='w-6 h-6'/>
            <h1 className={`${barPreferences.side !== 'top' ? 'hidden' : ''} text-white text-lg font-montserratMedium`}>CodeStream</h1>
        </div>

        <div className={`${barPreferences.side !== 'top' ? 'flex-col-reverse' : ''} flex items-center gap-6 text-gray-200`}>

          <div className={`${barPreferences.side !== 'top' ? 'flex-col mt-6 px-1 py-3' : 'mr-6 py-1 px-3'} w-auto flex items-center gap-4 border border-gray-600 rounded-md`}>

            <Button idTool={'help'} textTool={'Vista en cuadrícula'} sideTool={'bottom'} active={layout === 'grid'} click={() => setLayout('grid')}>
              <RiLayoutGridFill size={'1.5rem'}/>
            </Button>

            <Button idTool={'help'} textTool={'Vista en columnas'} sideTool={'bottom'} active={layout === 'cols'} click={() => setLayout('cols')}>
              <TfiLayoutColumn4Alt size={'1.3rem'}/>
            </Button>

            <Button idTool={'help'} textTool={'Vista en Pestañas'} sideTool={'bottom'} active={layout === 'windows'} click={() => setLayout('windows')}>
              <BsWindowStack size={'1.3rem'}/>
            </Button>
          </div>

          <Button idTool={'help'} textTool={'Copiar URL'} sideTool={'bottom'} click={handleCopy}>
            <FaCopy size={'1.4rem'}/>
          </Button>

          <Button idTool={'help'} textTool={'Descargar HTML'} sideTool={'bottom'} click={handleDownload}>
            <BiDownload size={'1.5rem'} />
          </Button>

          <Button idTool={'help'} textTool={'Preferencias'} sideTool={'bottom'} click={() => setOpenPreferences(prevState => !prevState)}>
            <BsTools size={'1.2rem'} />
          </Button>

        </div>

      </header>

      <Tooltip id='help' style={{
          zIndex: 1000, 
          fontSize: '0.8rem', 
          backgroundColor: 'white', 
          color: 'black', 
          padding: '5px 12px'
        }} 
      />

      <main className={`h-full w-full bg-[#1e1e1e] ${layout === 'windows' ? 'flex flex-col' : 'grid'} `} style={
        layout === 'grid' 
        ? { gridTemplateColumns: "49.7%  0.6% 49.7%", gridTemplateRows: "49.3% 1.4% 49.3%" }
        : layout === 'cols'  
          ? { gridTemplateColumns: "24.55% 0.6% 24.55% 0.6% 24.55% 0.6% 24.55%" } 
          : null
        }>

        <aside className={`${layout !== 'windows' ? 'hidden' : ''} flex bg-gray-950 text-white px-2 font-montserratLigth`}>
          <ButtonWindows 
            text={'HTML'} 
            srcImg={HtmlLogo} 
            click={() => setEditorActive(languages.HTML)} 
            active={editorActive === languages.HTML} 
          />
          <ButtonWindows 
            text={'CSS'} 
            srcImg={CssLogo} 
            click={() => setEditorActive(languages.CSS)} 
            active={editorActive === languages.CSS} 
          />
          <ButtonWindows 
            text={'JavaScript'} 
            srcImg={JsLogo} 
            click={() => setEditorActive(languages.JS)} 
            active={editorActive === languages.JS} 
          />
          <ButtonWindows 
            text={'Resultado'} 
            click={() => setEditorActive('preview')} 
            active={editorActive === 'preview'} 
            activeStyle='bg-white text-black font-montserratMedium'
          />
        </aside>

        <section className={`w-full relative pt-1 ${layout === 'windows' ? editorActive !== languages.HTML ? 'hidden' : 'flex-1' : 'h-full'}`}>
          <Editor 
            language={languages.HTML}
            value={valuesOfEditors ? valuesOfEditors.html : ''}
            options={options}
            theme={theme}
            loading={<Spinner />}
            className=''
            onChange={(value) => setValuesOfEditors({...valuesOfEditors, html: value}) }
            onMount={handleMount}
          />

          <img src={HtmlLogo} alt="logo_html" className={`absolute right-5 ${layout === 'windows' ? 'w-12 h-12 bottom-2' : `w-9 h-9 top-2 ${editorActive !== languages.HTML ? 'grayscale opacity-60 scale-90' : ''}`} transition-all`} />

        </section>

        <section className={`w-full relative pt-1 ${layout === 'windows' ? editorActive !== languages.CSS ? 'hidden' : 'flex-1' : 'h-full'}`}>
          <Editor 
            language={languages.CSS}
            value={valuesOfEditors ? valuesOfEditors.css : ''}
            options={options}
            theme={theme}
            loading={<Spinner />}
            className='w-full h-full min-h-0'
            onChange={(value) => setValuesOfEditors({...valuesOfEditors, css: value}) }
          />

          <img src={CssLogo} alt="logo_css" className={`absolute right-5 ${layout === 'windows' ? 'w-12 h-12 bottom-2' : `w-9 h-9 top-2 ${editorActive !== languages.CSS ? 'grayscale opacity-60 scale-90' : ''}`} transition-all`} />
        </section>

        <section className={`w-full relative pt-1 ${layout === 'windows' ? editorActive !== languages.JS ? 'hidden' : 'flex-1' : 'h-full'}`}>
          <Editor 
            language={languages.JS}
            value={valuesOfEditors ? valuesOfEditors.js : ''}
            options={options}
            theme={theme}
            loading={<Spinner />}
            className='w-full h-full min-h-0'
            onChange={(value) => setValuesOfEditors({...valuesOfEditors, js: value}) }
          />

          <img src={JsLogo} alt="logo_javascript" className={`absolute right-5 ${layout === 'windows' ? 'w-12 h-12 bottom-2' : `w-9 h-9 top-2 ${editorActive !== languages.JS ? 'grayscale opacity-60 scale-90' : ''}`} transition-all`} />
        </section>

        <section className={`bg-white ${layout === 'windows' ? editorActive !== 'preview' ? 'hidden' : '' : ''} w-full h-full`}>
          <iframe id='preview' className='w-full h-full'></iframe>
        </section>

        { layout === 'grid'
          ? 
            <>
              <div className="horizontal-gutter bg-gray-950 cursor-row-resize" />
              <div className="vertical-gutter bg-gray-950 cursor-col-resize" />
            </>
          : layout === 'cols'
            ?
              <>
                <div className='bg-gray-950 vertical-gutter-1 cursor-col-resize' />
                <div className='bg-gray-950 vertical-gutter-2 cursor-col-resize' />
                <div className='bg-gray-950 vertical-gutter-3 cursor-col-resize' />
              </>
            : null
        }

      </main>
                  
    </div>
    )
}