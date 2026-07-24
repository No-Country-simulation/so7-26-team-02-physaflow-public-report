'use client'

export default function BotonPrueba() {
  return (
    <button 
      onClick={() => alert('¡El componente React funciona dentro de MDX!')}
      style={{
        padding: '10px 20px',
        backgroundColor: '#0070f3',
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginTop: '10px'
      }}
    >
      Haz clic aquí
    </button>
  )
}