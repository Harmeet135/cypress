export const dynamic = 'force-dynamic';

import QuillEditor from '@/components/quill-editor/quill-editor';
import { getWorkspaceDetails } from '@/lib/supabase/queries';
import { redirect } from 'next/navigation';
import React from 'react'

const Workspace = async ({params} : { params : {workspaceId : string}}) => {
  const {data , error} = await getWorkspaceDetails(params.workspaceId);
  if(error || !data.length) redirect('/dashboard');
  console.log(params.workspaceId, "workspace id");
  console.log('reached');
  return (
    <div>
      <QuillEditor dirType = "workspace" fileId="" 
      dirDetails={data[0] || {}}
      />
    </div>
  )
}

export default Workspace