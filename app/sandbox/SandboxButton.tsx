'use client'

export default function SandboxButton() {
  return (
    <button 
      onClick={() => alert('¡El componente React funciona dentro de MDX!')}
      className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-md mt-2.5 cursor-pointer transition-colors shadow-sm"
    >
      Haz clic aquí
    </button>
  )
}