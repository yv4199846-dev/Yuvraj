import './style.css'
import * as pdfjsLib from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import ePub from 'epubjs'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker

const STORAGE_KEYS = {
  highlights: 'diana.reader.highlights',
  vocabulary: 'diana.reader.vocabulary',
}

const state = {
  currentType: null,
  currentFileName: '',
  highlights: loadFromStorage(STORAGE_KEYS.highlights, []),
  vocabulary: loadFromStorage(STORAGE_KEYS.vocabulary, []),
  selectedText: '',
  lastPointer: { x: 0, y: 0 },
  pdf: {
    doc: null,
    pageText: new Map(),
    toc: [],
  },
  epub: {
    book: null,
    rendition: null,
    toc: [],
  },
}

const app = document.querySelector('#app')
app.innerHTML = `
  <div class="reader-shell">
    <header class="topbar glass">
      <div class="brand-wrap">
        <button id="tocToggle" class="icon-btn" aria-label="Toggle TOC">☰</button>
        <div>
          <p class="brand-eyebrow">Diana Premium</p>
          <h1>Diana AI Reader</h1>
        </div>
      </div>

      <div class="top-actions">
        <label class="upload-btn">
          <input id="fileInput" type="file" accept=".pdf,.epub" />
          Upload PDF/EPUB
        </label>
        <button id="summaryBtn" class="action-btn">✨ AI Chapter Summary</button>
        <button id="revisionsBtn" class="action-btn secondary">AI Revisions</button>
      </div>
    </header>

    <main class="layout">
      <aside id="tocSidebar" class="toc glass collapsed">
        <h2>Table of Contents</h2>
        <ul id="tocList"></ul>
      </aside>

      <section class="workspace">
        <div id="readerView" class="view active">
          <p id="fileLabel" class="file-label">No book loaded</p>
          <div id="emptyState" class="empty glass">
            <h2>Drop into immersive reading</h2>
            <p>Load any local EPUB or PDF to start your premium AI-powered reading session.</p>
          </div>
          <div id="readerViewport" class="reader-viewport"></div>
        </div>

        <div id="revisionsView" class="view revisions">
          <h2>AI Revisions Hub</h2>
          <div class="revision-grid">
            <section class="glass revision-col">
              <h3>Saved Highlights</h3>
              <div id="highlightsList" class="revision-list"></div>
            </section>
            <section class="glass revision-col">
              <h3>Vocabulary</h3>
              <div id="vocabList" class="revision-list"></div>
            </section>
          </div>
        </div>
      </section>
    </main>

    <div id="selectionTooltip" class="selection-tooltip hidden">
      <button data-action="highlight">Highlight</button>
      <button data-action="dictionary">Dictionary (EN+HI)</button>
      <button data-action="explain">AI Explain</button>
    </div>

    <div id="modalBackdrop" class="modal-backdrop hidden">
      <article class="modal glass">
        <button id="modalClose" class="modal-close" aria-label="Close">✕</button>
        <h2 id="modalTitle">Result</h2>
        <div id="modalBody"></div>
      </article>
    </div>
  </div>
`

const fileInput = document.getElementById('fileInput')
const tocToggle = document.getElementById('tocToggle')
const tocSidebar = document.getElementById('tocSidebar')
const tocList = document.getElementById('tocList')
const readerViewport = document.getElementById('readerViewport')
const emptyState = document.getElementById('emptyState')
const fileLabel = document.getElementById('fileLabel')
const summaryBtn = document.getElementById('summaryBtn')
const revisionsBtn = document.getElementById('revisionsBtn')
const readerView = document.getElementById('readerView')
const revisionsView = document.getElementById('revisionsView')
const highlightsList = document.getElementById('highlightsList')
const vocabList = document.getElementById('vocabList')
const selectionTooltip = document.getElementById('selectionTooltip')
const modalBackdrop = document.getElementById('modalBackdrop')
const modalTitle = document.getElementById('modalTitle')
const modalBody = document.getElementById('modalBody')
const modalClose = document.getElementById('modalClose')

renderRevisions()
wireEvents()

