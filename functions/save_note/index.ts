import { apiHandlerWithPathParamAndBody } from "../../common/handler";
import { saveNoteContent } from "../../common/s3";

interface SaveNoteRequest {
    content: string;
}

async function saveNote(id: string, body: SaveNoteRequest): Promise<void> {
    if (typeof body.content !== 'string') {
        throw new Error('Content must be a string');
    }
    
    await saveNoteContent(id, body.content);
}

export const handler = apiHandlerWithPathParamAndBody('id', saveNote);
