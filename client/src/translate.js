import React from 'react'
import * as languages from './lang'

const locale = document.documentElement.lang

// If the locale does not have any messages, use this instead
const fallbackLocale = 'fi'

const messages = languages[locale] || languages[fallbackLocale]
export const T = ({ message }) =>
  <span>
    {messages[message]}
  </span>

export const getTranslation = id => messages[id] || `No translation found for ${id}`