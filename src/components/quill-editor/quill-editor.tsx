'use client';
import { File, Folder, workspace } from '@/lib/supabase/supabase.types';
import React, { useState } from 'react'

interface QuillEditorProps {
    dirType : 'File' | 'Folder' | 'workspace';
    fileId : string;
    dirDetails : File | Folder | workspace;
    }

const QuillEditor: React.FC<QuillEditorProps> = ({
    dirType,
    fileId,
    dirDetails
    }) => {
        const [quill , setQuill] = useState();
    return (
        <div>quill-editor</div>
    )
}

export default QuillEditor