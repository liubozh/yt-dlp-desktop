import { AppSidebar } from './components/app-sidebar';
import { ThemeProvider } from './components/theme-provider';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from './components/ui/breadcrumb';
import { SidebarInset, SidebarProvider } from './components/ui/sidebar';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>October 2024</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-xl bg-muted/50" />
              ))}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
