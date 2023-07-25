import dynamic from 'next/dynamic';

const DynamicEmployeesTable = dynamic(() => import('@/components/employeesTable'), {
  ssr: false, // Disable server-side rendering for this component
});

export default function Page() {
  return (
    <div className='w-full flex flex-col mt-12 justify-center'>
      <DynamicEmployeesTable />
    </div>
  );
}
