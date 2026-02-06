interface ProductDescriptionProps {
  description?: string;
}

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  if (!description) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Descripción</h2>
      <div
        className="text-gray-600 leading-relaxed
        [&_p]:mb-4 [&_p:last-child]:mb-0
        [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mb-4 [&_h1]:mt-6
        [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mb-3 [&_h2]:mt-5
        [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mb-2 [&_h3]:mt-4
        [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ul]:space-y-1
        [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_ol]:space-y-1
        [&_li]:pl-1
        [&_strong]:font-semibold [&_strong]:text-gray-900
        [&_b]:font-semibold [&_b]:text-gray-900
        [&_a]:text-blue-600 [&_a]:hover:underline
        [&_blockquote]:border-l-4 [&_blockquote]:border-gray-200 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default ProductDescription;