function wireEvents() {
  fileInput.addEventListener('change', (event) => {
    const [file] = event.target.files || []
    if (file) {
      loadBook(file)
    }
  })

  tocToggle.addEventListener('click', () => {
    tocSidebar.classList.toggle('collapsed')
  })

  summaryBtn.addEventListener('click', async () => {
    const visibleText = await getVisibleText()
    if (!visibleText) {
      openModal('AI Chapter Summary', '<p>Load a document first to summarize the visible section.</p>')
      return
    }

    openModal('AI Chapter Summary', '<p class="loading">Generating key takeaways…</p>')
    const summary = await mockSummary(visibleText)
    openModal('AI Chapter Summary', `<ul>${summary.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`)
  })

  revisionsBtn.addEventListener('click', () => {
    const showingReader = readerView.classList.contains('active')
    readerView.classList.toggle('active', !showingReader)
    revisionsView.classList.toggle('active', showingReader)
    revisionsBtn.textContent = showingReader ? 'Back to Reader' : 'AI Revisions'
    hideSelectionTooltip()
  })

  document.addEventListener('mouseup', () => {
    state.lastPointer = { x: window.event?.clientX || state.lastPointer.x, y: window.event?.clientY || state.lastPointer.y }
    const selection = window.getSelection()?.toString().trim()
    if (selection && readerView.classList.contains('active') && readerViewport.contains(window.getSelection()?.anchorNode)) {
      state.selectedText = selection
      showSelectionTooltip(state.lastPointer.x + 12, state.lastPointer.y + 12)
    }
  })

  document.addEventListener('mousedown', (event) => {
    if (!selectionTooltip.contains(event.target)) {
      hideSelectionTooltip()
    }
  })

  selectionTooltip.addEventListener('click', async (event) => {
    const action = event.target.dataset.action
    if (!action || !state.selectedText) return

    if (action === 'highlight') {
      saveHighlight(state.selectedText)
      hideSelectionTooltip()
      return
    }

    if (action === 'dictionary') {
      const word = extractPrimaryWord(state.selectedText)
      openModal('Dictionary (EN + HI)', '<p class="loading">Looking up definition…</p>')
      const vocab = await fetchDictionaryAndHindi(word)
      saveVocabulary(vocab)
      openModal(
        'Dictionary (EN + HI)',
        `<h3>${escapeHtml(vocab.word)}</h3><p><strong>English:</strong> ${escapeHtml(vocab.english)}</p><p><strong>Hindi:</strong> ${escapeHtml(vocab.hindi)}</p>`,
      )
      hideSelectionTooltip()
      return
    }

    if (action === 'explain') {
      openModal('AI Explain', '<p class="loading">Asking AI to simplify this…</p>')
      const explanation = await mockExplain(state.selectedText)
      openModal('AI Explain', `<p>${escapeHtml(explanation)}</p>`)
      hideSelectionTooltip()
    }
  })

  modalBackdrop.addEventListener('click', (event) => {
    if (event.target === modalBackdrop || event.target === modalClose) {
      closeModal()
    }
  })
}

async function loadBook(file) {
  const extension = file.name.split('.').pop()?.toLowerCase()
  resetReader()

  state.currentFileName = file.name
  fileLabel.textContent = `Loaded: ${file.name}`
  emptyState.classList.add('hidden')

  if (extension === 'pdf') {
    await loadPdf(file)
    return
  }

  if (extension === 'epub') {
    await loadEpub(file)
    return
  }

  openModal('Unsupported file', '<p>Please upload a .pdf or .epub file.</p>')
}

async function loadPdf(file) {
  state.currentType = 'pdf'
  readerViewport.className = 'reader-viewport pdf-mode'

  const data = await file.arrayBuffer()
  const loadingTask = pdfjsLib.getDocument({ data })
  const pdfDoc = await loadingTask.promise
  state.pdf.doc = pdfDoc

  await buildPdfToc(pdfDoc)

  for (let pageNumber = 1; pageNumber <= pdfDoc.numPages; pageNumber += 1) {
    const page = await pdfDoc.getPage(pageNumber)
    const viewport = page.getViewport({ scale: 1.4 })

    const pageContainer = document.createElement('article')
    pageContainer.className = 'pdf-page glass'
    pageContainer.id = `pdf-page-${pageNumber}`
    pageContainer.dataset.page = String(pageNumber)
    pageContainer.style.width = `${viewport.width}px`
    pageContainer.style.height = `${viewport.height}px`

    const canvas = document.createElement('canvas')
    canvas.width = viewport.width
    canvas.height = viewport.height
    canvas.className = 'pdf-canvas'

    const textLayer = document.createElement('div')
    textLayer.className = 'pdf-text-layer'
    textLayer.style.width = `${viewport.width}px`
    textLayer.style.height = `${viewport.height}px`

    pageContainer.append(canvas, textLayer)
    readerViewport.appendChild(pageContainer)

    await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise

    const textContent = await page.getTextContent()
    state.pdf.pageText.set(pageNumber, textContent.items.map((item) => item.str).join(' '))
    renderTextLayer(textContent, viewport, textLayer)
  }
}

