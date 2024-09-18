/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Dia = "dia",
	Institucion = "institucion",
	Mes = "mes",
	Producto = "producto",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type DiaRecord = {
	nombre: string
	orden: number
}

export type InstitucionRecord = {
	nombre: string
}

export type MesRecord = {
	nombre: string
	orden: number
}

export type ProductoRecord = {
	institucion: RecordIdString
	nombre: string
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type DiaResponse<Texpand = unknown> = Required<DiaRecord> & BaseSystemFields<Texpand>
export type InstitucionResponse<Texpand = unknown> = Required<InstitucionRecord> & BaseSystemFields<Texpand>
export type MesResponse<Texpand = unknown> = Required<MesRecord> & BaseSystemFields<Texpand>
export type ProductoResponse<Texpand = unknown> = Required<ProductoRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	dia: DiaRecord
	institucion: InstitucionRecord
	mes: MesRecord
	producto: ProductoRecord
	users: UsersRecord
}

export type CollectionResponses = {
	dia: DiaResponse
	institucion: InstitucionResponse
	mes: MesResponse
	producto: ProductoResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'dia'): RecordService<DiaResponse>
	collection(idOrName: 'institucion'): RecordService<InstitucionResponse>
	collection(idOrName: 'mes'): RecordService<MesResponse>
	collection(idOrName: 'producto'): RecordService<ProductoResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
