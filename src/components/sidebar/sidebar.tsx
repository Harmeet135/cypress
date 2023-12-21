import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react'
import  { cookies } from 'next/headers';
import { getUserSubscriptionStatus, getWorkspaceDetails  ,  getFolders, getPrivateWorkspaces, getCollaboratingWorkspaces, getSharedWorkspaces,} from '@/lib/supabase/queries';
import { redirect } from 'next/navigation';
import WorkspaceDropdown from './workspace-dropdown';
import { twMerge } from 'tailwind-merge';
import { ScrollArea } from '../ui/scroll-area';
import PlanUsage from './plan-usage';
import NativeNavigation from './native-navigation';
import FoldersDropdownList from './folders-dropdoen-list';

interface SidebarProps{
    params: {workspaceId: string};
    classname? : string;
}

const Sidebar: React.FC<SidebarProps> = async ({params , classname}) => {
  const supabase = createServerComponentClient({cookies});

  // user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  // subscription
  const { data : subscriptionData , error  : subscriptionError  } = 
   await getUserSubscriptionStatus(user.id);

  // folders
  const { data : workspaceFolderData , error  : foldersError } =
  await getFolders(
    params.workspaceId
  );

  // if error redirect to dashboard
  if (subscriptionError || foldersError) redirect('/dashboard');

  const [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces] =
  await Promise.all([
    getPrivateWorkspaces(user.id),
    getCollaboratingWorkspaces(user.id),
    getSharedWorkspaces(user.id),
  ]);

  return (
    <aside
      className={twMerge(
        'hidden sm:flex sm:flex-col w-[280px] shrink-0 p-4 md:gap-4 !justify-between',
        classname
      )}
    >
      <div>
        <WorkspaceDropdown
          privateWorkspaces={privateWorkspaces}
          sharedWorkspaces={sharedWorkspaces}
          collaboratingWorkspaces={collaboratingWorkspaces}
          defaultValue={[
            ...privateWorkspaces,
            ...collaboratingWorkspaces,
            ...sharedWorkspaces,
          ].find((workspace) => workspace.id === params.workspaceId)}
        />
        <PlanUsage
          foldersLength={workspaceFolderData?.length || 0}
          subscription={subscriptionData}
        />
        <NativeNavigation myWorkspaceId={params.workspaceId} />
        <ScrollArea
          className="overflow-scroll relative
          h-[450px]
        "
        >
          <p>cdbusbi</p>
          <div
            className="pointer-events-none 
          w-full 
          absolute 
          bottom-0 
          h-20 
          bg-gradient-to-t 
          from-background 
          to-transparent 
          z-40"
          />
          <FoldersDropdownList
            workspaceFolders={workspaceFolderData || []}
            workspaceId={params.workspaceId}
          />
        </ScrollArea>
      </div>
      {/* <UserCard subscription={subscriptionData} /> */}
    </aside>
  );
};

export default Sidebar;
