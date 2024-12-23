import AppSidebar from './components/app-sidebar';
import { ThemeProvider } from './components/theme-provider';

import { Separator } from './components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from './components/ui/sidebar';
import { SettingsDialog } from './components/settings-dialog';

import SearchInput from './components/search-input';
import MediaMetadata from './components/media-metadata';

export default function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <SearchInput />
          </header>
          <SettingsDialog />
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid gap-4 md:grid-cols-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-xl bg-muted/50">
                  <MediaMetadata />
                </div>
              ))}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
