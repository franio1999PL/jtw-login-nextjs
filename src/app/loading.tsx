import { Loader } from 'lucide-react';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div>
        <Loader size="2em" className="animate-spin" />
      </div>
    </div>
  );
}
