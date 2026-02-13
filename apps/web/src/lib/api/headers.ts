export const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN || ''}`,
});
