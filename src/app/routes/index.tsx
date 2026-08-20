import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-blue-600">Chào mừng đến với Enterprise Base</h1>
      <p>Hệ thống Routing đã hoạt động hoàn hảo!</p>
    </div>
  );
}
