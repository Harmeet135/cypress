import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { cookies } from 'next/headers';
import db from '@/lib/supabase/db';
import { redirect } from 'next/navigation';
import DashboardSetup from '@/components/dashboard-setup/dashboard-setup';
import { getUserSubscriptionStatus } from '@/lib/supabase/queries';

const DashboardPage = async () => {
  console.log('reached');
  const supabase = createServerComponentClient({ cookies });
  console.log(supabase, 'supabase');
  const {
    data: { user },
  } = await supabase.auth.getUser();
//  console.log(user,"user");
  if (!user) return;

  const workspace = await db.query.workspaces.findFirst({
    where: (workspace, { eq }) => eq(workspace.workspaceOwner, user.id),
  });

  const { data: subscription, error: subscriptionError } =
    await getUserSubscriptionStatus(user.id);

  if (subscriptionError) return;
  console.log('subscription');
  if (!workspace)
    return (
      <div
        className="bg-background
        h-screen
        w-screen
        flex
        justify-center
        items-center
  "
      >
        <DashboardSetup
          user={user}
          subscription={subscription}
        />
      </div>
    );
    else {
      console.log(workspace.id, "workspace id");
      
      redirect(`/dashboard/${workspace.id}`);
      // Console log after the redirect; this wouldn't typically run in a real-world scenario.
      
    }
};

export default DashboardPage;
