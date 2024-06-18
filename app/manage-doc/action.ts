'use server'

import { User, Document, Status } from "@prisma/client"

type DocumentWithStatus = Pick<Document,"amount"|"date"|"docNo"|"year"|"id"|"name"|"type"> & {status : (Pick<Status,"name">)[]} & {user: Pick<User,"name"|"user">}

export async function searchDocumentsWithStatus(prevState: DocumentWithStatus[], formData: FormData) {
    for (const key of formData.keys()) {
        console.log(key, formData.get(key));
        if(formData.get(key) == ""){
            console.log("ว่างเปล่า")
        }
    }
    return []
    
}