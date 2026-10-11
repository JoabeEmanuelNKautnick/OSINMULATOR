// Fachada: tipos estáveis + dados do CASO ATIVO (ver src/cases).
export type { PhotoKind, Comment, Post, Run, ChatMessage, Persona, PhotoDetails, ChatUsers } from './types'
import { activeCase } from '../cases/active'

export const persona = activeCase.persona
export const posts = activeCase.posts
export const runs = activeCase.runs
export const chat = activeCase.chat
export const chatUsers = activeCase.chatUsers
export const photoDetails = activeCase.photoDetails
