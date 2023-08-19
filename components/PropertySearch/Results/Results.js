export const Results = ({ properties }) => {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-3 gap-5 mb-10">
      {properties.map((property) => (
        <div key={property.databaseId}>{property.title}</div>
      ))}
    </div>
  );
};
