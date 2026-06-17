import { component$ } from '@builder.io/qwik';
import Weather from '../components/weather';  
import { RouterHead } from '../components/router-head/router-head';  // ✅ fixed path

export default component$(() => {
  return (
    <>
      <RouterHead />
      <main>
        <Weather />
      </main>
    </>
  );
});
