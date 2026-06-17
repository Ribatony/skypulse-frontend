import { component$ } from '@builder.io/qwik';

export const RouterHead = component$(() => {
  return (
    <>
      <title>skypulse weather</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="real-time weather updates with skypulse" />
    </>
  );
});
