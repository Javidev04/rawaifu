import { useCallback } from 'react'

const CONTACTS = {
  twitter: 'https://x.com/Javier_desu',
  gmail: 'mailto:controlesjjcm2452@gmail.com',
  github: 'https://github.com/Javidev04',
} as const

export function useContacts() {
  const openTwitter = useCallback(() => {
    window.open(CONTACTS.twitter, '_blank', 'noopener,noreferrer')
  }, [])

  const openGmail = useCallback(() => {
    window.location.assign(CONTACTS.gmail)
  }, [])

  const openGithub = useCallback(() => {
    window.open(CONTACTS.github, '_blank', 'noopener,noreferrer')
  }, [])

  return {
    openTwitter,
    openGmail,
    openGithub,
  }
}