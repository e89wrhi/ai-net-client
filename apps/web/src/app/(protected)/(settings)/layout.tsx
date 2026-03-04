import DetailWidthWrapper from '@/components/layout/detail-width-wrapper';
import DetailHeader from '@/components/layout/detail-header';
import { SettingsSidebar } from './_components/settings-sidebar';

interface SearchResultLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({ children }: SearchResultLayoutProps) {
  return (
    <div className="min-h-screen bg-background pb-12">
      <DetailWidthWrapper>
        <DetailHeader />
        <div className="flex flex-col md:flex-row gap-10">
          <aside className="md:w-64 flex-shrink-0">
            <SettingsSidebar />
          </aside>
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </DetailWidthWrapper>
    </div>
  );
}
