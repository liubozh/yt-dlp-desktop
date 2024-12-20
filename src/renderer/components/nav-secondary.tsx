import { Send, Settings } from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';
import { useSetAtom } from 'jotai';
import { isSettingsShowingAtom } from '../atoms';

export default function NavSecondary({
  ...props
}: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const setIsSettingsShowing = useSetAtom(isSettingsShowingAtom);
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem key={'Feedback'}>
            <SidebarMenuButton asChild size="sm">
              <a href={'#'}>
                <Send />
                <span>Feedback</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem key={'Settings'}>
            <SidebarMenuButton asChild size="sm">
              <a href={'#'} onClick={() => setIsSettingsShowing(true)}>
                <Settings />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
