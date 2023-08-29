export const Paginatio = ({ totalPages }) => {
  return (
    <div className="max-w-5xl mx-auto flex mb-10 justify-center gap-2">
      {Array.from({ length: totalPages }).map((_, i) => (
        <div key={i} className="btn">
          {i + 1}
        </div>
      ))}
    </div>
  );
};