function renderTextLayer(textContent, viewport, textLayer) {
  textContent.items.forEach((item) => {
    const span = document.createElement('span')
    const tx = pdfjsLib.Util.transform(viewport.transform, item.transform)
    const fontSize = Math.hypot(tx[2], tx[3])
    const angle = Math.atan2(tx[1], tx[0])

    span.textContent = item.str
    span.style.left = `${tx[4]}px`
    span.style.top = `${tx[5] - fontSize}px`
    span.style.fontSize = `${fontSize}px`
    span.style.fontFamily = item.fontName || 'sans-serif'
    span.style.transform = `rotate(${angle}rad)`

    textLayer.appendChild(span)
  })
}

async function buildPdfToc(pdfDoc) {
  const outline = (await pdfDoc.getOutline()) || []
  const tocItems = []

  async function walk(items, depth = 0) {
    for (const item of items) {
      const pageNumber = await resolvePdfDestination(item.dest)
      tocItems.push({ title: item.title || 'Untitled', pageNumber, depth })
      if (item.items?.length) {
        await walk(item.items, depth + 1)
      }
    }
  }

  await walk(outline)
  state.pdf.toc = tocItems
  renderToc(
    tocItems,
    (item) => item.pageNumber,
    (item) => {
      document.getElementById(`pdf-page-${item.pageNumber}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
  )
}

async function resolvePdfDestination(dest) {
  if (!dest || !state.pdf.doc) return null

  let destination = dest
  if (typeof destination === 'string') {
    destination = await state.pdf.doc.getDestination(destination)
  }

  if (!Array.isArray(destination)) return null

  try {
    const pageIndex = await state.pdf.doc.getPageIndex(destination[0])
    return pageIndex + 1
  } catch {
    return null
  }
}

async function loadEpub(file) {
  state.currentType = 'epub'
  readerViewport.className = 'reader-viewport epub-mode'

  const arrayBuffer = await file.arrayBuffer()
  const book = ePub(arrayBuffer)
  const rendition = book.renderTo(readerViewport, {
    manager: 'continuous',
    flow: 'scrolled-doc',
    width: '100%',
    height: '100%',
  })

  state.epub.book = book
  state.epub.rendition = rendition

  rendition.themes.default({
    body: {
      background: '#121212 !important',
      color: '#e0e0e0 !important',
      'font-family': "'Inter', sans-serif !important",
      'line-height': '1.7 !important',
    },
    h1: {
      color: '#4e7dff !important',
      'font-family': "'Outfit', sans-serif !important",
      'font-weight': '700 !important',
    },
    h2: {
      color: '#4e7dff !important',
      'font-family': "'Outfit', sans-serif !important",
      'font-weight': '650 !important',
    },
    blockquote: {
      color: '#ffb4f0 !important',
      borderLeft: '4px solid #d05dff !important',
      paddingLeft: '1rem !important',
      fontFamily: "'Playfair Display', serif !important",
      fontStyle: 'italic !important',
      background: 'rgba(208, 93, 255, 0.1) !important',
    },
  })

  rendition.hooks.content.register((contents) => {
    const doc = contents.document
    doc.addEventListener('mouseup', () => {
      const selection = contents.window.getSelection()?.toString().trim()
      if (!selection) return

      const range = contents.window.getSelection()?.getRangeAt(0)
      if (!range) return

      const rect = range.getBoundingClientRect()
      const frameRect = doc.defaultView.frameElement.getBoundingClientRect()
      state.selectedText = selection
      showSelectionTooltip(frameRect.left + rect.left + 12, frameRect.top + rect.bottom + 12)
    })
  })

  const nav = await book.loaded.navigation
  state.epub.toc = nav?.toc || []

  renderToc(
    state.epub.toc,
    (item) => item.href,
    (item) => {
      rendition.display(item.href)
    },
  )

  await rendition.display()
}

function renderToc(items, identity, onClick) {
  tocList.innerHTML = ''

  if (!items.length) {
    tocList.innerHTML = '<li class="toc-empty">No TOC detected for this document.</li>'
    return
  }

  items.forEach((item) => {
    const id = identity(item)
    if (!id) return

    const li = document.createElement('li')
    li.style.paddingLeft = `${(item.depth || 0) * 14}px`

    const button = document.createElement('button')
    button.textContent = item.title || item.label || 'Untitled'
    button.addEventListener('click', () => onClick(item))

    li.appendChild(button)
    tocList.appendChild(li)
  })
}

function saveHighlight(text) {
  state.highlights.unshift({
    id: crypto.randomUUID(),
    text,
    timestamp: new Date().toISOString(),
  })
  writeStorage(STORAGE_KEYS.highlights, state.highlights)
  renderRevisions()
}

function saveVocabulary(entry) {
  state.vocabulary = [entry, ...state.vocabulary.filter((item) => item.word !== entry.word)]
  writeStorage(STORAGE_KEYS.vocabulary, state.vocabulary)
  renderRevisions()
}

function renderRevisions() {
  highlightsList.innerHTML = state.highlights.length
    ? state.highlights
        .map(
          (item) => `<article class="entry"><p>“${escapeHtml(item.text)}”</p><time>${new Date(item.timestamp).toLocaleString()}</time></article>`,
        )
        .join('')
    : '<p class="placeholder">No highlights yet.</p>'

  vocabList.innerHTML = state.vocabulary.length
    ? state.vocabulary
        .map(
          (item) => `<article class="entry"><h4>${escapeHtml(item.word)}</h4><p><strong>EN:</strong> ${escapeHtml(item.english)}</p><p><strong>HI:</strong> ${escapeHtml(item.hindi)}</p></article>`,
        )
        .join('')
    : '<p class="placeholder">No vocabulary entries yet.</p>'
}

async function getVisibleText() {
  if (state.currentType === 'pdf') {
    const viewportRect = readerViewport.getBoundingClientRect()
    const visible = [...readerViewport.querySelectorAll('.pdf-page')]
      .filter((page) => {
        const rect = page.getBoundingClientRect()
        return rect.bottom >= viewportRect.top && rect.top <= viewportRect.bottom
      })
      .map((page) => Number(page.dataset.page))

    return visible.map((pageNumber) => state.pdf.pageText.get(pageNumber) || '').join(' ').trim()
  }

  if (state.currentType === 'epub') {
    const iframeBodies = [...readerViewport.querySelectorAll('iframe')]
      .map((iframe) => iframe.contentDocument?.body?.innerText || '')
      .join(' ')
      .trim()

    return iframeBodies
  }

  return ''
}

async function fetchDictionaryAndHindi(word) {
  const fallback = {
    word,
    english: 'Definition not available right now.',
    hindi: 'हिंदी अनुवाद अभी उपलब्ध नहीं है।',
  }

  if (!word) return fallback

  try {
    const [definitionRes, hindiRes] = await Promise.all([
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`),
      fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|hi`),
    ])

    const definitionJson = definitionRes.ok ? await definitionRes.json() : null
    const hindiJson = hindiRes.ok ? await hindiRes.json() : null

    const english =
      definitionJson?.[0]?.meanings?.[0]?.definitions?.[0]?.definition ||
      definitionJson?.[0]?.meanings?.[0]?.definitions?.[0] ||
      fallback.english

    const hindi = hindiJson?.responseData?.translatedText || fallback.hindi

    return {
      word,
      english,
      hindi,
      timestamp: new Date().toISOString(),
    }
  } catch {
    return fallback
  }
}

async function mockExplain(text) {
  await sleep(600)
  const trimmed = text.replace(/\s+/g, ' ').trim()
  return `In simple words: ${trimmed.slice(0, 260)}${trimmed.length > 260 ? '…' : ''} This part is explaining the core idea in an easier, practical way.`
}

async function mockSummary(text) {
  await sleep(700)
  const sentences = text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean)

  return sentences.slice(0, 5).map((sentence) => sentence.trim())
}

function openModal(title, html) {
  modalTitle.textContent = title
  modalBody.innerHTML = html
  modalBackdrop.classList.remove('hidden')
}

function closeModal() {
  modalBackdrop.classList.add('hidden')
}

function showSelectionTooltip(x, y) {
  selectionTooltip.style.left = `${Math.max(12, x)}px`
  selectionTooltip.style.top = `${Math.max(12, y)}px`
  selectionTooltip.classList.remove('hidden')
}

function hideSelectionTooltip() {
  selectionTooltip.classList.add('hidden')
}

function extractPrimaryWord(text) {
  return text
    .trim()
    .toLowerCase()
    .split(/\s+/)[0]
    ?.replace(/[^\p{L}']/gu, '')
}

function resetReader() {
  closeModal()
  hideSelectionTooltip()
  readerViewport.innerHTML = ''
  state.pdf.pageText.clear()
  state.pdf.toc = []

  if (state.epub.rendition) {
    state.epub.rendition.destroy()
    state.epub.rendition = null
  }

  if (state.epub.book) {
    state.epub.book.destroy()
    state.epub.book = null
  }

  tocList.innerHTML = ''
}

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function escapeHtml(value = '') {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}
