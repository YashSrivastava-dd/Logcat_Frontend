import React,{memo} from 'react'
import { Cursor, useTypewriter } from 'react-simple-typewriter'

function TypewriterComponent() {
    const [text]=useTypewriter({
        words:['Doctor','Professor','Engineer','Marketing'],
        loop:{},
        typeSpeed:120,
        deleteSpeed:80,
    })
  return (
    <div style={{
      fontSize: '1.1rem',
      color: '#4a5568',
      fontWeight: '400',
      marginBottom: '0.5rem',
      textAlign: 'center'
    }}>
        Welcome back,{' '}
        <span style={{
          fontWeight: 'bold',
          color: 'rgb(152, 0, 76)',
          background: 'linear-gradient(135deg, rgb(152, 0, 76), rgb(120, 0, 60))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
            {text}
        </span>
        <span style={{color: 'rgb(152, 0, 76)'}}>
            <Cursor cursorStyle='|'/>
        </span>
    </div>
  )
}

export default memo(TypewriterComponent)