
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
import Button from './components/Button'
import ButtonWindows from './components/ButtonWindows'

//logos
import HtmlLogo from './assets/logos/html_logo.svg'
import CssLogo from './assets/logos/css_logo.svg'
import JsLogo from './assets/logos/js_logo.svg'

//utils
import { Base64 } from 'js-base64'
import Split from 'split-grid'
import { LANGUAGES, LAYOUTS } from './assets/dictionary'

export default function App() {

  const [proyectHTML, setProyectHTML] = useState('')
  const [valuesOfEditors, setValuesOfEditors] = useState(null)
  const [editorActive, setEditorActive] = useState(LANGUAGES.html)

  const { 
    setOpenPreferences, 
    theme, 
    options, 
    barPreferences, 
    changeBarPreferences, 
    layout, 
    setLayout 
  } = usePreferences()

  function renderHTML(val) {

    const { html, css, javascript } = val

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
          ${javascript}
        </script>
      </body>
      </html>
    `
    setProyectHTML(htmlPreview)
    document.getElementById('preview').setAttribute('srcDoc', htmlPreview)
  }

  function setURL() {
    const { html, css, javascript } = valuesOfEditors
    window.history.replaceState(null, null, `/${Base64.encode(html)}|${Base64.encode(css)}|${Base64.encode(javascript)}`)
  }

  function initialize() {

    let params = window.location.pathname.slice(1).split('%7C')
    let initialValues = { html: '', css: '', javascript: '' }

    if (params[0])
      initialValues.html = Base64.decode(params[0])
  
    if (params[1])
      initialValues.css = Base64.decode(params[1])
  
    if (params[2]) 
      initialValues.javascript = Base64.decode(params[2])  
    
    setValuesOfEditors(initialValues)
    renderHTML(initialValues)

  }

  function handleMount() {

    const textAreas = document.querySelectorAll('textarea')

    textAreas[0].addEventListener('focus', () => setEditorActive(LANGUAGES.html))
    textAreas[1].addEventListener('focus', () => setEditorActive(LANGUAGES.css))
    textAreas[2].addEventListener('focus', () => setEditorActive(LANGUAGES.javascript))

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

  function handleRezise() {
    if (window.innerWidth <= 768) {
      setLayout(LAYOUTS.windows)
      changeBarPreferences('side', 'top')
    }
  }

  useEffect(() => {
    handleRezise()
    window.addEventListener('resize', handleRezise)
  }, [])
  
  useEffect(() => {

    if (valuesOfEditors === null) {
      initialize()
      return
    } 

    renderHTML(valuesOfEditors)
    setURL()
    
  }, [valuesOfEditors])

  useEffect(() => {

    if (layout === LAYOUTS.grid) {
      Split({
        minSize: 150,
        columnGutters: [{ track: 1, element: document.querySelector('.vertical-gutter'), }],
        rowGutters: [{ track: 1, element: document.querySelector('.horizontal-gutter'), }]
      })
      return
    }

    if (layout === LAYOUTS.columns) {
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

      <aside className={`${barPreferences.side === 'top' ? 'w-full min-h-[3rem] px-6' : 'h-full min-w-[3rem] py-6 flex-col-reverse'} bg-gray-950 flex items-center justify-between`}>

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

      </aside>

      <Tooltip id='help' style={{
          zIndex: 1000, 
          fontSize: '0.8rem', 
          backgroundColor: 'white', 
          color: 'black', 
          padding: '5px 12px'
        }} 
      />

      <main className={`h-full w-full bg-[#1e1e1e] ${layout === LAYOUTS.windows ? 'flex flex-col' : 'grid'} `} style={
        layout === LAYOUTS.grid 
        ? { gridTemplateColumns: "49.7%  0.6% 49.7%", gridTemplateRows: "49.3% 1.4% 49.3%" }
        : layout === LAYOUTS.columns  
          ? { gridTemplateColumns: "24.55% 0.6% 24.55% 0.6% 24.55% 0.6% 24.55%" } 
          : null
        }>

        <div className={`${layout !== LAYOUTS.windows ? 'hidden' : ''} flex bg-gray-950 text-white px-2 font-montserratLigth`}>
          <ButtonWindows 
            text={'HTML'} 
            srcImg={HtmlLogo} 
            click={() => setEditorActive(LANGUAGES.html)} 
            active={editorActive === LANGUAGES.html} 
          />
          <ButtonWindows 
            text={'CSS'} 
            srcImg={CssLogo} 
            click={() => setEditorActive(LANGUAGES.css)} 
            active={editorActive === LANGUAGES.css} 
          />
          <ButtonWindows 
            text={'JavaScript'} 
            srcImg={JsLogo} 
            click={() => setEditorActive(LANGUAGES.javascript)} 
            active={editorActive === LANGUAGES.javascript} 
          />
          <ButtonWindows 
            text={'Resultado'} 
            click={() => setEditorActive('preview')} 
            active={editorActive === 'preview'} 
            activeStyle='bg-white text-black font-montserratMedium'
          />
        </div>

        <section className={`w-full relative pt-1 ${layout === LAYOUTS.windows ? editorActive !== LANGUAGES.html ? 'hidden' : 'flex-1' : 'h-full'}`}>
          <Editor 
            language={LANGUAGES.html}
            value={valuesOfEditors ? valuesOfEditors.html : ''}
            options={options}
            theme={theme}
            loading={<Spinner />}
            className=''
            onChange={(value) => setValuesOfEditors({...valuesOfEditors, html: value}) }
            onMount={handleMount}
          />

          <img src={HtmlLogo} alt="logo_html" className={`absolute right-5 bottom-2 w-9 h-9 ${editorActive !== LANGUAGES.html ? 'grayscale opacity-60 scale-90' : ''} transition-all`} />

        </section>

        <section className={`w-full relative pt-1 ${layout === LAYOUTS.windows ? editorActive !== LANGUAGES.css ? 'hidden' : 'flex-1' : 'h-full'}`}>
          <Editor 
            language={LANGUAGES.css}
            value={valuesOfEditors ? valuesOfEditors.css : ''}
            options={options}
            theme={theme}
            loading={<Spinner />}
            className='w-full h-full min-h-0'
            onChange={(value) => setValuesOfEditors({...valuesOfEditors, css: value}) }
          />

          <img src={CssLogo} alt="logo_css" className={`absolute right-5 bottom-2 w-9 h-9 ${editorActive !== LANGUAGES.css ? 'grayscale opacity-60 scale-90' : ''} transition-all`} />
        </section>

        <section className={`w-full relative pt-1 ${layout === LAYOUTS.windows ? editorActive !== LANGUAGES.javascript ? 'hidden' : 'flex-1' : 'h-full'}`}>
          <Editor 
            language={LANGUAGES.javascript}
            value={valuesOfEditors ? valuesOfEditors.javascript : ''}
            options={options}
            theme={theme}
            loading={<Spinner />}
            className='w-full h-full min-h-0'
            onChange={(value) => setValuesOfEditors({...valuesOfEditors, javascript: value}) }
          />

          <img src={JsLogo} alt="logo_javascript" className={`absolute right-5 bottom-2 w-9 h-9 ${editorActive !== LANGUAGES.javascript ? 'grayscale opacity-60 scale-90' : ''} transition-all`} />
        </section>

        <section className={`bg-white ${layout === LAYOUTS.windows ? editorActive !== 'preview' ? 'hidden' : '' : ''} w-full h-full`}>
          <iframe id='preview' className='w-full h-full'></iframe>
        </section>

        { layout === LAYOUTS.grid
          ? 
            <>
              <div className="horizontal-gutter bg-gray-950 cursor-row-resize" />
              <div className="vertical-gutter bg-gray-950 cursor-col-resize" />
            </>
          : layout === LAYOUTS.columns
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