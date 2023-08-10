import dynamic from 'next/dynamic';
import FilterTable from '../components/filterTable'
import Head from 'next/head'
const DynamicEmployeesTable = dynamic(() => import('@/components/employeesTable'), {
  ssr: false, // Disable server-side rendering for this component
});

export default function Page() {
  return (
    <div className='w-full flex flex-col mt-12 justify-center'>
       <Head>
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <FilterTable />
      <DynamicEmployeesTable />
    </div>
  );
}
