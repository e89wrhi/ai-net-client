import MaxWidthWrapper from '@/components/layout/content-width-wrapper';
import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <MaxWidthWrapper>
        <Spinner />
      </MaxWidthWrapper>
    </div>
  );
}
