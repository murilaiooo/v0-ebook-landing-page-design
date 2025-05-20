"use client"

import type React from "react"

import { useEffect } from "react"

interface AntiCopyProps {
  children: React.ReactNode
}

export function AntiCopy({ children }: AntiCopyProps) {
  useEffect(() => {
    // Desabilita seleção de texto
    const disableSelection = (e: Event) => {
      e.preventDefault()
      return false
    }

    // Desabilita clique com botão direito
    const disableRightClick = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Desabilita atalhos de teclado comuns para copiar
    const disableKeyboardShortcuts = (e: KeyboardEvent) => {
      // Ctrl+C, Ctrl+X, Ctrl+V, Ctrl+A, Ctrl+S, F12
      if (
        (e.ctrlKey && (e.key === "c" || e.key === "x" || e.key === "v" || e.key === "a" || e.key === "s")) ||
        e.key === "F12"
      ) {
        e.preventDefault()
        return false
      }
    }

    // Desabilita arrastar elementos
    const disableDrag = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

    // Adiciona mensagem de aviso ao tentar copiar
    const showCopyWarning = () => {
      alert("Conteúdo protegido. Não é permitido copiar.")
      return false
    }

    // Adiciona os event listeners
    document.addEventListener("selectstart", disableSelection)
    document.addEventListener("contextmenu", disableRightClick)
    document.addEventListener("keydown", disableKeyboardShortcuts)
    document.addEventListener("dragstart", disableDrag)
    document.addEventListener("copy", showCopyWarning)

    // CSS para prevenir seleção de texto
    const style = document.createElement("style")
    style.innerHTML = `
      * {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      
      input, textarea {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }
    `
    document.head.appendChild(style)

    // Limpa os event listeners quando o componente é desmontado
    return () => {
      document.removeEventListener("selectstart", disableSelection)
      document.removeEventListener("contextmenu", disableRightClick)
      document.removeEventListener("keydown", disableKeyboardShortcuts)
      document.removeEventListener("dragstart", disableDrag)
      document.removeEventListener("copy", showCopyWarning)
      document.head.removeChild(style)
    }
  }, [])

  return <>{children}</>
}
