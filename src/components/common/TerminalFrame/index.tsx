import React from 'react'
import './styles.scss'

export default function (text) {
    return <>
        <div className="terminal-frame">
            <div className="mac-window-controls">
                <div className="mac-window-button close"></div>
                <div className="mac-window-button minimize"></div>
                <div className="mac-window-button maximize"></div>
            </div>
            <pre className="terminal-frame-text">
                {text}
            </pre>
        </div>
    </>
}