interface ProductDescriptionProps {
  description?: string;
}

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  if (!description) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Descripción</h2>
      <div
        className="text-gray-600 leading-relaxed prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default ProductDescription;
