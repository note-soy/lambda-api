
import {apiHandlerWithPathParamFrom} from "../../common/handler";
import {getNoteContent, Note} from "../../common/s3";

async function getNote(id: string): Promise<Note> {
    return await getNoteContent(id);
}

export const handler = apiHandlerWithPathParamFrom('id', getNote);