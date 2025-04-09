export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full animate-pulse bg-blue-600"></div>
        <div className="w-3 h-3 rounded-full animate-pulse bg-blue-600" style={{ animationDelay: "0.2s" }}></div>
        <div className="w-3 h-3 rounded-full animate-pulse bg-blue-600" style={{ animationDelay: "0.4s" }}></div>
      </div>
    </div>
  );
}